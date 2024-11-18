import {Restaurant} from "../model/Restaurant";
import RestaurantCard from "../RestaurantCard.tsx";


type Props = {
    restaurants: Restaurant [];
}

export default function Home(props: Props){
    return(
        <div>
            <h2>Home2</h2>
            <h2>Restaurantfinder</h2>
            {props.restaurants.map((r)=><RestaurantCard key={r.id} restaurant={r}/>)}
        </div>
    )
}