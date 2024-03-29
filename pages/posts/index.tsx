import prisma from '../../lib/prisma'
import PostCard from '../../components/PostCard'
import { GetServerSideProps } from 'next';
import Navbar from '@/components/Navbar';

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

export const getServerSideProps: GetServerSideProps = async () => {
  const posts: Post[] = await prisma.posts.findMany();
  return {
    props: { posts },
  };
};

export default function PostPage({ posts }: { posts: Post[] }) {


  return (
    <div>
      <Navbar/>
        <h2 className="text-gray-700 font-bold text-4xl self-center ml-10 mt-10">All Posts</h2>
        <div className="flex flex-wrap">
                {posts.map((post) => (
                    <div className="w-1/5 p-2" key={post.id}>
                        <PostCard post={post}/>
                    </div>
                ))}
        </div>
    </div>
  )
}