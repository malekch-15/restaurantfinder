import {Restaurant} from "./model/Restaurant.ts";
import "./styles/RestaurantCard.css"

type RestaurantCardProps = {
    restaurant: Restaurant;
    onDeleteRestaurant?: (id: string) => void
    onToggleWishlist: (id: string) => void
    onDetails?:(id:string)=>void
}

function RestaurantCard(props: Readonly<RestaurantCardProps>) {

    return (
        <div className="restaurantCard">
            <h3>{props.restaurant.name}</h3>
            <h4>{props.restaurant.city}</h4>
            <h4>{props.restaurant.category}</h4>
            <button id="button-details"  onClick={() =>  props.onDetails?.(props.restaurant.id)}
                    disabled={!props. onDetails}>Details</button>
            <button>Edit</button>
            <button id="button-delete"  onClick={() =>  props.onDeleteRestaurant?.(props.restaurant.id)}
                    disabled={!props. onDeleteRestaurant}>Delete</button>
            <button id="" onClick={() => props.onToggleWishlist(props.restaurant.id)}
                    className={props.restaurant.status === "ON_WISHLIST" ? "red" : "black"}
                    >♥</button>
        </div>

    );
}

export default RestaurantCard;
