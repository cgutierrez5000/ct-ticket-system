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

export function addTicket(tickets, newTicket) {
    return [
        ...tickets,
        newTicket
    ];
}

export function deleteTicket(tickets, id) {
    return tickets.filter(ticket => ticket.id !== id);
}

