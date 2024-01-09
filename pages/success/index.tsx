import Navbar from '@/components/Navbar';
import Link from 'next/link';


export default function Success() {

  return (
    <div>
      <Navbar/>
        <h2 className="text-gray-700 font-bold text-4xl self-center ml-10 mt-10">Оголошення успішно створене</h2>
        <div>
            <Link href="/">
            <button className="bg-blue-900 text-white right-0 rounded-md m-16 w-44 h-14 px-4 py-2 hover:bg-blue-600">Повернутися до мапи</button>
            </Link>
            <Link href="/posts">
            <button className="bg-blue-900 text-white right-0 rounded-md m-16 w-44 h-14 px-4 py-2 hover:bg-blue-600">Перейти до всіх оголешень</button>
            </Link>
        </div>


    </div>
  )
}