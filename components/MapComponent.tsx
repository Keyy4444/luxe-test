'use client'

import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from "react-leaflet"
import { Icon, LatLngBounds } from 'leaflet'
import "leaflet/dist/leaflet.css"
import PostCard from '../components/PostCard'

type Post = {
    id: number;
    title: string;
    lat: number;
    lng: number;
    category: string;   
    info: string;
    price: string;
    imagelink: string;
};


export default function MapComponent({ posts }: { posts: Post[]}) {
    const [showSelectedMarker, setShowSelectedMarker] = useState<boolean>(false) // Whether to show all posts or selected marker post
    const [postById, setPostById] = useState<Post>()                             // Post of the selected marker
    const [bounds, setBounds] = useState<LatLngBounds>()                         // Bounds for updating the list of posts
    const [showInitialPosts, setShowInitialPosts] = useState<Boolean>(true)      // Shows the list of posts while user still hasn't moved or zoomed in

    // Custom Icon
    const markerIcon = new Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
        iconSize: [50, 50]
    })

    // Selects a single post to show on the list
    const clickMarker = (id: number) => {
        setShowSelectedMarker(true);
        setPostById(posts.find(post => post.id === id));
        console.log(id);
    }

    // Gets bounds to update the list of posts on move and zoom
    const HandleMapMove = () => {
        const map = useMap();
        
        const showBounds = () => {
            let newBounds = map.getBounds();
            setBounds(newBounds);
            setShowInitialPosts(false);
        };
        useMapEvent('load', showBounds);
        useMapEvent('move', showBounds);
        useMapEvent('zoom', showBounds);
        return null;
    } 


    // If user clicks on map after selecting marker then deselectMarker deselects this marker
    const DeselectMarker = () => {
        useMapEvent('click', () => setShowSelectedMarker(false))  
        return null;
    };



    return (
        <div className="flex h-screen place-content-center">
            <p>break</p>
            <ul>
                {posts.map((post: Post) => (
                <p>
                    {post.title}
                </p>
                ))}
            </ul>
            <MapContainer center={[48.407, 31.91]} zoom={6} className="w-5/6 z-0">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <HandleMapMove/>
                <DeselectMarker/>

                {posts.map((post: Post) => (
                    <Marker position={[post.lat, post.lng]} icon={markerIcon} key={post.id} eventHandlers={{click: () => clickMarker(post.id)}}>
                        <Popup>{ post.title }</Popup>
                    </Marker>
                ))}
            </MapContainer> 
            <div className="w-1/6 flex overflow-y-auto">
                {showSelectedMarker ? (
                    <div className="w-5/6 mx-auto">
                        {postById && (
                            <PostCard post={postById}/> 
                        )}
                    </div>
                    ) : (
                    <div className="w-full flex flex-col items-center">
                        <h2 className="text-xl font-semibold text-left mt-4">Оголошення</h2>
                        <div className="w-5/6 mx-auto">
                            <ul>
                                {posts.map((post: Post) => (            
                                    ((bounds?.contains([post.lat, post.lng]) || showInitialPosts) && (      
                                        <li key={post.id}><PostCard post={post}/></li>
                                    ))
                                ))}
                            </ul>
                        </div>
                    </div>
                )}               
            </div>
        </div>
    )
}
