import {Restaurant} from "./Restaurant.ts";
import axios from "axios";
import {useEffect, useState} from "react";
import {WishlistStatus} from "./WishlistStatus.ts";

type Props = {
    restaurant: Restaurant;
    onAddToWishlist: (id: string) => void;
    onRemoveFromWishlist: (id: string) => void;
    wishlistStatus: WishlistStatus;
    onRestaurantUpdate: (restaurant: Restaurant) => void;
}

export default function RestaurantCard() {

    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

    function fetchRestaurants() {
        axios.get("api/restaurant")
            .then((response) => {
                setRestaurants(response.data);
            })
            .catch((error) => console.error("Error fetching restaurants:", error));
    }

    useEffect(fetchRestaurants, []);

    if(!restaurants) {
        return "Loading...";
    }


    return (
        <>
            <div className={"page"}>
                <h1>Restaurants</h1>
                <div className={"restaurant-list"}>
                    {restaurants.map((restaurant) => (
                        <div key={restaurant.id} className={"restaurant-card"}>
                            <h2>{restaurant.name}</h2>
                            <p>{restaurant.city}</p>
                            <p>{restaurant.category}</p>
                            <p>{restaurant.description}</p>
                        </div>
                    ))}
                </div>

            </div>
        </>
    );
}