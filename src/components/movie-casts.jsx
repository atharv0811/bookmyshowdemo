const MovieCasts = ({ movieCasts, loading }) => {
    const imgUrl = localStorage.getItem("imgUrl");

    return (
        <div className="max-w-[90%] md:max-w-[1180px] mx-auto my-6 ms-4">
            <h2 className="text-2xl font-bold mb-4">Cast</h2>

            {loading ? (
                <div className="overflow-x-auto no-scrollbar">
                    <div className="w-[30rem] md:w-full flex items-start gap-4">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <div className="w-20 md:w-28 h-20 md:h-28 bg-gray-300 rounded-full animate-pulse"></div>
                                <div className="h-4 w-16 bg-gray-300 rounded mt-2 animate-pulse"></div>
                                <div className="h-3 w-12 bg-gray-200 rounded mt-1 animate-pulse"></div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : movieCasts.length > 0 ? (
                <div className="overflow-x-auto no-scrollbar">
                    <div className="w-[30rem] md:w-full flex items-start gap-4">
                        {movieCasts.map((cast) => (
                            <div key={cast.id} className="flex flex-col items-center">
                                <img
                                    src={imgUrl + cast.profile_path}
                                    alt=""
                                    className="w-20 md:w-28 h-20 md:h-28 rounded-full object-cover"
                                />
                                <p className="text-sm md:text-base text-center">{cast.name}</p>
                                <p className="text-gray-500 text-sm">
                                    {cast.known_for_department === "Acting" && "Actor"}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p className="text-gray-500">No cast information available.</p>
            )}
        </div>
    );
};

export default MovieCasts;
