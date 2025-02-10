import { Search, UserCircle, X } from "lucide-react"
import { useState } from "react";
import { Link } from "react-router-dom"

const Navbar = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const toggleSearch = () => {
        setIsSearchOpen((prev) => !prev);
    };

    return (
        <nav className="w-full p-4 bg-[#F5F5F5]">
            {
                !isSearchOpen ? (
                    <div className="flex items-center justify-between max-w-[1180px] mx-auto">
                        <div className="flex items-center gap-4">
                            <Link to={'/'}>
                                <img src="/logo.svg" alt="logo" />
                            </Link>

                            <div className="hidden relative w-80 md:w-96 bg-transparent border border-neutral-300 rounded-md sm:flex items-center">
                                <form onSubmit={handleSubmit} className="w-full">
                                    <Search
                                        size={18}
                                        className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                                    />
                                    <input
                                        type="text"
                                        className="w-full py-1 px-4 pl-8 pr-2 bg-transparent focus:outline-none text-black"
                                        placeholder="Search for movies"
                                    />
                                </form>
                            </div>
                        </div>

                        <Search className="sm:hidden cursor-pointer" onClick={toggleSearch} />

                        <div className="hidden sm:flex items-center gap-2">
                            <UserCircle size={25} className="text-gray-500" />
                            <span>Hi, Guest</span>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center w-full gap-2">
                        <form onSubmit={handleSubmit} className="w-full border border-neutral-300 rounded-md relative">
                            <Search
                                size={18}
                                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                            />
                            <input
                                type="text"
                                className="w-full py-1 px-4 pl-8 pr-2 bg-transparent focus:outline-none text-black"
                                placeholder="Search for movies"
                            />
                        </form>
                        <X
                            size={25}
                            className="text-gray-600 cursor-pointer"
                            onClick={toggleSearch}
                        />
                    </div>
                )
            }
        </nav>
    )
}

export default Navbar