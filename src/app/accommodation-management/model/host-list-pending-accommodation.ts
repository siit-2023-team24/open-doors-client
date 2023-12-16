import { HostListAccommodation } from "./host-list-accommodation";

export interface HostListPendingAccommodation extends HostListAccommodation {
    accommodationId?: number;
}