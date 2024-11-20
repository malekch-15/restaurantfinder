import { Restaurant } from "../model/Restaurant";
import RestaurantCard from "../RestaurantCard.tsx";
import SearchBar from "./SearchBar.tsx";
import { useEffect, useState } from "react";
import "./Home.css";
import {Link} from "react-router-dom";



type HomeProps = {
    restaurants: Restaurant[];
    onDeleteRestaurant?: (id: string) => void;
    onToggleWishlist: (id: string) => void;
    handleViewDetails: (id: string) => void;

};

export default function Home(props: Readonly<HomeProps>) {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState<"name" | "category" | "city">("name");
    const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(props.restaurants);

    const handleSearch = (query: string) => {
        setSearchQuery(query.toLowerCase());
    };

    useEffect(() => {
        const filtered:Restaurant[] = props.restaurants.filter((restaurant) => {
            const searchLower:string = searchQuery.toLowerCase();
            switch (filterType) {
                case "name":
                    return restaurant.name.toLowerCase().includes(searchLower);
                case "city":
                    return restaurant.city.toLowerCase().includes(searchLower);
                case "category":
                    return restaurant.category.toLowerCase().includes(searchLower);
                default:
                    return true;
            }
        });
        setFilteredRestaurants(filtered);
    }, [searchQuery, filterType, props.restaurants]);


    return (
        <div>
            <h2>Restaurant Finder</h2>
            <SearchBar onSearch={handleSearch} />
            <div>
                <button
                    onClick={() => setFilterType("name")}
                    className={filterType === "name" ? "active" : ""}
                >Name</button>
                <button
                    onClick={() => setFilterType("city")}
                    className={filterType === "city" ? "active" : ""}
                >City</button>
                <button
                    onClick={() => setFilterType("category")}
                    className={filterType === "category" ? "active" : ""}
                >Category</button>
            </div>

          {/*<button onClick={props.handelWishlist}>Wishlist</button>*/}
            <Link to={"/wishlist"}>wishlist</Link>

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
    );
}
