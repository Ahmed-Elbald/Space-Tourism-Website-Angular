import { Image } from "../../../shared/utils/models/image.model"

export interface Destination {
  name: string
  images: Image
  description: string
  distance: string
  travel: string
}
