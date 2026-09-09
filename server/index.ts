import express from "express";
import cors from "cors";
import tickets from "../data/tickets.js";
import type { Ticket } from "../types/ticket.js";
import { isValidPriority, isValidStatus } from "../utils/ticketUtils.js";


const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let ticketList: Ticket[] = [...tickets];

app.get("/api/tickets", (req, res) => {
    return res.json(ticketList);
});

app.get("/api/tickets/:id", (req, res) => {
    const ticketId = Number(req.params.id);
    const ticket = ticketList.find((ticket) => ticket.id === ticketId);

    if (!ticket) {
        return res.status(404).json({
            message: "Ticket not found"
        });
    }

    return res.json(ticket);

});

app.post("/api/tickets", (req, res) => {

    const { title, description, priority, assignedTo } = req.body;

    if (typeof title !== "string" || !title.trim()) {
        return res.status(400).json({
            message: "Title is required"
        });
    }

    if (typeof description !== "string" || !description.trim()) {
        return res.status(400).json({
            message: "Description is required"
        });
    }

    if (!isValidPriority(priority)) {
        return res.status(400).json({
            message: "Invalid priority"
        });
    }

    if (typeof assignedTo !== "string" || !assignedTo.trim()) {
        return res.status(400).json({
            message: "Assignee is required"
        });
    }

    const newId = ticketList.length === 0
        ? 1
        : Math.max(...ticketList.map(ticket => ticket.id)) + 1;

    const newTicket: Ticket = {
        id: newId,
        title: title.trim(),
        description: description.trim(),
        priority,
        status: "open",
        assignedTo: assignedTo.trim()
    };

    ticketList.push(newTicket);
    return res.status(201).json(newTicket);
});

app.patch("/api/tickets/:id", (req, res) => {
    const {
        title,
        description,
        priority,
        status,
        assignedTo
    } = req.body;
    const ticketId = Number(req.params.id);
    const ticket = ticketList.find((ticket) => ticket.id === ticketId);

    if (!ticket) {
        return res.status(404).json({
            message: "Ticket not found"
        });
    }

    if (title !== undefined) {
        if (typeof title !== "string" || !title.trim()) {
            return res.status(400).json({
                message: "Title is required"
            });
        }
    }

    if (description !== undefined) {
        if (typeof description !== "string" || !description.trim()) {
            return res.status(400).json({
                message: "Description is required"
            });
        }
    }

    if (priority !== undefined) {
        if (!isValidPriority(priority)) {
            return res.status(400).json({
                message: "Invalid priority"
            });
        }
    }

    if (assignedTo !== undefined) {
        if (typeof assignedTo !== "string" || !assignedTo.trim()) {
            return res.status(400).json({
                message: "Assignee is required"
            });
        }
    }

    if (status !== undefined) {
        if (!isValidStatus(status)) {
            return res.status(400).json({
                message: "Invalid status"
            });
        }
    }

    const updatedTicket: Ticket = {
        ...ticket,
        title: title !== undefined
            ? title.trim()
            : ticket.title,
        description: description !== undefined
            ? description.trim()
            : ticket.description,
        priority: priority !== undefined
            ? priority
            : ticket.priority,
        status: status !== undefined
            ? status
            : ticket.status,
        assignedTo: assignedTo !== undefined
            ? assignedTo.trim()
            : ticket.assignedTo
    };

    ticketList = ticketList.map((ticket) =>
        (ticket.id === ticketId) ? updatedTicket : ticket
    );


    return res.json(updatedTicket);

});

app.delete("/api/tickets/:id", (req, res) => {
    const ticketId = Number(req.params.id);
    const ticket = ticketList.find((ticket) => ticket.id === ticketId);

    if (!ticket) {
        return res.status(404).json({
            message: "Ticket not found"
        });
    }

    ticketList = ticketList.filter(ticket => ticket.id !== ticketId);

    return res.json({
        message: "Ticket deleted",
        ticket
    });

});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

