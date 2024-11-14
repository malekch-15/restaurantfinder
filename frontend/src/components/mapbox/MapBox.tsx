import { useParams } from "react-router-dom";
import { Restaurant } from "../Restaurant.ts";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

// Interface für die Struktur des Features in der Mapbox-Antwort definieren
interface MapboxFeature {
    place_type: string[];
    center: [number, number]; // [longitude, latitude]
    // Weitere Eigenschaften können hinzugefügt werden, falls nötig
}

export default function MapBox() {
    const { id } = useParams<{ id: string }>();
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [coordinates, setCoordinates] = useState<{ lon: number; lat: number } | null>(null);

    const mapContainer = useRef<HTMLDivElement | null>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const marker = useRef<mapboxgl.Marker | null>(null);

    useEffect(() => {
        axios
            .get(`/api/restaurant/${id}`)
            .then((response) => {
                setRestaurant(response.data);
                const address = `${response.data.street}, ${response.data.city}, ${response.data.zipcode}, ${response.data.country}`;

                return axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json`, {
                    params: {
                        access_token: mapboxgl.accessToken,
                    },
                });
            })
            .then((geoResponse) => {
                console.log("Geocoding-Antwort-Features:", geoResponse.data.features);
                if (geoResponse.data.features && geoResponse.data.features.length > 0) {
                    const place = geoResponse.data.features.find((feature: MapboxFeature) =>
                        feature.place_type.includes("address") || feature.place_type.includes("place")
                    );

                    if (place) {
                        const [lon, lat] = place.center;
                        console.log("Geocodierte Koordinaten:", lon, lat);
                        setCoordinates({ lon, lat });
                    } else {
                        console.warn("Keine geeignete Position für die angegebene Adresse gefunden.");
                    }
                } else {
                    console.warn("Keine Features für die angegebene Abfrage zurückgegeben.");
                }
            })
            .catch((error) => console.error("Fehler beim Laden der Restaurantdaten oder Koordinaten:", error));
    }, [id]);

    useEffect(() => {
        if (!coordinates || map.current) return;

        console.log("Karte mit Koordinaten initialisieren:", coordinates);

        map.current = new mapboxgl.Map({
            container: mapContainer.current!,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [coordinates.lon, coordinates.lat],
            zoom: 14,
        });

        marker.current = new mapboxgl.Marker()
            .setLngLat([coordinates.lon, coordinates.lat])
            .addTo(map.current);

        map.current.on("load", () => {
            if (coordinates) {
                map.current!.setCenter([coordinates.lon, coordinates.lat]);
            }
        });
    }, [coordinates]);

    useEffect(() => {
        if (marker.current && coordinates) {
            console.log("Aktualisiere die Marker-Position auf:", coordinates);

            marker.current.setLngLat([coordinates.lon, coordinates.lat]);
            map.current!.setCenter([coordinates.lon, coordinates.lat]);
        }
    }, [coordinates]);

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
