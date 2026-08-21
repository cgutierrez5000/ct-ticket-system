import tickets from "./data/tickets.js";

import {
    getHighPriorityTickets,
    getOpenTickets,
    findTicketById,
    hasUrgentTickets,
    getTicketsByAssignee,
    getTicketsByStatus,
    addTicket,
    deleteTicket,
    isValidPriority,
    isValidStatus,
    isValidTicket,
    ticketIdExists
} from "./utils/ticketUtils.js";


console.log("=== CT TICKET SYSTEM v0.3 ===");
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

console.log("VALIDATING PRIORITIES\n---------------------");
isValidPriority("high") ? console.log(`"high" : Valid`) : console.log(`"high" : Invalid`);
isValidPriority("banana") ? console.log(`"banana" : Valid`) : console.log(`"banana" : Invalid`);
console.log("\n");

console.log("VALIDATING STATUSES\n--------------------");
isValidStatus("open") ? console.log(`"open" : Valid`) : console.log(`"open" : Invalid`);
isValidStatus("pending") ? console.log(`"pending" : Valid`) : console.log(`"pending" : Invalid`);
console.log("\n");

const validTicket = {
    id: 106,
    title: "Contact form validation issue",
    priority: "medium",
    status: "open",
    assignedTo: "Carlos"
};

const invalidTicket = {
    id: 107,
    title: " ",
    priority: "banana",
    status: "whatever",
    assignedTo: "Carlos"
};

const duplicateTicket = {
    id: 101,
    title: "Duplicate ticket test",
    priority: "high",
    status: "open",
    assignedTo: "John"
};

console.log("ADDING VALID TICKET #106\n------------------------");
const validResult = addTicket(tickets, validTicket);
console.log("Original count:", tickets.length);
console.log("Updated count:", validResult.length);
console.log(
    "Ticket #106 added?",
    validResult.some(ticket => ticket.id === 106)
);
console.log("\n");

console.log("REJECTING DUPLICATE TICKET #107\n------------------------------");
const invalidResult = addTicket(tickets, invalidTicket);
console.log("Original count:", tickets.length);
console.log("Updated count:", invalidResult.length);
console.log(
    "How many #101 tickets: ",
    invalidResult.filter(ticket => ticket.id === 101).length
);
console.log("\n");

console.log("REJECTING DUPLICATE TICKET #101\n------------------------------");
const duplicateResult = addTicket(tickets, duplicateTicket);
console.log("Original count:", tickets.length);
console.log("Updated count:", duplicateResult.length);
console.log(
    "How many #101 tickets: ",
    duplicateResult.filter(ticket => ticket.id === 101).length
);
console.log("\n");

console.log("ARRAY REFERENCE CHECK\n-------------------------");
const validResult = addTicket(tickets, validTicket);
const invalidResult = addTicket(tickets, invalidTicket);
const duplicateResult = addTicket(tickets, duplicateTicket);
console.log(tickets === validResult);
console.log(tickets === invalidResult);
console.log(tickets === duplicateResult);
console.log("\n");

console.log("FINDING EXISTING TICKET");
const existingTicket = findTicketById(tickets, 103);
if (existingTicket) {
    console.log(`#${existingTicket.id} - ${existingTicket.title}`);
} else {
    console.log("Ticket not found");
}

console.log("\nFINDING MISSING TICKET");
const missingTicket = findTicketById(tickets, 999);
if (missingTicket) {
    console.log(`#${missingTicket.id} - ${missingTicket.title}`);
} else {
    console.log("Ticket not found");
}







