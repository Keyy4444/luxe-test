'use client'

import prisma from '../../lib/prisma'
import Link from "next/link";
import { useState, useRef, useEffect } from "react"
import dynamic from 'next/dynamic';
const Locate = dynamic(() => import("../../components/Locate.tsx"), { ssr: false });
import { LatLngLiteral } from 'leaflet'

interface Post {
    title: string;
    lat: number;
    lng: number;
    category: string;
    info: string;
    price: string;
    imagelink: string;
};

export default function AddPost() {
    const [showMap, setShowMap] = useState<boolean>(false);
    const [location, setLocation] = useState<LatLngLiteral>();
    const [missingPost, setMissingPost] = useState<boolean>(false); // Reminds the user to fill in all the required forms
    const [newPost, setNewPost] = useState<Post>({
        title: "",
        lat: 0,
        lng: 0,
        category: "",
        info: "",
        price: "",
        imagelink: "",
    })


    const modalRef = useRef<HTMLDivElement | null>(null);

    // Closing the modal when user clicks outside of it
    useEffect(() => {
        const handleOutsideClick = (event: any) => {
          if (modalRef.current && !modalRef.current.contains(event.target)) {
            setShowMap(false); 
          }
        };

        document.addEventListener('mousedown', handleOutsideClick);     

        return () => {
          document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);
      
    const recieveLocationFromChild = (coordFromChild: LatLngLiteral) => {
        setLocation(coordFromChild);
    }

    const toggleMap = (e: any) => {
        e.preventDefault()
        setShowMap(!showMap);
    }

    const confirmLocation = () => {
        setShowMap(!showMap);
        let latitude = location?.lat;
        let longitude = location?.lng;
        (latitude && longitude) && (
            setNewPost({
                ...newPost,
                lat: latitude,
                lng: longitude,
            })
        )
    }

    const onPostChange = (e: any) => {
        const { name, value } = e.target;
        setNewPost({
            ...newPost,
            [name]: value,
        });
    }

    const onSubmit = async (e: any) => {
        if (!newPost.title || !newPost.price || !newPost.category || !newPost.imagelink) {
            setMissingPost(true);   // Reminds the user to fill in all the required forms
            return;
        } 
        try {
            const response = await fetch('/api/posts/createPost', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPost),
              });
          

            } catch (error) {
              console.error('Error creating post:', error);
            }
        }


    return (
        <div className="font-sans text-xl">
            <div className="top-0 left-0 w-full h-full flex items-center justify-center z-20">
                <div className="w-1/2 p-10">
                    <div className="mx-auto max-w-screen-2xl px-2 sm:px-6 lg:px-8">                    
                        <h2 className="text-xl font-bold mb-4">Створити Оголошення</h2>
                        <div className="required relative w-2/3 mb-4">
                            <label className="block">Назва оголошення<span className="absolute w-1/4 top-0 text-red-500">*</span></label>
                            <input type="text" name="title" value={newPost.title} onChange={onPostChange} className="border border-gray-300 rounded-md w-full p-2 mb-2" />
                        </div>

                        <div className="mb-4 required relative">
                            <label className="block mb-1">Категорія<span className="absolute w-1/4 top-0 text-red-500">*</span></label>
                            <select name="category" value={newPost.category} onChange={onPostChange} className="border border-gray-300 rounded-md w-4/5 p-2">
                                <option disabled></option>
                                <option>Житло</option>
                                <option>Транспортний засіб</option>
                                <option>Техніка</option>
                            </select>
                        </div>

                        <form className="mb-4">
                            <label className="block mb-1">Інформація</label>
                            <textarea name="info" value={newPost.info} onChange={onPostChange} rows={4} className="border border-gray-300 rounded-md w-4/5 p-2 resize-none mb-2"></textarea>
                        </form>
                        

                        <form className="mb-4 required relative">
                            <label className="block mb-1">Додайте посилання на картинку<span className="absolute w-1/4 top-0 text-red-500">*</span></label>
                            <input name="imagelink" value={newPost.imagelink} onChange={onPostChange} className="border border-gray-300 rounded-md w-4/5 p-2 resize-none mb-2"></input>
                        </form>
                            
                        <form className="mb-4 required relative">
                            <label className="block mb-1">Вартість<span className="absolute w-1/4 top-0 text-red-500">*</span></label>
                            <input name="price" value={newPost.price} onChange={onPostChange} type="text" className="border border-gray-300 rounded-md w-4/5 p-2 mb-2" />
                        </form>

                        <div className="flex mb-4">
                            <form className="w-1/2 mr-2 flex-col justify-center">
                            <button type="button" onClick={toggleMap} className="bg-blue-900 text-white rounded-md h-14 w-2/5 flex items-center justify-center"><span><img className="h-8 w-auto" src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png     " alt="Your Company"/></span>Set Location</button>
                            </form>
                            {(newPost.title && newPost.price && newPost.category && newPost.imagelink) ? (
                            <Link href="/success">
                                <button type="submit" onClick={onSubmit} className="bg-blue-900 text-white right-0 rounded-md ml-16 w-44 h-14 px-4 py-2 hover:bg-blue-600">Submit</button>
                            </Link>
                            ) : (
                                <button type="submit" onClick={onSubmit} className="bg-blue-900 text-white right-0 rounded-md ml-16 w-44 h-14 px-4 py-2 hover:bg-blue-600">Submit</button>
                            )}
                            
                        </div>

                        {missingPost && (
                            <p className="text-red-500">Будь ласка, заповніть необхідні поля</p>
                        )}

                        
                    </div>
                </div>
            </div>
            {showMap && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-20">
                    <div ref={modalRef} className="bg-white w-3/4 h-3/4 p-8 rounded-lg ">
                        <div className="w-full h-2 max-h-full px-6 py-5 border-b border-gray-300 flex  items-center justify-between">
                            <div className="font-semibold  text-indigo-900">Мапа</div>
                        </div>
                        <Locate sendLocationToParent={recieveLocationFromChild}/>
                        <div className="flex justify-end pt-5 pr-10 font-semibold">
                            <button onClick={toggleMap} type="button" className="text-indigo-900 rounded-md h-14 w-1/5 ml-2 ">Cancel</button>
                            <button onClick={confirmLocation} className="bg-indigo-900 text-white rounded-md h-14 w-1/5 ml-2">Підтвердити</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}