import { Restaurant } from "./Restaurant.ts";
import "./RestaurantCard.css";

type RestaurantCardProps = {
    restaurant: Restaurant;
    onViewDetails: (id: string) => void;
    onDelete: (id: string) => void;
    onToggleWishlist: (id: string) => void;
};

export default function RestaurantCard({
                                           restaurant,
                                           onViewDetails,
                                           onDelete,
                                           onToggleWishlist,
                                       }: RestaurantCardProps) {

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this restaurant?")) {
            onDelete(id);
        }
    };

    return (
        <div key={restaurant.id} className="restaurant-card">
            <h2>{restaurant.name}</h2>
            <p>{restaurant.city}</p>
            <p>{restaurant.category}</p>
            <p>{restaurant.description}</p>

            <div className="restaurant-card-buttons">
                <button id="button-details" onClick={() => onViewDetails(restaurant.id)}>Details</button>
                <button id="button-delete" onClick={() => handleDelete(restaurant.id)}>Delete</button>
                <button id="button-wishlist" onClick={() => onToggleWishlist(restaurant.id)}>♥</button>
            </div>
        </div>
    );
}
