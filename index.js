import tickets from "./data/tickets.js";

import {
    getHighPriorityTickets,
    getOpenTickets,
    findTicketById,
    hasUrgentTickets,
    getTicketsByAssignee,
    getTicketsByStatus,
    addTicket,
    deleteTicket
} from "./utils/ticketUtils.js";


console.log("=== CT TICKET SYSTEM v0.2 ===");
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

console.log("TICKETS ASSIGNED TO CARLOS\n--------------------------");
const carlosTickets = getTicketsByAssignee(tickets, "Carlos");
console.log(carlosTickets.map(ticket => "#" + ticket.id + " - " + ticket.title).join("\n"));
console.log("\n");

console.log("IN PROGRESS TICKETS\n-------------------");
const inProgressTickets = getTicketsByStatus(tickets, "in progress");
console.log(inProgressTickets.map(ticket => "#" + ticket.id + " - " + ticket.title).join("\n"));
console.log("\n");

console.log("ADDING TICKET #106\n-------------------");
const newTicket = {
    id: 106,
    title: "Contact form validation issue",
    priority: "medium",
    status: "open",
    assignedTo: "Carlos"
};

const ticketsWithNewTicket = addTicket(tickets, newTicket);
console.log("Original count:", tickets.length);
console.log("Updated Count:", ticketsWithNewTicket.length);
console.log("\n");

console.log("DELETING TICKET #104\n--------------------");
const ticketsAfterDelete = deleteTicket(tickets, 104);
console.log("Original count:", tickets.length);
console.log("Updated Count:", ticketsAfterDelete.length);
console.log("Original still has #104?", tickets.some(ticket => ticket.id === 104));
console.log("New array has #104?", ticketsAfterDelete.some(ticket => ticket.id === 104));
console.log("\n");

