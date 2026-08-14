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

