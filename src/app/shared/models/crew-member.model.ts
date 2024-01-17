import { Image } from "./image.model"

export interface CrewMember {
  name: string
  images: Image
  role: string
  bio: string
}