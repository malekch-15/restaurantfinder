import {useNavigate, useParams} from "react-router-dom";
import {Restaurant} from "./Restaurant.ts";
import {useEffect, useState} from "react";
import axios from "axios";

export default function MapBox() {

    const {id} = useParams<{id: string}>();
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);


    useEffect(() => {
        axios
            .get(`/api/restaurant/${id}`)
            .then((response) => setRestaurant(response.data))
            .catch((error) => console.error("Error fetching restaurant details:", error));
    }, [id]);

    if (!restaurant) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>MapBox</h2>
            <p> City: {restaurant.city}</p>
        </div>
    );
}