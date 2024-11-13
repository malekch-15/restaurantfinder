import { useNavigate, useParams } from "react-router-dom";
import { Restaurant } from "../Restaurant.ts";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export default function MapBox() {
    const { id } = useParams<{ id: string }>();
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [coordinates, setCoordinates] = useState<{ lon: number; lat: number } | null>(null);
    const navigate = useNavigate();

    // Refs für die Karte und den Marker mit expliziten Typen
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const marker = useRef<mapboxgl.Marker | null>(null);

    // Axios Request, um Restaurantdaten und Geocoding-Informationen zu holen
    useEffect(() => {
        axios
            .get(`/api/restaurant/${id}`)
            .then((response) => {
                setRestaurant(response.data);

                // Adresse für die Geocoding-Abfrage zusammenstellen
                const address = `${response.data.street}, ${response.data.city}, ${response.data.zipcode}, ${response.data.country}`;

                return axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json`, {
                    params: {
                        access_token: mapboxgl.accessToken,
                    },
                });
            })
            .then((geoResponse) => {
                console.log("Geocoding response features:", geoResponse.data.features);
                if (geoResponse.data.features && geoResponse.data.features.length > 0) {
                    const place = geoResponse.data.features.find((feature) =>
                        feature.place_type.includes("address") || feature.place_type.includes("place")
                    );

                    if (place) {
                        const [lon, lat] = place.center;
                        console.log("Geocoded coordinates:", lon, lat);  // Logge die Koordinaten hier
                        setCoordinates({ lon, lat });
                    } else {
                        console.warn("No suitable location found for the given address.");
                    }
                } else {
                    console.warn("No features returned for the given query.");
                }
            })
            .catch((error) => console.error("Fehler beim Laden der Restaurantdaten oder Koordinaten:", error));
    }, [id]);

    useEffect(() => {
        // Warte auf die Koordinaten, bevor du die Karte initialisierst
        if (!coordinates || map.current) return;

        console.log("Initializing map with coordinates:", coordinates);

        // Karte initialisieren
        map.current = new mapboxgl.Map({
            container: mapContainer.current!, // Container-Ref für die Karte
            style: "mapbox://styles/mapbox/streets-v11", // Kartenstil
            center: [coordinates.lon, coordinates.lat], // Anfangszentrum
            zoom: 14, // Startzoom-Level
        });

        // Marker erstellen und initial setzen
        marker.current = new mapboxgl.Marker()
            .setLngLat([coordinates.lon, coordinates.lat])
            .addTo(map.current); // Der Marker wird an die Karte hinzugefügt

        // Karte zentrieren auf die Markerposition
        map.current.on("load", () => {
            if (coordinates) {
                map.current!.setCenter([coordinates.lon, coordinates.lat]);
            }
        });

    }, [coordinates]); // Dieser useEffect wird ausgeführt, wenn sich die Koordinaten ändern

    useEffect(() => {
        // Wenn der Marker existiert, aktualisiere ihn bei einer Änderung der Koordinaten
        if (marker.current && coordinates) {
            console.log("Updating marker position to:", coordinates);
            // Markerposition aktualisieren - stelle sicher, dass das Array übergeben wird
            marker.current.setLngLat([coordinates.lon, coordinates.lat]); // Markerposition aktualisieren
            map.current!.setCenter([coordinates.lon, coordinates.lat]); // Karte zentrieren
        }
    }, [coordinates]); // Dieser useEffect wird ausgeführt, wenn sich die Koordinaten ändern

    if (!restaurant) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>MapBox</h2>
            <p>Stadt: {restaurant.city}</p>
            <div ref={mapContainer} id="map" style={{ width: "80%", height: "300px" }}></div>
        </div>
    );
}
