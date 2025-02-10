import { Dot, Star } from 'lucide-react'
import React from 'react'

const MovieDetialsTopMobileSkeleton = () => {
    return (
        <>
            <div className="block md:hidden space-y-3 animate-pulse">
                {/* Image Skeleton */}
                <div className="relative py-4 flex flex-col items-center">
                    <div className="w-[90%] h-48 bg-gray-300 rounded-lg"></div>
                    <div className="absolute bottom-0 w-[90%] bg-gray-400 h-6 rounded-b-lg"></div>
                </div>

                {/* Rating & Button Skeleton */}
                <div className="flex items-center justify-between gap-2 mb-4 bg-[#dfdfdf] py-2 px-3 rounded-lg w-[90%] mx-auto">
                    <div className="flex items-center gap-2">
                        <Star className="fill-gray-400 stroke-gray-400" size={20} />
                        <div className="h-5 w-12 bg-gray-400 rounded-md"></div>
                    </div>
                    <div className="h-7 w-20 bg-gray-400 rounded-md"></div>
                </div>

                {/* Languages Skeleton */}
                <div className="w-[90%] mx-auto flex gap-2">
                    <div className="h-6 w-16 bg-gray-400 rounded-md"></div>
                    <div className="h-6 w-16 bg-gray-400 rounded-md"></div>
                    <div className="h-6 w-16 bg-gray-400 rounded-md"></div>
                </div>

                {/* Genre & Date Skeleton */}
                <div className="flex items-center w-[90%] mx-auto">
                    <div className="h-5 w-28 bg-gray-400 rounded-md"></div>
                    <Dot className="mt-1 text-gray-400" />
                    <div className="h-5 w-16 bg-gray-400 rounded-md"></div>
                </div>

                {/* Overview Skeleton */}
                <div className="w-[90%] mx-auto pr-10 my-6 space-y-2">
                    <div className="h-4 w-full bg-gray-400 rounded-md"></div>
                    <div className="h-4 w-3/4 bg-gray-400 rounded-md"></div>
                </div>
            </div>

            {/* Fixed Book Button Skeleton */}
            <div className="fixed bottom-0 left-0 right-0 flex justify-center bg-gray-200 py-2 md:hidden">
                <div className="h-10 w-[90%] bg-gray-400 rounded-lg"></div>
            </div>
        </>
    )
}

export default MovieDetialsTopMobileSkeleton