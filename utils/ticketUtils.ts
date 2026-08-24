import type { Ticket, TicketStatus, TicketPriority } from "../types/ticket.js";

export function getHighPriorityTickets(
    tickets: Ticket[]
): Ticket[] {
    return tickets.filter(ticket => ticket.priority === "high");
}

export function getOpenTickets(
    tickets: Ticket[]
): Ticket[] {
    return tickets.filter(ticket => ticket.status === "open");
}

export function findTicketById(
    tickets: Ticket[],
    id: number
): Ticket | undefined {
    return tickets.find(ticket => ticket.id === id);
}

export function getTicketsByStatus(
    tickets: Ticket[],
    status: TicketStatus
): Ticket[] {
    return tickets.filter(ticket => ticket.status === status);
}

export function hasUrgentTickets(
    tickets: Ticket[]
): boolean {
    return tickets.some(ticket => ticket.priority === "urgent");
}

export function changeTicketStatus(
    ticket: Ticket,
    newStatus: TicketStatus
): Ticket {
    return { ...ticket, status: newStatus };
}

export function updateTicketStatus(
    tickets: Ticket[],
    id: number,
    newStatus: TicketStatus
): Ticket[] {
    return tickets.map(ticket =>
        ticket.id === id
            ? { ...ticket, status: newStatus }
            : ticket
    );
}

export function getTicketsByAssignee(
    tickets: Ticket[],
    assignee: string
): Ticket[] {
    return tickets.filter(ticket => ticket.assignedTo === assignee);
}

export function deleteTicket(
    tickets: Ticket[],
    id: number
): Ticket[] {
    return tickets.filter(ticket => ticket.id !== id);
}

export function ticketIdExists(
    tickets: Ticket[],
    id: number
): boolean {
    return tickets.some(ticket => ticket.id === id);
}

export function isValidPriority(
    priority: unknown
): priority is TicketPriority {
    return (
        typeof priority === "string" &&
        ["low", "medium", "high", "urgent"].includes(priority)
    );
}

export function isValidStatus(
    status: unknown
): status is TicketStatus {
    return (
        typeof status === "string" &&
        ["open", "in progress", "closed"].includes(status)
    );
}

export function isValidTicket(
    ticket: unknown
): ticket is Ticket {
    return (
        ticket !== null &&
        typeof ticket === "object" &&
        "priority" in ticket &&
        "status" in ticket &&
        "id" in ticket &&
        "title" in ticket &&
        "assignedTo" in ticket &&
        isValidPriority(ticket.priority) &&
        isValidStatus(ticket.status) &&
        typeof ticket.id === "number" &&
        typeof ticket.title === "string" &&
        typeof ticket.assignedTo === "string" &&
        ticket.title.trim().length > 0
    );
}

export function addTicket(
    tickets: Ticket[],
    newTicket: unknown
): Ticket[] {
    if (!isValidTicket(newTicket) || ticketIdExists(tickets, newTicket.id)) {
        return tickets;
    }
    return [
        ...tickets,
        newTicket
    ];
}