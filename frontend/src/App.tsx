import './App.css'
import axios from "axios";
import {useEffect, useState} from "react";
import {Restaurant} from "./components/model/Restaurant.ts";
import Home from "./components/Home/Home.tsx"



export default function App() {

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

    return (
        <>
            <Home restaurants={restaurants}/>
        </>
    );
}