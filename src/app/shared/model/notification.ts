export interface Message {
    id?: number;
    timestamp: Date;
    username: string;
    message: string;
    type: string;
}