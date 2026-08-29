import { useState } from "react";
import tickets from "../data/tickets";
import TicketCard from "./components/TicketCard";
import TicketSummary from "./components/TicketSummary";
import TicketFilters from "./components/TicketFilters";
import TicketForm from "./components/TicketForm";
import SearchBox from "./components/SearchBox";
import type { Ticket, TicketStatus, NewTicketData } from "../types/ticket";


export default function App() {
    const [statusFilter, setStatusFilter] = useState<TicketStatus | "all">("all");
    const [ticketList, setTicketList] = useState(tickets);
    const [editingTicketId, setEditingTicketId] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState("")

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
        setTicketList(
            previousTickets => previousTickets.filter(ticket => ticket.id !== id)
        );
    }

    function handleEdit(id: number) {
        setEditingTicketId(id);
    }

    function handleAddTicket(newTicketData: NewTicketData) {
        const newId = (ticketList.length === 0) ? 1 : Math.max(...ticketList.map(ticket => ticket.id)) + 1;
        const newTicket: Ticket = {
            id: newId,
            title: newTicketData.title,
            description: newTicketData.description,
            priority: newTicketData.priority,
            status: "open",
            assignedTo: newTicketData.assignedTo
        };
        setTicketList(previousTickets => [
            ...previousTickets,
            newTicket
        ]);
    }

    function handleUpdateTicket(updatedTicketData: NewTicketData) {
        setTicketList(previousTickets =>
            previousTickets.map(ticket => {
                if (ticket.id === editingTicketId) {
                    return {
                        ...ticket,
                        title: updatedTicketData.title,
                        description: updatedTicketData.description,
                        priority: updatedTicketData.priority,
                        assignedTo: updatedTicketData.assignedTo,
                    };
                }

                return ticket;
            })
        );

        setEditingTicketId(null);
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
        <main>
            <h1>CT Ticket System</h1>

            <TicketSummary
                total={ticketList.length}
                open={openCount}
                inProgress={inProgressCount}
                closed={closedCount}
            />

            <p>Showing {filteredTickets.length} tickets</p>
            <TicketFilters
                statusFilter={statusFilter}
                onFilterChange={setStatusFilter}
            />

            <SearchBox
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
            />

            <TicketForm
                onAddTicket={handleAddTicket}
                editingTicket={editingTicket}
                onUpdateTicket={handleUpdateTicket}
                onCancelEdit={handleCancelEdit}
            />

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
        </main>
    );
}