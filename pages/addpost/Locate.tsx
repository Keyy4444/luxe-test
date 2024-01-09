'use client'

import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet"
import { Icon, LatLngLiteral } from 'leaflet'
import "leaflet/dist/leaflet.css"

interface ChildProps {
    sendLocationToParent: (dataToParent: LatLngLiteral) => void;
}

export default function Locate({ sendLocationToParent }: ChildProps) {
    const [location, setLocation] = useState<LatLngLiteral | null>(null);

    // Places a marker on the map
    const HandleMapClick = () => {
        const map = useMapEvents({
            click(e) {
                let coordinates = e.latlng;
                map.flyTo(e.latlng);
                setLocation(e.latlng);  
                sendLocationToParent(coordinates);   // Sends an array of coords to parent component for creating a new post
            }
        })
        return null;
    };

    const markerIcon = new Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
        iconSize: [50, 50]
    })


    return (
        <div className="h-4/6 pt-5">
            <MapContainer center={[48.407, 31.91]} zoom={6} className="h-full z-40 w-full">
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                <HandleMapClick/>

                {location && (
                <Marker position={location} icon={markerIcon}>
                    <Popup>You clicked here!</Popup>
                </Marker>
                )}
            </MapContainer>
        </div>
    )
}