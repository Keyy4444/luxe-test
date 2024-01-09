"use server"

import prisma from '../../lib/prisma'

type Post = {
    title: string;
    lat: number;
    lng: number;
    category: string;
    info: string;
    price: string;
    imagelink: string;
  }
  

export const createPost = async (newPost: Post) => {
    
    //Creates a new post in DB
    await prisma.posts.create({
        data: {
            title: newPost.title,
            lat: newPost.lat,
            lng:  newPost.lng,
            category: newPost.category,
            info: newPost.info,
            price: newPost.price,
            imagelink: newPost.imagelink,
        },
    })
}