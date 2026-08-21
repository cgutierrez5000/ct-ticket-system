export function getHighPriorityTickets(tickets) {
    return tickets.filter(ticket => ticket.priority === "high");
}

export function getOpenTickets(tickets) {
    return tickets.filter(ticket => ticket.status === "open");
}

export function findTicketById(tickets, id) {
    return tickets.find(ticket => ticket.id === id);
}

export function hasUrgentTickets(tickets) {
    return tickets.some(ticket => ticket.priority === "urgent");
}

export function changeTicketStatus(ticket, newStatus) {
    return { ...ticket, status: newStatus };
}

export function updateTicketStatus(tickets, id, newStatus) {
    return tickets.map(ticket =>
        ticket.id === id
            ? { ...ticket, status: newStatus }
            : ticket
    );
}

export function getTicketsByAssignee(tickets, assignee) {
    return tickets.filter(ticket => ticket.assignedTo === assignee);
}

export function getTicketsByStatus(tickets, status) {
    return tickets.filter(ticket => ticket.status === status);
}

export function deleteTicket(tickets, id) {
    return tickets.filter(ticket => ticket.id !== id);
}

export function isValidPriority(priority) {
    return ["low", "medium", "high", "urgent"].includes(priority);
}

export function isValidStatus(status) {
    return ["open", "in progress", "closed"].includes(status);
}

export function isValidTicket(ticket) {
    return (
        ticket !== null &&
        ticket !== undefined &&
        isValidPriority(ticket.priority) &&
        isValidStatus(ticket.status) &&
        typeof ticket.id === "number" &&
        typeof ticket.title === "string" &&
        ticket.title.trim().length > 0
    );
}

export function ticketIdExists(tickets, id) {
    return tickets.some(ticket => ticket.id === id);
}

export function addTicket(tickets, newTicket) {
    if (!isValidTicket(newTicket) || ticketIdExists(tickets, newTicket.id)) {
        return tickets;
    }
    return [
        ...tickets,
        newTicket
    ];
}
