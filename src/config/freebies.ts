export type Freebie = {
  id: string
  title: string
  imageSrc: string
  rewardUrl: string
}

export const freebies: Freebie[] = [
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
