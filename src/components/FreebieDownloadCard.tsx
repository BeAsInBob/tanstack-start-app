type FreebieDownloadCardProps = {
  imageSrc: string
  imageAlt?: string
  buttonLabel?: string
}

export default function FreebieDownloadCard({
  imageSrc,
  imageAlt = '',
  buttonLabel = 'Download',
}: FreebieDownloadCardProps) {
  return (
    <div className="flex h-full w-full flex-col gap-4">
      <div className="flex-1 w-full overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)]">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="h-full w-full object-contain block cursor-pointer"
        />
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          className="flex items-center justify-center rounded-full border border-[var(--lagoon-deep)] bg-[var(--lagoon)] px-6 py-2 text-sm font-semibold uppercase tracking-wide text-white shadow-[0_17px_25px_rgba(79,184,178,0.25)] transition hover:bg-[var(--lagoon-deep)] cursor-pointer"
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  )
}
