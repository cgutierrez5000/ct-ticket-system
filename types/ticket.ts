

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
    description: string;
    priority: TicketPriority;
    status: TicketStatus;
    assignedTo: string;

}

export type NewTicketData = {
    title: string;
    description: string;
    priority: TicketPriority;
    assignedTo: string;
};

