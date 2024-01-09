import Link from "next/link";

export default function Navbar() {

    return (
        <header>
            <nav className="bg-gray-800 h-16">
                <div className="mx-auto max-w-screen-2xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-20 items-center justify-between">
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex flex-shrink-0 items-center">
                                <Link href="/"><img className="h-12 w-auto texr mb-2 mr-5" src="https://cdn-icons-png.flaticon.com/512/72/72191.png" alt="Your Company"/></Link>
                            </div>
                            <div className="hidden align-middle sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    <Link href="/">
                                        <button className="bg-gray-900 text-white  rounded-md px-3 py-2 text-sm font-medium" aria-current="page">
                                            Home
                                        </button>
                                    </Link>
                                    <Link href="/posts">
                                        <button className="bg-gray-900 text-white  rounded-md px-3 py-2 text-sm font-medium" aria-current="page">
                                            All posts
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="relative inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 mb-4">
                            <Link href="/addpost">                            
                                <button type="button" className="relative h-12 w-52 rounded-full bg-yellow-300 p-1 text-neutral-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                Додати Оголошення
                                </button>
                            </Link>
                        </div>    
                    </div>
                </div>
            </nav>
        </header>

    )
}