import { Dot, Star } from "lucide-react";
import MovieDetailsTopSkeleton from "./skeletons/movie-details-top-skeleton";
import { Link } from "react-router-dom";

const MovieDetailsTop = ({ details, loading, id }) => {
    const imgUrl = localStorage.getItem("imgUrl");

    if (loading) return <MovieDetailsTopSkeleton />;

    return (
        <>
            <div className="hidden md:block relative h-[31rem] bg-black">
                <div
                    className="absolute inset-0 opacity-30 bg-cover bg-center"
                    style={{ backgroundImage: `url(${imgUrl + details.backdrop_path})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/[3] to-transparent" />

                <div className="max-w-[1180px] mx-auto h-full flex items-center relative ps-4 xl:ps-0">
                    <div className="flex gap-8 items-center">
                        <div className="relative rounded-lg">
                            <img
                                src={imgUrl + details.poster_path}
                                alt={details.title}
                                className="w-72 rounded-lg shadow-xl relative z-10"
                            />
                            <div className="absolute text-white bottom-0 backdrop-blur-3xl w-full bg-black py-1 text-center z-10 rounded-b-lg opacity-80">
                                {details.status === "Released"
                                    ? "In cinemas"
                                    : `Releasing on ${details.release_date}`}
                            </div>
                        </div>

                        <div className="text-white pb-4">
                            <div className="space-y-4 mb-6">
                                <h1 className="text-4xl font-bold">{details.title}</h1>
                                <div className="flex items-center justify-between gap-2 mb-4 bg-[#333333] p-3 rounded-lg w-96">
                                    <div className="flex items-center gap-2">
                                        <Star
                                            className="fill-yellow-400 stroke-yellow-400"
                                            size={20}
                                        />
                                        <span className="text-xl">
                                            {Number(details.vote_average).toFixed(1)}/10
                                        </span>
                                    </div>
                                    <button className="bg-white text-black font-semibold py-2 px-3 rounded-md">
                                        Rate Now
                                    </button>
                                </div>

                                {details.spoken_languages?.length > 0 ? (
                                    details.spoken_languages.map((lang, idx) => (
                                        <p
                                            key={idx}
                                            className="px-2 py-1 rounded-md bg-white inline-block text-black mr-2"
                                        >
                                            {lang.english_name}
                                        </p>
                                    ))
                                ) : (
                                    <p>No languages available</p>
                                )}

                                <div className="flex items-center">
                                    <span>
                                        {details.genres?.map((genre) => genre.name).join(", ") ||
                                            "No genres available"}
                                    </span>
                                    <Dot className="mt-1" />
                                    <span>{details.release_date}</span>
                                </div>
                            </div>

                            <Link to={'seat-selection'}>
                                <button className="py-3 px-16 font-semibold bg-[#F84464] rounded-lg">
                                    Book tickets
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MovieDetailsTop;
