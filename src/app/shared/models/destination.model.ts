import { Image } from "./image.model"

export interface Destination {
  name: string
  images: Image
  description: string
  distance: string
  travel: string
}
