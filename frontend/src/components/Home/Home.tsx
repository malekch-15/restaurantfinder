import {Restaurant} from "../model/Restaurant";
import RestaurantCard from "../RestaurantCard.tsx";
import {useEffect, useState} from "react";
import SearchBar from "./SearchBar.tsx";



type HomeProps = {
    restaurants: Restaurant [];
    onDeleteRestaurant?: (id: string) => void;
    onToggleWishlist: (id: string) => void;
}

export default function Home(props: Readonly<HomeProps>) {
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState<"name" | "category" |"city">("name");
    const [filteredRestaurants, setFilteredRestaurants] = useState(props.restaurants);

    const handleSearch = (query: string) => {
        setSearchQuery(query.toLowerCase());
    };

    const handleFilterChange = (filter: "name" | "category" | "city") => {
        setFilter(filter);
    }

    // const filteredRestaurants = props.restaurants.filter(
    //     (r) =>
    //         r.name.toLowerCase().includes(searchQuery) ||
    //         r.city.toLowerCase().includes(searchQuery) ||
    //         r.category.toLowerCase().includes(searchQuery)
    // );

    React.useEffect(() => {
        const filtered = props.restaurants.filter((restaurant) => {
            const searchLower = onSearch.toLowerCase();
            switch (filterType) {
                case "name":
                    return restaurant.name.toLowerCase().includes(searchLower);
                case "city":
                    return restaurant.city.toLowerCase().includes(searchLower);
                case "category":
                    return restaurant.category.toLowerCase().includes(searchLower);
                default:
                    return true;
            }
        });
        setFilteredRestaurants(filtered);
    }, [value, filterType, restaurants, setFilteredRestaurants]);



    return (
        <div>
            <h2>Home2</h2>
            <h2>Restaurantfinder</h2>

            <SearchBar onSearch={handleSearch} />
            {filteredRestaurants.map((r) => (
                <RestaurantCard
                    key={r.id}
                    restaurant={r}
                    onDeleteRestaurant={props.onDeleteRestaurant}
                    onToggleWishlist={props.onToggleWishlist}
                />
            ))}
        </div>
    )
}