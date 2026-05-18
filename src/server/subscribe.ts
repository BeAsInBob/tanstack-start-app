import { createServerFn } from '@tanstack/react-start'
import { env } from 'cloudflare:workers'

export const subscribeWithReward = createServerFn({ method: 'POST' })
  .inputValidator((data: { email: string; rewardUrl: string }) => {
    const email = (data.email ?? '').trim().toLowerCase()
    const rewardUrl = (data.rewardUrl ?? '').trim()
    if (!email) throw new Error('Email is required')
    if (!rewardUrl) throw new Error('Reward is required')
    return { email, rewardUrl }
  })
  .handler(async ({ data }) => {
    const apiKey = (env as Record<string, string>).MAILCHIMP_API_KEY
    const audienceId = (env as Record<string, string>).MAILCHIMP_AUDIENCE_ID
    const dc = (env as Record<string, string>).MAILCHIMP_DC

    if (!apiKey || !audienceId || !dc) {
      throw new Error('Mailchimp configuration is missing')
    }

    const baseUrl = `https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}/members`
    const authHeader = `apikey ${apiKey}`

    // Try to add the subscriber
    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader,
      },
      body: JSON.stringify({
        email_address: data.email,
        status: 'subscribed',
        merge_fields: {
          REWARD_URL: data.rewardUrl,
        },
      }),
    })

    if (res.ok) {
      return { success: true }
    }

    // Handle "Member Exists" — update their merge field instead
    const errorBody = await res.json().catch(() => null)
    const title = (errorBody as Record<string, unknown>)?.title

    if (res.status === 400 && title === 'Member Exists') {
      // Mailchimp requires the subscriber hash (MD5 of lowercase email)
      const subscriberHash = await md5(data.email)
      const patchRes = await fetch(`${baseUrl}/${subscriberHash}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authHeader,
        },
        body: JSON.stringify({
          merge_fields: {
            REWARD_URL: data.rewardUrl,
          },
        }),
      })

      if (patchRes.ok) {
        return { success: true }
      }

      throw new Error('Failed to update subscription')
    }

    console.error('Mailchimp error', res.status, errorBody)
    throw new Error('Failed to subscribe')
  })

/** Compute MD5 hash using Web Crypto (available in CF Workers) */
async function md5(input: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(input)
  const hashBuffer = await crypto.subtle.digest('MD5', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}
