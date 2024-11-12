import "./SearchBar.css";

type SearchBarProps = {
    value: string;
    onChange: (value: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Suche nach Restaurant..."
                value={value}
                onChange={handleInputChange}
            />
        </div>
    );
};

export default SearchBar;
