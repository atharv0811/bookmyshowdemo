const SliderSkeleton = () => {
    return (
        <div className="relative h-[25rem] w-full overflow-hidden">
            <div className="w-full h-full bg-gray-800 animate-pulse"></div>

            <div className="absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent"></div>

            <div className="container mx-auto">
                <div className="absolute bottom-0 max-w-md px-4 lg:ps-14 mb-6">
                    <div className="h-8 bg-gray-700 w-3/4 rounded-md animate-pulse"></div>
                    <div className="h-4 bg-gray-700 w-5/6 my-2 rounded-md animate-pulse"></div>
                    <div className="h-4 bg-gray-700 w-4/6 my-2 rounded-md animate-pulse"></div>

                    <div className="flex items-center gap-4 mt-2">
                        <div className="h-4 bg-gray-700 w-20 rounded-md animate-pulse"></div>
                        <span className="text-gray-600">|</span>
                        <div className="h-4 bg-gray-700 w-16 rounded-md animate-pulse"></div>
                    </div>

                    <div className="h-10 bg-gray-700 w-32 rounded-lg mt-4 animate-pulse"></div>
                </div>
            </div>
        </div>
    );
};

export default SliderSkeleton;
