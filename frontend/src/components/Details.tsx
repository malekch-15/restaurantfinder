import { Restaurant } from "./model/Restaurant";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type detailsEditProps = {
    handleSaveEdit: (id:string, editData:Restaurant) => void;

}

export default function Details(props: Readonly<detailsEditProps>) {
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [editingRestaurantId, setEditingRestaurantId] = useState<string | null>(null);
    const [editData, setEditData] = useState<Restaurant>({
        id: "",
        name: "",
        city: "",
        category: "",
        description: "",
        status: "NOT_ON_WISHLIST",
    });

    const { id } = useParams<{ id: string }>();

    const fetchRestaurantDetails = () => {
        if (!id) return;
        axios
            .get(`/api/restaurant/${id}`)
            .then((response) => setRestaurant(response.data))
            .catch((error) => console.error("Error fetching restaurant details", error));
    };

    useEffect(() => {
        fetchRestaurantDetails();
    }, [id]);

    const handleEditToggle = () => {
        if (restaurant) {
            setEditingRestaurantId(restaurant.id);
            setEditData({
                id: restaurant.id,
                name: restaurant.name,
                city: restaurant.city,
                category: restaurant.category,
                description: restaurant.description,
                status: restaurant.status,
            });
        }
    };


    const handleEditChange = (field: string, value: string) => {
        setEditData((prevData) => ({ ...prevData, [field]: value }));
    };

    const handleCancelEdit = () => setEditingRestaurantId(null);

    return (
        <>
            {restaurant ? (
                editingRestaurantId === restaurant.id ? (
                    <div>
                        <h1>Edit Restaurant</h1>
                        <form>
                            <label>
                                Name: <input type="text" value={editData.name}
                                             onChange={(e) => handleEditChange("name", e.target.value)}/>
                            </label>
                            <label>
                                City: <input type="text" value={editData.city}
                                             onChange={(e) => handleEditChange("city", e.target.value)}/>
                            </label>
                            <label>
                                Category: <input type="text" value={editData.category}
                                                 onChange={(e) => handleEditChange("category", e.target.value)}/>
                            </label>
                            <label>
                                Description: <textarea
                                value={editData.description}
                                onChange={(e) => handleEditChange("description", e.target.value)}
                                rows={5}
                                cols={40}
                            />
                            </label>
                            <button type="button" onClick={()=>props.handleSaveEdit(restaurant.id, editData)}>Save</button>
                            <button type="button" onClick={handleCancelEdit}>Cancel</button>
                        </form>
                    </div>
                ) : (
                    <div>
                        <h1>{restaurant.name}</h1>
                        <p>{restaurant.description}</p>
                        <button onClick={handleEditToggle}>Edit</button>
                    </div>
                )
            ) : (
                <p>No restaurant details available</p>
            )}
        </>
    );
}
