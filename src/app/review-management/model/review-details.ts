export interface ReviewDetailsDTO {
  id: number,
  rating: number,
  comment: string,
  timestamp: Date,
  authorUsername: string,
  imageId?: number
}
  