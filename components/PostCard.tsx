import Link from "next/link";

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

export default function PostCard({ post }: { post: Post}) {
  return (
    <Link href={`/posts/${post.id}`}>    
        <div>
            <div className="w-full h-25 my-5 bg-slate-100 shadow-xl rounded-lg border-slate-900 border-2 overflow-hidden">
                <img className="w-full h-48 object-cover justify-center rounded-lg overflow-auto" src={post.imagelink} alt="Post Image"/>
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{post.title}</div>
                    <p className="text-gray-700 text-sm mb-2">{post.category}</p>
                    <p className="text-gray-700 text-base mb-2">{post.info}</p>
                    <p className="text-gray-700 font-bold text-base mb-2">{post.price} ₴</p>
                </div>
            </div>
        </div>
    </Link>
    )
}