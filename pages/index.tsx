import prisma from '@/lib/prisma';
import { Inter } from 'next/font/google'
import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import ReactDOM from 'react-dom/client'
const MapComponent = dynamic(() => import("../components/MapComponent"), { ssr: false });

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

const inter = Inter({ subsets: ['latin'] })

export const getStaticProps: GetStaticProps = async () => {
  const posts: Post[] = await prisma.posts.findMany();
  return {
    props: { posts },
  };
};

export default function Home({ posts }: { posts: Post[] }) {
  return (
    <div>
      <Navbar/>
      <ul>
        {posts.map((post: Post) => (
          <p>
            {post.title}
          </p>
        ))}
      </ul>
      <MapComponent posts={posts}/>
    </div>
  )
}
