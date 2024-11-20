import {Restaurant} from "../model/Restaurant";
import RestaurantCard from "../RestaurantCard.tsx";
import {useState} from "react";
import SearchBar from "./SearchBar.tsx";
import {Link} from "react-router-dom";



type HomeProps = {
    restaurants: Restaurant [];
    onDeleteRestaurant?: (id: string) => void;
    onToggleWishlist: (id: string) => void;
    handleViewDetails: (id: string) => void;
    handelWishlist?:()=>void;
}

export default function Home(props: Readonly<HomeProps>) {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (query: string) => {
        setSearchQuery(query.toLowerCase());
    };

    const filteredRestaurants = props.restaurants.filter(
        (r) =>
            r.name.toLowerCase().includes(searchQuery) ||
            r.city.toLowerCase().includes(searchQuery) ||
            r.category.toLowerCase().includes(searchQuery)
    );


    return (
        <div>
            <h2>Home2</h2>
            <h2>Restaurantfinder</h2>
          {/*<button onClick={props.handelWishlist}>Wishlist</button>*/}
            <Link to={"/wishlist"}>wishlist</Link>
            <SearchBar onSearch={handleSearch}/>
            {filteredRestaurants.map((r) => (
                <RestaurantCard
                    key={r.id}
                    restaurant={r}
                    onDeleteRestaurant={props.onDeleteRestaurant}
                    onToggleWishlist={props.onToggleWishlist}
                    onDetails={props.handleViewDetails}
                    showEditButton={true}
                    showDetailsButton={true}
                    showDeleteButton={true}

                />
            ))}

        </div>
    )
}