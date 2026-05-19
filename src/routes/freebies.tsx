import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import FreebieDownloadCard from '../components/FreebieDownloadCard'
import SignupModal from '../components/SignupModal'
import { freebies, type Freebie } from '../config/freebies'

export const Route = createFileRoute('/freebies')({
  component: Freebies,
  head: () => ({
    meta: [
      {
        title: 'Freebies - Mozart Coloring Book',
      },
    ],
  }),
})

function Freebies() {
  const [selectedFreebie, setSelectedFreebie] = useState<Freebie | null>(null)

  return (
    <main className="page-wrap px-4 py-12">
      <section className="island-shell flex flex-col gap-12 rounded-2xl p-6 sm:p-8 items-center">
        <h1 className="text-center display-title text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
          Ready for a little coloring puzzle?
        </h1>
        <p className="text-center max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)]">
          Mozart&apos;s puzzles to train your intuition and entertain your brain.
          <br />
          Print them out or put them into Procreate, add your favorite color,
          and create a fun puzzle!
        </p>
        <h2 className="display-title text-center text-3xl font-semibold tracking-wide text-[var(--sea-ink-soft)]">
          Download Freebies
        </h2>
        <div className="flex w-full justify-center">
          <div className="grid w-full max-w-full gap-8 md:max-w-[50%] md:grid-cols-1">
            {freebies.map((freebie) => (
              <FreebieDownloadCard
                key={freebie.id}
                imageSrc={freebie.imageSrc}
                imageAlt={freebie.title}
                onClick={() => setSelectedFreebie(freebie)}
              />
            ))}
          </div>
        </div>
      </section>

      <SignupModal
        open={selectedFreebie !== null}
        onClose={() => setSelectedFreebie(null)}
        freebie={selectedFreebie ?? freebies[0]}
      />
    </main>
  )
}
