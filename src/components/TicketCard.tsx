import type { Ticket } from "../../types/ticket";

type TicketCardProps = {
    ticket: Ticket;
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
};

export default function TicketCard({ ticket, onDelete, onEdit }: TicketCardProps) {
    return (
        <article>
            <h2>{ticket.title}</h2>
            <p>id: {ticket.id}</p>
            <p>Description: {ticket.description}</p>
            <p>Priority: {ticket.priority}</p>
            <p>Status: {ticket.status}</p>
            <p>Assigned to: {ticket.assignedTo}</p>
            <button onClick={() => onDelete(ticket.id)}>
                Delete
            </button>
            <button onClick={() => onEdit(ticket.id)}>
                Edit
            </button>
        </article>
    );
}