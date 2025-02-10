import { Star } from "lucide-react"

const MovieDetailsTopSkeleton = () => {
    return (
        <div className="relative h-[31rem] bg-black hidden md:block">
            <div className="absolute inset-0 opacity-30 bg-gray-300 animate-pulse" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/[3] to-transparent" />
            <div className="max-w-[1180px] mx-auto h-full flex items-center relative">
                <div className="flex gap-8 items-center">
                    <div className="relative rounded-lg w-96 h-96 bg-gray-300 animate-pulse" />
                    <div className="text-white pb-4 space-y-4 mb-6 w-full">
                        <div className="w-48 h-8 bg-gray-300 animate-pulse rounded-md" />
                        <div className="flex gap-2 mb-4 bg-[#333333] p-3 rounded-lg w-96">
                            <div className="flex items-center gap-2">
                                <Star className="fill-yellow-400 stroke-yellow-400" size={20} />
                                <div className="h-5 w-16 bg-gray-300 animate-pulse" />
                            </div>
                            <div className="w-20 h-8 bg-gray-300 animate-pulse rounded-md" />
                        </div>
                        <div className="h-6 w-48 bg-gray-300 animate-pulse rounded-md" />
                        <div className="h-6 w-32 bg-gray-300 animate-pulse rounded-md mt-2" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieDetailsTopSkeleton