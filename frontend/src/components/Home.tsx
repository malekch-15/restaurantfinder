import {Restaurant} from "./Restaurant.ts";
import axios from "axios";
import {useCallback, useEffect, useState} from "react";
import {WishlistStatus} from "./WishlistStatus.ts";
import "./SearchBar.tsx";
import SearchBar from "./SearchBar.tsx";
import "./Home.css"

type Props = {
    restaurant: Restaurant;
    onAddToWishlist: (id: string) => void;
    onRemoveFromWishlist: (id: string) => void;
    wishlistStatus: WishlistStatus;
    onRestaurantUpdate: (restaurant: Restaurant) => void;
}

export default function Home() {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [searchValue, setSearchValue] = useState<string>("");
    const [filterType, setFilterType] = useState<string>("name");

    const fetchRestaurants = useCallback(() => {
        axios
            .get("api/restaurant")
            .then((response) => setRestaurants(response.data))
            .catch((error) => console.error("Error fetching restaurants:", error));
    }, []);

    useEffect(() => {
        fetchRestaurants();
    }, [fetchRestaurants]);

    const filteredRestaurants = restaurants.filter((restaurant) => {
        const searchLower = searchValue.toLowerCase();
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

    return (
        <div className="page">
            <h1>Restaurants</h1>

            <SearchBar value={searchValue} onChange={setSearchValue} />

            <div className="filter-buttons">
                <button
                    onClick={() => setFilterType("name")}
                    className={filterType === "name" ? "active" : ""}
                >
                    Name
                </button>
                <button
                    onClick={() => setFilterType("city")}
                    className={filterType === "city" ? "active" : ""}
                >
                    City
                </button>
                <button
                    onClick={() => setFilterType("category")}
                    className={filterType === "category" ? "active" : ""}
                >
                    Category
                </button>
            </div>

            <div className="restaurant-list">
                {filteredRestaurants.map((restaurant) => (
                    <div key={restaurant.id} className="restaurant-card">
                        <h2>{restaurant.name}</h2>
                        <p>{restaurant.city}</p>
                        <p>{restaurant.category}</p>
                        <p>{restaurant.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}