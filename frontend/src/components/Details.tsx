import { Restaurant } from "./model/Restaurant";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function Details() {
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const { id } = useParams<{ id: string }>();

    const fetchRestaurantDetails = () => {
        if (!id) return; // Ensure we don't make a call without an ID
        axios
            .get(`/api/restaurant/${id}`)
            .then((response) => {
                setRestaurant(response.data);
            })
            .catch((error) => {
                console.error("Error fetching restaurant details", error);
            });
    };

    useEffect(() => {
        fetchRestaurantDetails();
    },[]);

    return (
        <>
            {restaurant ? (
                <>
                    <h1>{restaurant.name}</h1>
                    <p>{restaurant.description}</p>
                    <button>Edit</button>
                </>
            ) : (
                <p>No restaurant details available</p>
            )}
        </>
    );
}