import { ChangeEvent } from "react";
import "./SearchBar.css"
type SearchBarProps = {
    onSearch: (query: string) => void;
};

export default function SearchBar({ onSearch }: SearchBarProps) {
    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value);
    };

    return (
        <div className="search-bar-container">
            <input
                type="text"
                placeholder="Search restaurants..."
                onChange={handleSearchChange}
            />
        </div>
    );
}