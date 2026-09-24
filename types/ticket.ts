

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
    assignedUserId: number | null;
    assignedTo: string | null;

}

export type NewTicketData = {
    title: string;
    description: string;
    priority: TicketPriority;
    assignedUserId: number | null;
}

export type UpdateTicketData = {
    title: string;
    description: string;
    priority: TicketPriority;
    status: TicketStatus;
    assignedUserId: number | null;
};

export type User = {
    id: number;
    name: string;
};

export type AuthenticatedUser = {
    id: number;
    name: string;
    email: string;
    role: "user" | "admin";
}


