
import type { TicketStatus } from "../../types/ticket";
type TicketFiltersProps = {
    statusFilter: TicketStatus | "all";
    onFilterChange: (status: TicketStatus | "all") => void;
};

export default function TicketFilters({ onFilterChange, statusFilter }: TicketFiltersProps) {
    return (

        <div className="flex flex-wrap items-center gap-2">
            <button className={
                statusFilter === "open"
                    ? "rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white"
                    : "rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
            } onClick={() => onFilterChange("open")}>
                Open
            </button>
            <button className={
                statusFilter === "closed"
                    ? "rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white"
                    : "rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
            }
                onClick={() => onFilterChange("closed")}>
                Closed
            </button>
            <button className={
                statusFilter === "in progress"
                    ? "rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white"
                    : "rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
            }
                onClick={() => onFilterChange("in progress")}>
                In Progress
            </button>
            <button className={
                statusFilter === "all"
                    ? "rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white"
                    : "rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
            } onClick={() => onFilterChange("all")}>
                All
            </button>
        </div>
    );
}
