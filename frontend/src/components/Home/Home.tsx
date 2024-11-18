import {Restaurant} from "../model/Restaurant";
import RestaurantCard from "../RestaurantCard.tsx";


type HomeProps = {
    restaurants: Restaurant [];
    onDeleteRestaurant?: (id: string) => void;
    onToggleWishlist: (id: string) => void;
}

export default function Home(props: Readonly<HomeProps>) {
    return (
        <div>
            <h2>Home2</h2>
            <h2>Restaurantfinder</h2>

            {props.restaurants.map((r) => <RestaurantCard key={r.id} restaurant={r}
                                                          onDeleteRestaurant={props.onDeleteRestaurant}
                                                          onToggleWishlist={props.onToggleWishlist}/>)}
        </div>
    )
}