import express from "express";
import session from "express-session";
import "dotenv/config"
import cors from "cors";
import pool from "./db.js";
import {
    isValidPriority,
    isValidStatus,
} from "../utils/ticketUtils.js";
import bcrypt from "bcrypt";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
    throw new Error("SESSION_SECRET is not defined");
}

app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true
    }
}));

app.get("/api/tickets", async (req, res) => {
    try {
        const result = await pool.query(
            `
            SELECT
                t.id,
                t.title,
                t.description,
                t.priority,
                t.status,
                t.assigned_user_id AS "assignedUserId",
                u.name AS "assignedTo"
            FROM tickets t
            LEFT JOIN users u
                ON t.assigned_user_id = u.id
            ORDER BY t.id
            `
        );

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
                t.id,
                t.title,
                t.description,
                t.priority,
                t.status,
                t.assigned_user_id AS "assignedUserId",
                u.name AS "assignedTo"
            FROM tickets t
            LEFT JOIN users u
                ON t.assigned_user_id = u.id
            WHERE t.id = $1
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
        assignedUserId,
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

    if (assignedUserId !== null &&
        assignedUserId !== undefined &&
        (
            typeof assignedUserId !== "number" ||
            !Number.isInteger(assignedUserId) ||
            assignedUserId <= 0
        )
    ) {
        return res.status(400).json({
            message: "Invalid assignee",
        });
    }

    try {
        const result = await pool.query(
            `
            INSERT INTO tickets (
                title,
                description,
                priority,
                assigned_user_id
            )
            VALUES ($1, $2, $3, $4)
            RETURNING
                id,
                title,
                description,
                priority,
                status,
                assigned_user_id AS "assignedUserId"
            `,
            [
                title.trim(),
                description.trim(),
                priority,
                assignedUserId ?? null
            ]
        );

        const ticketResult = await pool.query(
            `
            SELECT
                t.id,
                t.title,
                t.description,
                t.priority,
                t.status,
                t.assigned_user_id AS "assignedUserId",
                u.name AS "assignedTo"
            FROM tickets t
            LEFT JOIN users u
                ON t.assigned_user_id = u.id
            WHERE t.id = $1
            `, [result.rows[0].id]
        );

        const newTicket = ticketResult.rows[0];

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
        assignedUserId,
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

    if (assignedUserId !== null &&
        assignedUserId !== undefined &&
        (
            typeof assignedUserId !== "number" ||
            !Number.isInteger(assignedUserId) ||
            assignedUserId <= 0
        )
    ) {
        return res.status(400).json({
            message: "Invalid assignee",
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
                assigned_user_id = $5
            WHERE id = $6
            RETURNING
                id,
                title,
                description,
                priority,
                status,
                assigned_user_id AS "assignedUserId"
            `,
            [
                title.trim(),
                description.trim(),
                priority,
                status,
                assignedUserId ?? null,
                ticketId,
            ]
        );

        const updatedRow = result.rows[0]

        if (!updatedRow) {
            return res.status(404).json({
                message: "Ticket not found",
            });
        }

        const updatedResult = await pool.query(
            `
            SELECT
                t.id,
                t.title,
                t.description,
                t.priority,
                t.status,
                t.assigned_user_id AS "assignedUserId",
                u.name AS "assignedTo"
            FROM tickets t
            LEFT JOIN users u
                ON t.assigned_user_id = u.id
            WHERE t.id =$1
            `, [updatedRow.id]
        );

        const updatedTicket = updatedResult.rows[0];

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
                id
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

app.post("/api/auth/register", async (req, res) => {
    const { name, email, password } = req.body;

    if (typeof name !== "string" || !name.trim()) {
        return res.status(400).json({
            message: "Name is required"
        });
    }

    if (typeof email !== "string" || !email.trim()) {
        return res.status(400).json({
            message: "Email is required"
        });
    }

    if (typeof password !== "string" || password.trim().length < 8) {
        return res.status(400).json({
            message: "Password must be at least 8 characters long"
        });
    }

    const normalizedEmail = email.trim().toLowerCase();

    try {
        const existingUser = await pool.query(
            `
            SELECT id 
            FROM users 
            WHERE email = $1

            `,
            [normalizedEmail]
        );

        if ((existingUser.rowCount ?? 0) > 0) {
            return res.status(409).json({
                message: "Email already registered"
            });
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const result = await pool.query(
            `
            INSERT INTO users(name, email, password_hash)
            VALUES ($1, $2, $3)
            RETURNING
            id,
            name,
            email,
            role
            `,
            [name, normalizedEmail, passwordHash]
        );

        return res.status(201).json({
            "user": result.rows[0]
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }


});

app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;

    if (typeof email !== "string" || !email.trim()) {
        return res.status(400).json({
            message: "Email is required"
        });
    }

    if (typeof password !== "string" || !password.trim()) {
        return res.status(400).json({
            message: "Password is required"
        });
    }

    const normalizedEmail = email.trim().toLowerCase();

    try {
        const result = await pool.query(
            `
        SELECT
            id,
            name,
            email,
            password_hash,
            role
        FROM users
        WHERE email = $1
        `, [normalizedEmail]
        );

        const user = result.rows[0];

        if (user === undefined) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const passwordMatches = await bcrypt.compare(password, user.password_hash);

        if (!passwordMatches) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        req.session.userId = user.id;

        return res.status(200).json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }


});

app.get("/api/auth/me", async (req, res) => {

    if (!req.session.userId) {
        return res.status(401).json({
            message: "Not authenticated"
        });
    }

    try {
        const result = await pool.query(
            `
            SELECT 
            id, 
            name, 
            email, 
            role
            FROM users
            WHERE id = $1
            `,
            [req.session.userId]
        );

        const user = result.rows[0];

        if (user === undefined) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }



});

app.get("/api/users", async (req, res) => {

    try {
        const result = await pool.query(
            `
            SELECT 
            id, 
            name
            FROM users
            ORDER BY name

            `
        );
        return res.status(200).json(result.rows);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }

});



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
