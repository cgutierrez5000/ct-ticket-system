import { describe, test, expect } from "vitest";
import tickets from "../data/tickets.js"; // actual ticket data path

import {
    isValidPriority,
    isValidStatus,
    findTicketById,
    isValidTicket,
    addTicket,
    updateTicketStatus,
    deleteTicket,
    ticketIdExists,
    getTicketsByStatus
} from "./ticketUtils.ts";

describe("isValidPriority", () => {
    test("high should be a valid priority", () => {
        expect(isValidPriority("high")).toBe(true);
    });

    test("banana shouldn't be a valid priority", () => {
        expect(isValidPriority("banana")).toBe(false);
    });
});

describe("isValidStatus", () => {
    test("open should be a valid status", () => {
        expect(isValidStatus("open")).toBe(true);
    });

    test("pending shouldn't be a valid status", () => {
        expect(isValidStatus("pending")).toBe(false);
    });
});

describe("findTicketById", () => {

    test("should find an existing ticket", () => {
        const result = findTicketById(tickets, 103);
        expect(result.id).toBe(103);

    });

    test("should return undefined when ticket does not exist", () => {
        const result = findTicketById(tickets, 999);
        expect(result).toBeUndefined();
    });

});

describe("isValidTicket", () => {
    test("should be a valid ticket", () => {
        const validTicket = {
            id: 106,
            title: "Contact form validation issue",
            priority: "medium",
            status: "open",
            assignedTo: "Carlos"
        };

        const validResult = isValidTicket(validTicket);
        expect(validResult).toBe(true);
    });

    test("should reject a ticket with an invalid priority", () => {
        const invalidTicket = {
            id: 107,
            title: "Contact form validation issue",
            priority: "banana",       // ← ONLY invalid thing
            status: "open",
            assignedTo: "Carlos"
        };

        const invalidResult = isValidTicket(invalidTicket);
        expect(invalidResult).toBe(false);
    });

    test("should reject a ticket with an invalid status", () => {
        const invalidTicket = {
            id: 107,
            title: "Contact form validation issue",
            priority: "high",
            status: "pending", // ← ONLY invalid thing
            assignedTo: "Carlos"
        };

        const invalidResult = isValidTicket(invalidTicket);
        expect(invalidResult).toBe(false);
    });

    test("should reject a ticket with a blank title", () => {
        const invalidTicket = {
            id: 107,
            title: " ", // ← ONLY invalid thing
            priority: "high",
            status: "closed",
            assignedTo: "Carlos"
        };

        const invalidResult = isValidTicket(invalidTicket);
        expect(invalidResult).toBe(false);
    });

    test("should reject null", () => {
        expect(isValidTicket(null)).toBe(false);
    });
});

describe("addTicket", () => {

    test("should add a valid unique ticket without mutating the original array", () => {
        const validTicket = {
            id: 106,
            title: "Contact form validation issue",
            priority: "medium",
            status: "open",
            assignedTo: "Carlos"
        };

        const result = addTicket(tickets, validTicket);
        expect(result.length).toBe(6);
        expect(tickets.length).toBe(5);
        expect(result).not.toBe(tickets);
    });

    test("should reject an invalid ticket and return the original array", () => {
        const invalidTicket = {
            id: 107,
            title: "Contact form validation issue",
            priority: "banana",
            status: "open",
            assignedTo: "Carlos"
        };

        const result = addTicket(tickets, invalidTicket);
        expect(result.length).toBe(5);
        expect(tickets.length).toBe(5);
        expect(result).toBe(tickets);
    });

    test("should reject a ticket with duplicate ID and return the original array", () => {
        const duplicateTicket = {
            id: 101,
            title: "Duplicate ticket test",
            priority: "high",
            status: "open",
            assignedTo: "John"
        };

        const result = addTicket(tickets, duplicateTicket);
        expect(result.length).toBe(5);
        expect(tickets.length).toBe(5);
        expect(result).toBe(tickets);
    });

});

describe("updateTicketStatus", () => {
    test("should update the selected ticket without mutating the original array", () => {
        const result = updateTicketStatus(tickets, 103, "closed");
        expect(findTicketById(result, 103).status).toBe("closed");
        expect(findTicketById(tickets, 103).status).toBe("in progress");
        expect(result).not.toBe(tickets);
        expect(result[0] === tickets[0]).toBe(true);
    });
});

describe("deleteTicket", () => {
    test("should remove the selected ticket without mutating the original array", () => {
        const result = deleteTicket(tickets, 104);
        expect(result.length).toBe(4);
        expect(tickets.length).toBe(5);
        expect(result).not.toBe(tickets);
        expect(result.some(ticket => ticket.id === 104)).toBe(false);
    });

});

describe("ticketIdExists", () => {
    test("should return true if ticket ID exists", () => {
        const result = ticketIdExists(tickets, 103);
        expect(result).toBe(true);
    });

    test("should return false if ticket ID doesn't exist", () => {
        const result = ticketIdExists(tickets, 109);
        expect(result).toBe(false);
    });

});

describe("getTicketsByStatus", () => {
    test("should return tickets matching the requested status", () => {
        const result = getTicketsByStatus(tickets, "in progress");
        expect(result.map(ticket => ticket.id)).toEqual([102, 103]);
    });

    test("should return an empty array when no tickets match", () => {
        const result = getTicketsByStatus(tickets, "banana");
        expect(result).toEqual([]);
    });

});