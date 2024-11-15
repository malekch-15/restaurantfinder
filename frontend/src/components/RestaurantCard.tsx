import "./model/Restaurant.ts"
import {Restaurant} from "./model/Restaurant.ts";
import "./styles/RestaurantCard.css"

type Props = {
    restaurant: Restaurant;
}

function RestaurantCard(props: Props) {

    return (
        <div className="restaurantCard">
            <h3>{props.restaurant.name}</h3>
            <h4>{props.restaurant.description}</h4>
        </div>
    );
}

export default RestaurantCard;