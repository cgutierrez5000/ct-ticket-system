import tickets from "./data/tickets.js";

import {
    getHighPriorityTickets,
    getOpenTickets,
    findTicketById,
    hasUrgentTickets,
    changeTicketStatus
} from "./utils/ticketUtils.js";


console.log("=== CT TICKET SYSTEM v0.1 ===");
console.log("\n");

console.log("HIGH PRIORITY TICKETS\n---------------------");
const highPriorityTickets = getHighPriorityTickets(tickets);
console.log(highPriorityTickets.map(ticket => "#" + ticket.id + " - " + ticket.title).join("\n"));
console.log("\n");

console.log("OPEN TICKETS\n------------");
const openTickets = getOpenTickets(tickets);
console.log(openTickets.map(ticket => "#" + ticket.id + " - " + ticket.title).join("\n"));
console.log("\n");

console.log("TICKET #103\n-----------");
const ticketById = findTicketById(tickets, 103);
console.log(`#${ticketById.id} - ${ticketById.title}\nPriority: ${ticketById.priority}\nStatus: ${ticketById.status}\nAssigned to: ${ticketById.assignedTo}`);
console.log("\n");

console.log("URGENT TICKETS?\n---------------");
const hasUrgent = hasUrgentTickets(tickets);
console.log(hasUrgent ? 'Yes' : 'No');
console.log("\n");

const originalTicket = tickets[0];
console.log("UPDATING TICKET #101\n--------------------");
const updatedTicket = changeTicketStatus(originalTicket, "closed");
console.log("Original Status:", originalTicket.status);
console.log("Updated Status:", updatedTicket.status);
console.log(
    "Same object?",
    originalTicket === updatedTicket
);

