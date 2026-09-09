type SearchBoxProps = {
    searchTerm: string;
    onSearchChange: (value: string) => void;
};

export default function SearchBox({
    searchTerm,
    onSearchChange
}: SearchBoxProps) {
    return (
        <div className="mt-4">
            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="search_tickets">Search tickets</label>
            <input
                className="w-full rounded-lg border border-slate-300 bg-white 
                px-4 py-2.5 text-slate-900 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                id="search_tickets"
                placeholder="Search by title..."
                value={searchTerm}
                onChange={(event) => onSearchChange(event.target.value)}
            />
        </div>

    );
}