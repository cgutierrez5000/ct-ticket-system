import { useEffect, useState } from "react";
import type { SubmitEvent } from "react";
import type { NewTicketData, UpdateTicketData, TicketPriority, TicketStatus, Ticket, } from "../../types/ticket";



type TicketFormProps = {
    onAddTicket: (newTicketData: NewTicketData) => void;
    editingTicket: Ticket | undefined;
    onUpdateTicket: (updatedTicketData: UpdateTicketData) => void;
    onCancelEdit: () => void;
};

export default function TicketForm({ onAddTicket, editingTicket, onUpdateTicket, onCancelEdit }: TicketFormProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const [priority, setPriority] = useState<TicketPriority>("medium");
    const [assignedTo, setAssignedTo] = useState("Unassigned");
    const [status, setStatus] = useState<TicketStatus>("open");

    useEffect(() => {
        if (editingTicket) {
            setTitle(editingTicket.title);
            setDescription(editingTicket.description);
            setPriority(editingTicket.priority);
            setStatus(editingTicket.status);
            setAssignedTo(editingTicket.assignedTo);
        } else {
            setError("");
            setTitle("");
            setDescription("");
            setPriority("medium");
            setStatus("open");
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
            const updatedTicketData: UpdateTicketData = {
                ...newTicketData,
                status,
            };

            onUpdateTicket(updatedTicketData);
        } else {
            onAddTicket(newTicketData);
        }

        setError("");
        setTitle("");
        setDescription("");
        setPriority("medium");
        setStatus("open");
        setAssignedTo("Unassigned");
    }

    return (
        <form className="mb-8 rounded-xl bg-white p-6 shadow-sm"
            onSubmit={handleSubmit}>
            <h2 className="mb-6 text-xl font-bold text-slate-900">
                {editingTicket ? "Edit Ticket" : "Create Ticket"}
            </h2>
            <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="title">Title</label>
                <input className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 
                    text-slate-900 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                    id="title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
            </div>

            {error && (<p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>)}

            <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="description">Description</label>
                <textarea className="w-full min-h-28 resize-y rounded-lg border border-slate-300 bg-white px-4 py-2.5 
                    text-slate-900 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                    id="description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
            </div>
            <div className="mb-6 grid gap-4 md:grid-cols-2">
                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="priority">Priority</label>
                    <select className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 
                        text-slate-900 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                        id="priority"
                        value={priority}
                        onChange={(event) => setPriority(event.target.value as TicketPriority)}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                    </select>
                </div>
                {editingTicket && (
                    <div>
                        <label
                            className="mb-2 block text-sm font-medium text-slate-700"
                            htmlFor="status"
                        >
                            Status
                        </label>

                        <select
                            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5
                text-slate-900 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                            id="status"
                            value={status}
                            onChange={(event) =>
                                setStatus(event.target.value as TicketStatus)
                            }
                        >
                            <option value="open">Open</option>
                            <option value="in progress">In Progress</option>
                            <option value="closed">Closed</option>
                        </select>
                    </div>
                )}

                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="assignedTo">Assigned To</label>
                    <select className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 
                        text-slate-900 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                        id="assignedTo"
                        value={assignedTo}
                        onChange={(event) => setAssignedTo(event.target.value)}>
                        <option value="Unassigned">Unassigned</option>
                        <option value="Carlos">Carlos</option>
                        <option value="Tom">Tom</option>
                        <option value="Earl">Earl</option>
                        <option value="John">John</option>
                    </select>
                </div>

            </div>
            <div className="flex flex-wrap gap-3">
                <button className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-700"
                    type="submit">
                    {
                        editingTicket ? "Update Ticket" : "Add Ticket"

                    }
                </button>

                {editingTicket && (
                    <button className="rounded-lg border border-slate-300 bg-white 
                        px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                        type="button"
                        onClick={onCancelEdit}>
                        Cancel Edit
                    </button>
                )}
            </div>

        </form>
    );
}
