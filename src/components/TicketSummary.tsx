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
        <div>
            <p>Total: {total}</p>
            <p>Open: {open}</p>
            <p>In Progress: {inProgress}</p>
            <p>Closed: {closed}</p>
        </div>
    );
}