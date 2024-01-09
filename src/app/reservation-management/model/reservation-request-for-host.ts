import { ReservationRequestStatus } from "./reservation-request-status";

export interface ReservationRequestForHost {
    id: number;
    guestUsername: string;
    accommodationName: string;
    startDate: Date;
    endDate: Date;
    guestNumber: number;
    totalPrice: number;
    status: ReservationRequestStatus;
    timestamp: number;
    cancelledNumber: number;
  }