
import type { TicketStatus } from "../../types/ticket";
type TicketFiltersProps = {
    statusFilter: TicketStatus | "all";
    onFilterChange: (status: TicketStatus | "all") => void;
};

export default function TicketFilters({ onFilterChange, statusFilter }: TicketFiltersProps) {
    return (

        <div>
            <p>Current filter: {statusFilter}</p>
            <button onClick={() => onFilterChange("open")}>
                Open
            </button>
            <button onClick={() => onFilterChange("closed")}>
                Closed
            </button>
            <button onClick={() => onFilterChange("in progress")}>
                In Progress
            </button>
            <button onClick={() => onFilterChange("all")}>
                All
            </button>
        </div>
    );
}
