import { Image } from "../../../shared/utils/models/image.model"

export interface CrewMember {
  name: string
  images: Image
  role: string
  bio: string
}