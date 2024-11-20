import './App.css'
import axios from "axios";
import {useEffect, useState} from "react";
import {Restaurant} from "./components/model/Restaurant.ts";
import Home from "./components/Home/Home.tsx"
import {WishlistStatus} from "./components/model/WishlistStatus.ts";
import {Route, Routes, useNavigate} from "react-router-dom";
import Wishlist from "./components/Wishlist.tsx";
import Details from "./components/Details.tsx";
import AddRestaurant from "./components/AddRestaurant.tsx";




export default function App() {
    const navigate = useNavigate();


    const [restaurants, setRestaurants] = useState<Restaurant[]>([])

    const getAllRestaurants = () => {
        axios.get("/api/restaurant").then(
            (response) => {
                setRestaurants(response.data)
            }
        ).catch((error) => {
            console.error(error)
        })
    }
    useEffect(getAllRestaurants, [])

    // const handleSaveEdit = (restaurant: Restaurant) => {
    //
    // }

    const handleDeleteRestaurant = (id: string) => {
         axios.delete(`/api/restaurant/${id}`).then(
            () => {
                getAllRestaurants()

            }
        ).catch((error) => {
            console.error(error)
        })}
    const handleViewDetails = (id: string) => {
        navigate(`/details/${id}`);
    };
    // const handleWishlist = () => {
    //     navigate(`/wishlist`);
    // };

    const handleToggleWishlist = (id: string) => {
        const restaurant = restaurants.find(r => r.id === id);
        if (!restaurant) return;

        const updatedStatus: WishlistStatus = restaurant.status === "ON_WISHLIST" ? "NOT_ON_WISHLIST" : "ON_WISHLIST";
        const updatedRestaurant = { ...restaurant, status: updatedStatus };

        // axios
        //     .put(`/api/restaurant/${id}`, updatedRestaurant)
        //     .then((response) => {
        //         setRestaurants(restaurants.map(r => r.id === id ? response.data : r)
        //         );
        //     })
        //     .catch((error) => {
        //         console.error("Error updating restaurant", error);
        //     });

        axios
            .put(`/api/restaurant/${id}`, updatedRestaurant)
            .then((response) => {
                setRestaurants(prevRestaurants =>
                    prevRestaurants.map(r => r.id === id ? response.data : r)
                );
            })
            .catch((error) => {
                console.error("Error updating restaurant", error);
            });
    };

        return (
                <Routes>
                <Route path="/" element={<Home restaurants={restaurants}
                                               onDeleteRestaurant={handleDeleteRestaurant}
                                               onToggleWishlist={handleToggleWishlist}
                                               handleViewDetails={handleViewDetails}
                                               //handelWishlist={handleWishlist}
               />}
                                              />
                        <Route path="/wishlist" element={<Wishlist restaurants={restaurants.filter(r => r.status === "ON_WISHLIST")}
                                                                   onToggleWishlist={handleToggleWishlist}
                        />}/>
                    <Route path="/details/:id" element={<Details />} />
                    <Route path={"/add"} element={<AddRestaurant  setRestaurant={setRestaurants} />} />
                </Routes>

        );
    }
