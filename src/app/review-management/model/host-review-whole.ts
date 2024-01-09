export interface HostReviewWholeDTO {
    rating: number,
    comment: string,
    authorId: number,
    recipientId: number,
    id: number,
    timestamp: Date,
    reported: boolean
}