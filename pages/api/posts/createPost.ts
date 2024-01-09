// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      const { title, lat, lng, category, info, price, imagelink } = req.body;
  
      try {
        await prisma.posts.create({
          data: {
            title,
            lat,
            lng,
            category,
            info,
            price,
            imagelink,
          },
        });
  
        res.status(201).json({ message: 'Post created successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Error creating post' });
      }
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  }
  