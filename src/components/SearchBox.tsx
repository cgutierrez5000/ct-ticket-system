type SearchBoxProps = {
    searchTerm: string;
    onSearchChange: (value: string) => void;
};

export default function SearchBox({
    searchTerm,
    onSearchChange
}: SearchBoxProps) {
    return (
        <div>
            <label htmlFor="search_tickets">Search tickets</label>
            <input
                id="search_tickets"
                placeholder="Search by title..."
                value={searchTerm}
                onChange={(event) => onSearchChange(event.target.value)}
            />
        </div>

    );
}