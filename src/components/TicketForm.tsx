import { useEffect, useState } from "react";
import type { SubmitEvent } from "react";
import type { NewTicketData, TicketPriority, Ticket } from "../../types/ticket";



type TicketFormProps = {
    onAddTicket: (newTicketData: NewTicketData) => void;
    editingTicket: Ticket | undefined;
    onUpdateTicket: (newTicketData: NewTicketData) => void;
    onCancelEdit: () => void
};

export default function TicketForm({ onAddTicket, editingTicket, onUpdateTicket, onCancelEdit }: TicketFormProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const [priority, setPriority] = useState<TicketPriority>("medium");
    const [assignedTo, setAssignedTo] = useState("Unassigned");

    useEffect(() => {
        if (editingTicket) {
            setTitle(editingTicket.title);
            setDescription(editingTicket.description);
            setPriority(editingTicket.priority);
            setAssignedTo(editingTicket.assignedTo);
        } else {
            setError("");
            setTitle("");
            setDescription("");
            setPriority("medium");
            setAssignedTo("Unassigned");
        }
    }, [editingTicket]);

    function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!title.trim() || !description.trim()) {
            setError("Title and description are required.");
            return;
        }

        const newTicketData: NewTicketData = {
            title: title.trim(),
            description: description.trim(),
            priority,
            assignedTo
        };


        if (editingTicket) {
            onUpdateTicket(newTicketData);
        } else {
            onAddTicket(newTicketData);
        }

        setError("");
        setTitle("");
        setDescription("");
        setPriority("medium");
        setAssignedTo("Unassigned");
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
            </div>

            {error && <p>{error}</p>}

            <div>
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
                <select value={priority} onChange={(event) => setPriority(event.target.value as TicketPriority)}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                </select>
                <select value={assignedTo} onChange={(event) => setAssignedTo(event.target.value)}>
                    <option value="Unassigned">Unassigned</option>
                    <option value="Carlos">Carlos</option>
                    <option value="Tom">Tom</option>
                    <option value="Earl">Earl</option>
                    <option value="John">John</option>
                </select>
            </div>

            <button type="submit">
                {
                    editingTicket ? "Update Ticket" : "Add Ticket"

                }
            </button>

            {editingTicket && (
                <button
                    type="button"
                    onClick={onCancelEdit}>
                    Cancel Edit
                </button>
            )}


        </form>
    );
}
