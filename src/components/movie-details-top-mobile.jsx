import { Dot, Star } from "lucide-react";
import MovieDetialsTopMobileSkeleton from "./skeletons/movie-dtls-top-mob-skltn";

const MovieDetailsTopMobile = ({ details, loading }) => {
    const imgUrl = localStorage.getItem("imgUrl");

    if (loading) return <MovieDetialsTopMobileSkeleton />;

    return (
        <>
            <div className="block md:hidden space-y-3">
                <div className="relative py-4 flex flex-col items-center">
                    <img
                        src={`${imgUrl}${details.backdrop_path}`}
                        alt={details.title || "Movie Poster"}
                        className="w-[90%] rounded-lg"
                    />

                    <div className="absolute bottom-0 w-[90%] bg-black/80 backdrop-blur-lg text-white text-center py-2 rounded-b-lg">
                        {details.status === "Released"
                            ? "In Cinemas"
                            : `Releasing on ${details.release_date}`}
                    </div>
                </div>

                <div className="flex items-center justify-between gap-2 mb-4 bg-[#dfdfdf] py-2 px-3 rounded-lg w-[90%] mx-auto">
                    <div className="flex items-center gap-2">
                        <Star className="fill-yellow-600 stroke-yellow-600" size={20} />
                        <span className="text-xl">
                            {Number(details.vote_average).toFixed(1)}/10
                        </span>
                    </div>
                    <button className="bg-white border border-red-400 text-red-500 font-semibold py-1 px-2 rounded-md">
                        Rate Now
                    </button>
                </div>

                <div className="w-[90%] mx-auto">
                    {details.spoken_languages?.length > 0 ? (
                        details.spoken_languages.map((lang, idx) => (
                            <p
                                key={idx}
                                className="px-2 py-1 rounded-md bg-[#dfdfdf] inline-block text-black mr-2"
                            >
                                {lang.english_name}
                            </p>
                        ))
                    ) : (
                        <p>No languages available</p>
                    )}
                </div>

                <div className="flex items-center w-[90%] mx-auto">
                    <span className="text-sm">
                        {details.genres
                            ?.slice(0, 3)
                            .map((genre) => genre.name)
                            .join(", ") || "No genres available"}
                    </span>
                    <Dot className="mt-1" />
                    <span className="text-sm">{details.release_date}</span>
                </div>

                <div className="w-[90%] mx-auto pr-10 my-6 text-ellipsis line-clamp-2">
                    <p>{details.overview}</p>
                </div>
            </div>
            <div className="fixed bottom-0 left-0 right-0 flex justify-center bg-gray-200 py-2 md:hidden">
                <button className="bg-red-500 text-white py-2 px-6 w-full mx-4 rounded-lg font-semibold shadow-lg">
                    Book Tickets
                </button>
            </div>
        </>
    );
};

export default MovieDetailsTopMobile;
