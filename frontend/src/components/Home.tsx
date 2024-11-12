import {Restaurant} from "./Restaurant.ts";
import axios from "axios";
import {useCallback, useEffect, useState} from "react";
import {WishlistStatus} from "./WishlistStatus.ts";
import SearchBar from "./SearchBar.tsx";
import "./Home.css"
import RestaurantCard from "./RestaurantCard.tsx";
import {useNavigate} from "react-router-dom";

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
    const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);

    const navigate = useNavigate();

    const fetchRestaurants = useCallback(() => {
        axios
            .get("api/restaurant")
            .then((response) => setRestaurants(response.data))
            .catch((error) => console.error("Error fetching restaurants:", error));
    }, []);

    useEffect(() => {
        fetchRestaurants();
    }, [fetchRestaurants]);

    const handleViewDetails = (id: string) => {
        navigate(`/restaurant/${id}`);
    };

    const handleDelete = (id: string) => {
        axios
            .delete(`/api/restaurant/${id}`)
            .then(() => {
                setRestaurants(restaurants.filter((restaurant) => restaurant.id !== id));
            })
            .catch((error) => {
                console.error("Error deleting restaurant:", error);
            });
    };

    const handleToggleWishlist = (id: string) => {
        console.log(`Toggling wishlist for restaurant with id: ${id}`);
    };

    return (
        <div className="page">
            <h1>Restaurants</h1>
            <SearchBar
                value={searchValue}
                onChange={setSearchValue}
                restaurants={restaurants}
                setFilteredRestaurants={setFilteredRestaurants}
            />
            <div className="restaurant-list">
                {filteredRestaurants.map((restaurant) => (
                    <RestaurantCard
                        key={restaurant.id}
                        restaurant={restaurant}
                        onViewDetails={handleViewDetails}
                        onDelete={handleDelete}
                        onToggleWishlist={handleToggleWishlist}
                    />
                ))}
            </div>
        </div>
    );
}