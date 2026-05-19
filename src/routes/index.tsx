import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      {/* <section className="island-shell rise-in relative overflow-hidden rounded-[2rem] px-6 py-10 sm:px-10 sm:py-14"> */}
      <section className="island-shell flex flex-col gap-12 rounded-2xl p-6 sm:p-8 items-center">
        <h1 className="text-center display-title text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
          Welcome to Mozart's Coloring world!
        </h1>
        <p className="text-center max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)]">
          Mozart&apos;s puzzles to train your intuition and entertain your brain.
        </p>

        <p className="text-center max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)]">
          <Link
            to="/freebies"
            className="font-semibold text-[var(--spring-sea)] hover:text-[var(--sea-ink)]"
          >
            Get some puzzles here!
          </Link>
        </p>
      </section>
    </main>
  )
}
