import * as React from 'react'
import { X } from 'lucide-react'
import type { Freebie } from '../config/freebies'
import { subscribeWithReward } from '../server/subscribe'

type SignupModalProps = {
  open: boolean
  onClose: () => void
  freebie: Freebie
}

export default function SignupModal({ open, onClose, freebie }: SignupModalProps) {
  const [email, setEmail] = React.useState('')
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  // Focus the input when modal opens
  React.useEffect(() => {
    if (open) {
      // Small delay to ensure the modal is rendered
      const timer = setTimeout(() => inputRef.current?.focus(), 50)
      return () => clearTimeout(timer)
    }
  }, [open])

  // Close on Escape key
  React.useEffect(() => {
    if (!open) return
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg(null)

    try {
      await subscribeWithReward({
        data: { email, rewardUrl: freebie.rewardUrl },
      })
      setStatus('success')
      setEmail('')

      // Also open the reward URL immediately in a new tab
      if (freebie.rewardUrl) {
        window.open(freebie.rewardUrl, '_blank', 'noopener,noreferrer')
      }
    } catch (err: unknown) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  function handleClose() {
    onClose()
    // Reset state after close animation
    setTimeout(() => {
      setStatus('idle')
      setEmail('')
      setErrorMsg(null)
    }, 200)
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="signup-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[rgba(23,58,64,0.45)] backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal panel */}
      <div className="relative w-full max-w-md rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)] p-6 shadow-[0_22px_44px_rgba(30,90,72,0.15),0_6px_18px_rgba(23,58,64,0.1)] sm:p-8">
        {/* Close button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-[var(--sea-ink-soft)] transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)] cursor-pointer"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {status === 'success' ? (
          <div className="flex flex-col items-center gap-4 py-4 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--lagoon)] text-white">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="display-title text-2xl font-bold text-[var(--sea-ink)]">
              Enjoy your freebie!
            </h2>
            <p className="text-sm leading-relaxed text-[var(--sea-ink-soft)]">
              Your coloring puzzle should open in a new tab.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="mt-2 rounded-full border border-[var(--line)] px-5 py-2 text-sm font-semibold text-[var(--sea-ink-soft)] transition hover:bg-[var(--link-bg-hover)] cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h2
              id="signup-modal-title"
              className="mt-10 text-center display-title mb-2 text-2xl font-bold text-[var(--sea-ink)]"
            >
              Get your freebie coloring puzzle
            </h2>
            <p className="text-center mb-6 text-sm leading-relaxed text-[var(--sea-ink-soft)]">
              Sign up & download your free pages!
              {/* Enter your email and we'll send{' '}
              <span className="font-semibold">{freebie.title}</span> straight to
              your inbox. */}
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                ref={inputRef}
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading'}
                className="w-full rounded-xl border border-[var(--line)] bg-white px-4 py-3 text-sm text-[var(--sea-ink)] placeholder:text-[var(--sea-ink-soft)]/60 outline-none transition focus:border-[var(--lagoon)] focus:ring-2 focus:ring-[var(--lagoon)]/20 disabled:opacity-60"
              />

              <button
                type="submit"
                disabled={status === 'loading'}
                className="flex items-center justify-center rounded-full border border-[var(--lagoon-deep)] bg-[var(--lagoon)] px-6 py-3 text-sm font-semibold tracking-wide text-white shadow-[0_17px_25px_rgba(79,184,178,0.25)] transition hover:bg-[var(--lagoon-deep)] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {status === 'loading' ? 'Signing up...' : 'Sign me up!'}
              </button>

              <p className='text-xs text-center'>
                By signing up, you agree to receive email newsletters for marketing purposes.
                You can unsubscribe anytime.
              </p>

              {status === 'error' && errorMsg && (
                <p className="text-center text-sm text-red-600">{errorMsg}</p>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  )
}
