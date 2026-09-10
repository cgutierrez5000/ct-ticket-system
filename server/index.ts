import express from "express";
import cors from "cors";
import pool from "./db.js";
import {
    isValidPriority,
    isValidStatus,
} from "../utils/ticketUtils.js";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/api/tickets", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                id,
                title,
                description,
                priority,
                status,
                assigned_to AS "assignedTo"
            FROM tickets
            ORDER BY id
        `);

        return res.json(result.rows);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Could not load tickets",
        });
    }
});

app.get("/api/tickets/:id", async (req, res) => {
    const ticketId = Number(req.params.id);

    try {
        const result = await pool.query(
            `
            SELECT
                id,
                title,
                description,
                priority,
                status,
                assigned_to AS "assignedTo"
            FROM tickets
            WHERE id = $1
            `,
            [ticketId]
        );

        const ticket = result.rows[0];

        if (!ticket) {
            return res.status(404).json({
                message: "Ticket not found",
            });
        }

        return res.json(ticket);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Could not load ticket",
        });
    }
});

app.post("/api/tickets", async (req, res) => {
    const {
        title,
        description,
        priority,
        assignedTo,
    } = req.body;

    if (typeof title !== "string" || !title.trim()) {
        return res.status(400).json({
            message: "Title is required",
        });
    }

    if (
        typeof description !== "string" ||
        !description.trim()
    ) {
        return res.status(400).json({
            message: "Description is required",
        });
    }

    if (!isValidPriority(priority)) {
        return res.status(400).json({
            message: "Invalid priority",
        });
    }

    if (
        typeof assignedTo !== "string" ||
        !assignedTo.trim()
    ) {
        return res.status(400).json({
            message: "Assignee is required",
        });
    }

    try {
        const result = await pool.query(
            `
            INSERT INTO tickets (
                title,
                description,
                priority,
                assigned_to
            )
            VALUES ($1, $2, $3, $4)
            RETURNING
                id,
                title,
                description,
                priority,
                status,
                assigned_to AS "assignedTo"
            `,
            [
                title.trim(),
                description.trim(),
                priority,
                assignedTo.trim(),
            ]
        );

        const newTicket = result.rows[0];

        return res.status(201).json(newTicket);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Could not create ticket",
        });
    }
});

app.patch("/api/tickets/:id", async (req, res) => {
    const {
        title,
        description,
        priority,
        status,
        assignedTo,
    } = req.body;

    const ticketId = Number(req.params.id);

    if (typeof title !== "string" || !title.trim()) {
        return res.status(400).json({
            message: "Title is required",
        });
    }

    if (
        typeof description !== "string" ||
        !description.trim()
    ) {
        return res.status(400).json({
            message: "Description is required",
        });
    }

    if (!isValidPriority(priority)) {
        return res.status(400).json({
            message: "Invalid priority",
        });
    }

    if (!isValidStatus(status)) {
        return res.status(400).json({
            message: "Invalid status",
        });
    }

    if (
        typeof assignedTo !== "string" ||
        !assignedTo.trim()
    ) {
        return res.status(400).json({
            message: "Assignee is required",
        });
    }

    try {
        const result = await pool.query(
            `
            UPDATE tickets
            SET
                title = $1,
                description = $2,
                priority = $3,
                status = $4,
                assigned_to = $5
            WHERE id = $6
            RETURNING
                id,
                title,
                description,
                priority,
                status,
                assigned_to AS "assignedTo"
            `,
            [
                title.trim(),
                description.trim(),
                priority,
                status,
                assignedTo.trim(),
                ticketId,
            ]
        );

        const updatedTicket = result.rows[0];

        if (!updatedTicket) {
            return res.status(404).json({
                message: "Ticket not found",
            });
        }

        return res.json(updatedTicket);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Could not update ticket",
        });
    }
});

app.delete("/api/tickets/:id", async (req, res) => {
    const ticketId = Number(req.params.id);

    try {
        const result = await pool.query(
            `
            DELETE FROM tickets
            WHERE id = $1
            RETURNING
                id,
                title,
                description,
                priority,
                status,
                assigned_to AS "assignedTo"
            `,
            [ticketId]
        );

        const deletedTicket = result.rows[0];

        if (!deletedTicket) {
            return res.status(404).json({
                message: "Ticket not found",
            });
        }

        return res.json({
            message: "Ticket deleted",
            ticket: deletedTicket,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Could not delete ticket",
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
