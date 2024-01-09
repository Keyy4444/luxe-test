import prisma from '../../lib/prisma'
import { GetServerSideProps } from "next"

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

export default function PostPage({ posts }: { posts: Post[] }, { params }: { params: {postId: string}}) {

    const id = parseInt(params.postId)
  const post = posts.find(post => post.id === id)

  return (
    <div>
        <div className="flex w-3/5 h-3/5 justify-left items-center border-2 border-stone-400 rounded-lg p-2 mx-10 mt-10">
            <div>
                <img src={post?.imagelink} alt="Post Image" id="postImage" className="w-full h-96 object-cover justify-center rounded-lg overflow-auto"/>
            </div>
            <div className="justify-between w-2/5 ml-10">
                <div className="font-bold text-5xl py-10"><span id="postLocation">{post?.title}</span></div>
                <div className="font-bold text-xl mb-2"><strong></strong> <span id="postPrice">{post?.price} ₴</span></div>
            </div>
        </div>
        <div className="w-5/5 h-3/5 justify-left items-center border-2  rounded-lg p-2 mx-10">
            <div className="text-xl mb-2"><strong>Категорія:</strong> <span id="postCategory">{post?.category}</span></div>
            <div className="text-xl mb-2"><strong>Інформація:</strong><p>{post?.info}</p> <br></br><span id="postInfo">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet suscipit, veritatis voluptatibus et aliquid officiis, maxime numquam rerum ipsa non sit? Quibusdam vitae iure aliquid numquam velit quo assumenda ipsa? </span></div>
        </div>
    </div>
    )
}   