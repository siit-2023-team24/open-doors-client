import { ReviewDetailsDTO } from "./reviewDetails";

export interface HostPublicDataDTO {
    username: string,
    firstName: string,
    lastName: string,
    reviews: ReviewDetailsDTO[],
    imageId?: number
}