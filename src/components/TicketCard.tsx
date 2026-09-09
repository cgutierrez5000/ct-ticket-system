import type { Ticket } from "../../types/ticket";

type TicketCardProps = {
    ticket: Ticket;
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
};

const priorityClasses = {
    low: "bg-slate-100 text-slate-700",
    medium: "bg-blue-50 text-blue-700",
    high: "bg-amber-50 text-amber-700",
    urgent: "bg-red-50 text-red-700"
};

const statusClasses = {
    open: "bg-emerald-50 text-emerald-700",
    "in progress": "bg-blue-50 text-blue-700",
    closed: "bg-slate-100 text-slate-600"
};

export default function TicketCard({ ticket, onDelete, onEdit }: TicketCardProps) {
    return (
        <article className="mb-4 rounded-xl bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-start justify-between gap-4">
                <div>
                    <h2 className="text-lg font-bold text-slate-900">{ticket.title}</h2>
                    <p className="text-sm text-slate-500">Ticket #{ticket.id}</p>
                </div>
                <div className="flex gap-2">
                    <p
                        className={`rounded-full px-3 py-1 text-xs font-medium uppercase ${priorityClasses[ticket.priority]}`}
                    >
                        Priority: {ticket.priority}
                    </p>
                    <p className={`rounded-full px-3 py-1 text-xs font-medium uppercase ${statusClasses[ticket.status]}`}>Status: {ticket.status}</p>
                </div>
            </div>
            <p className="mb-4 text-sm leading-6 text-slate-600">Description: {ticket.description}</p>
            <p className="text-sm text-slate-500">Assigned to: <span className="font-medium text-slate-700">{ticket.assignedTo}</span></p>
            <div className="mt-5 flex gap-3">
                <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
                    onClick={() => onEdit(ticket.id)}>
                    Edit
                </button>
                <button className="rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                    onClick={() => onDelete(ticket.id)}>
                    Delete
                </button>
            </div>
        </article>
    );
}