type TicketSummaryProps = {
    total: number;
    open: number;
    inProgress: number;
    closed: number;
};

export default function TicketSummary({
    total, open, inProgress, closed
}: TicketSummaryProps) {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-5 shadow-sm">
                <p className="uppercase text-sm font-medium text-slate-500">Total Tickets</p>
                <p className="text-3xl font-bold">{total}</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm">
                <p className="uppercase text-sm font-medium text-slate-500">Open:</p>
                <p className="text-3xl font-bold">{open}</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm">
                <p className="uppercase text-sm font-medium text-slate-500">In Progress:</p>
                <p className="text-3xl font-bold">{inProgress}</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm">
                <p className="uppercase text-sm font-medium text-slate-500">Closed:</p>
                <p className="text-3xl font-bold">{closed}</p>
            </div>

        </div>
    );
}