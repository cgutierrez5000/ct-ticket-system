import { useEffect, useState } from "react";
import TicketCard from "./components/TicketCard";
import TicketSummary from "./components/TicketSummary";
import TicketFilters from "./components/TicketFilters";
import TicketForm from "./components/TicketForm";
import SearchBox from "./components/SearchBox";
import type { Ticket, TicketStatus, NewTicketData } from "../types/ticket";



export default function App() {
    const [statusFilter, setStatusFilter] = useState<TicketStatus | "all">("all");
    const [ticketList, setTicketList] = useState<Ticket[]>([]);
    const [editingTicketId, setEditingTicketId] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState("")
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("http://localhost:3001/api/tickets")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Could not load tickets");
                }

                return response.json();
            })
            .then(data => {
                setTicketList(data);
            })
            .catch(() => {
                setError("Could not load tickets.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const statusFilteredTickets =
        statusFilter === "all"
            ? ticketList
            : ticketList.filter(ticket => ticket.status === statusFilter);

    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    const filteredTickets = statusFilteredTickets.filter(
        ticket =>
            ticket.title
                .toLowerCase()
                .includes(normalizedSearchTerm)
    );

    const editingTicket = ticketList.find(
        ticket => ticket.id === editingTicketId
    );

    function handleDelete(id: number) {
        setError(null);

        fetch(`http://localhost:3001/api/tickets/${id}`, {
            method: "DELETE"
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Could not delete ticket");
                }

                setTicketList(previousTickets =>
                    previousTickets.filter(ticket => ticket.id !== id)
                );
            })
            .catch(() => {
                setError("Could not delete ticket.");
            });
    }

    function handleEdit(id: number) {
        setEditingTicketId(id);
    }

    function handleAddTicket(newTicketData: NewTicketData) {
        setError(null);

        fetch("http://localhost:3001/api/tickets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTicketData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Could not create ticket");
                }

                return response.json();
            })
            .then(newTicket => {
                setTicketList(previousTickets => [
                    ...previousTickets,
                    newTicket
                ]);
            })
            .catch(() => {
                setError("Could not create ticket.")
            });
    }

    function handleUpdateTicket(updatedTicketData: NewTicketData) {
        setError(null);

        fetch(`http://localhost:3001/api/tickets/${editingTicketId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            }, body: JSON.stringify(updatedTicketData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Could not update ticket");
                }

                return response.json();
            })
            .then((updatedTicket: Ticket) => {
                if (!updatedTicket) return;

                setTicketList(previousTickets =>
                    previousTickets.map(ticket =>
                        ticket.id === updatedTicket.id
                            ? updatedTicket
                            : ticket
                    )
                );
                setEditingTicketId(null);
            })
            .catch(() => {
                setError("Could not update ticket.");
            });
    }

    function handleCancelEdit() {
        setEditingTicketId(null);
    }

    const openCount =
        ticketList.filter(ticket => ticket.status === "open").length;
    const closedCount =
        ticketList.filter(ticket => ticket.status === "closed").length;
    const inProgressCount =
        ticketList.filter(ticket => ticket.status === "in progress").length;

    return (
        <main className="min-h-screen bg-slate-100 px-6 py-10">
            <div className="mx-auto max-w-6xl">
                <header className="mb-8">
                    <p className="text-sm font-medium uppercase tracking-wider text-slate-500">
                        Dashboard
                    </p>
                    <h1 className="text-4xl font-bold text-slate-900">
                        CT Ticket System
                    </h1>
                </header>
                <TicketSummary
                    total={ticketList.length}
                    open={openCount}
                    inProgress={inProgressCount}
                    closed={closedCount}
                />
                <section className="bg-white rounded-xl p-5 shadow-sm mb-8">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                        <p className="text-sm font-medium text-slate-600">Showing {filteredTickets.length} tickets</p>
                        <TicketFilters
                            statusFilter={statusFilter}
                            onFilterChange={setStatusFilter}
                        />
                    </div>
                    <SearchBox
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                    />
                </section>
                <TicketForm
                    onAddTicket={handleAddTicket}
                    editingTicket={editingTicket}
                    onUpdateTicket={handleUpdateTicket}
                    onCancelEdit={handleCancelEdit}
                />

                {
                    isLoading && (
                        <p className="mb-4 text-sm text-slate-500">
                            Loading tickets...
                        </p>
                    )
                }

                {
                    error && (
                        <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>
                    )
                }

                {filteredTickets.length === 0 ? (
                    <p>No tickets found.</p>
                ) : (
                    filteredTickets.map(ticket => (
                        <TicketCard
                            key={ticket.id}
                            ticket={ticket}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                        />
                    ))
                )}
            </div>
        </main>
    );
}