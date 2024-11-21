import {Restaurant} from "./model/Restaurant.ts";
import RestaurantCard from "./RestaurantCard.tsx";

type WishlistProps = {
    restaurants: Restaurant [];
    onToggleWishlist: (id:string)=>void;


}

export default function Wishlist(props: Readonly<WishlistProps>){
    return(
        <div>
            <h2>Wishlist</h2>

            <h2>Restaurantfinder</h2>
            {props.restaurants.map((r) => <RestaurantCard key={r.id}
                                                          restaurant={r} onToggleWishlist={props.onToggleWishlist}
                                                          showDeleteButton={false} showDetailsButton={false} showEditButton={false}/>)}

        </div>
    )
}