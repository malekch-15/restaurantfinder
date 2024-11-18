
import {Restaurant} from "./model/Restaurant.ts";
import "./styles/RestaurantCard.css"

type RestaurantCardProps = {
    restaurant: Restaurant;
    onDeleteRestaurant: (id:string)=>void
}

function RestaurantCard(props: Readonly<RestaurantCardProps>) {

    return (
         <div className="restaurantCard">
            <h3>{props.restaurant.name}</h3>
            <h4>{props.restaurant.city}</h4>
            <h4>{props.restaurant.category}</h4>
            <button id="button-delete" onClick={() => props.onDeleteRestaurant(props.restaurant.id)}>Delete</button>

         </div>

    );
}

export default RestaurantCard;