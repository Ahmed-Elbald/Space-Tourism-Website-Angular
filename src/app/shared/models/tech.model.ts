export interface Technology {
  name: string
  images: TechImage
  description: string
}

export interface TechImage {
  portrait: string
  landscape: string
}