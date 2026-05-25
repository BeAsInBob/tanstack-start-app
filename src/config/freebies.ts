export type Freebie = {
  id: string
  title: string
  imageSrc: string
  rewardUrl: string
}

export const freebies: Freebie[] = [
  {
    id: 'obelisk-colors',
    title: 'Green Obelisk',
    imageSrc: '/images/obelisk-page-colored.webp',
    rewardUrl: 'https://downloads.mozartcolor.com/free-pages/obelisk-page.pdf',
  },
  {
    id: 'cartwheel-colors',
    title: 'Cartwheel Colors',
    imageSrc: '/images/cartwheel-colors.png',
    rewardUrl: 'https://downloads.mozartcolor.com/free-pages/cartwheel-spoke.pdf',
  },

  // Add more freebies here:
  // {
  //   id: 'example-freebie',
  //   title: 'Example Freebie',
  //   imageSrc: '/images/example.png',
  //   rewardUrl: 'https://your-domain.com/downloads/example.pdf',
  // },
]
