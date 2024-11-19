import { ChangeEvent } from "react";

type SearchBarProps = {
    onSearch: (query: string) => void;
};

export default function SearchBar({ onSearch }: SearchBarProps) {
    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search restaurants..."
                onChange={handleSearchChange}
            />
        </div>
    );
}