

export type TicketPriority =
    "low" |
    "medium" |
    "high" |
    "urgent";

export type TicketStatus =
    "open" |
    "in progress" |
    "closed";

export interface Ticket {
    id: number;
    title: string;
    priority: TicketPriority;
    status: TicketStatus;
    assignedTo: string;

}

