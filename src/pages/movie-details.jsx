import axios from "axios";
import MovieDetailsTop from "../components/movie-details-top";
import MobileDetailsTopMobile from "../components/movie-details-top-mobile";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
    const [movieDetails, setMovieDetails] = useState({});
    const [movieCasts, setMovieCasts] = useState([]);
    const [movieCrew, setMovieCrew] = useState([]);
    const [loading, setLoading] = useState(true);

    const { id } = useParams();
    const imgUrl = localStorage.getItem("imgUrl");

    const fetchMovieDetails = async () => {
        try {
            const response = await axios.get(`/movie/${id}`);
            console.log(response.data);
            setMovieDetails(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch movie details:", error);
            setLoading(false);
        }
    };

    const fetchMovieCastsAndCrew = async () => {
        try {
            const response = await axios.get(`/movie/${id}/credits`);

            const filteredCast = response.data.cast
                .filter((cast) => cast.profile_path)
                .slice(0, 5);

            const filteredCrew = response.data.crew
                .filter(
                    (crew) =>
                        ["Director", "Producer", "Animation"].includes(crew.job) &&
                        crew.profile_path
                )
                .slice(0, 5);

            setMovieCasts(filteredCast);
            setMovieCrew(filteredCrew);
        } catch (error) {
            console.error("Failed to fetch movie details:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovieDetails();
        fetchMovieCastsAndCrew();
    }, [id]);

    return (
        <div className="min-h-screen bg-gray-100 pb-12 md:pb-6">
            <MovieDetailsTop details={movieDetails} loading={loading} />
            <MobileDetailsTopMobile details={movieDetails} loading={loading} />

            <div className="max-w-[1180px] mx-auto pr-10 my-6 hidden md:block ms-4">
                <h2 className="text-2xl font-bold">About this movie</h2>
                <p>{movieDetails.overview}</p>
            </div>

            <hr className="max-w-[1180px] mx-auto" />

            <div className="max-w-[90%] md:max-w-[1180px] mx-auto my-6 ms-4">
                <h2 className="text-2xl font-bold mb-4">Cast</h2>

                <div className="overflow-x-auto no-scrollbar">
                    <div className="w-[30rem] md:w-full flex items-start gap-4">
                        {movieCasts.map((cast) => {
                            return (
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
                            );
                        })}
                    </div>
                </div>
            </div>

            <hr className="max-w-[1180px] mx-auto" />

            <div className="max-w-[90%] md:max-w-[1180px] mx-auto my-6 ms-4">
                <h2 className="text-2xl font-bold mb-4">Crew</h2>

                <div className="overflow-x-auto no-scrollbar">
                    <div className="w-[30rem] md:w-full flex items-start gap-4">
                        {movieCrew.map((crew) => {
                            return (
                                <div key={crew.id} className="flex flex-col items-center">
                                    <img
                                        src={imgUrl + crew.profile_path}
                                        alt=""
                                        className="w-20 md:w-28 h-20 md:h-28 rounded-full object-cover"
                                    />
                                    <p className="text-sm md:text-base text-center">{crew.name}</p>
                                    <p className="text-gray-500 text-sm">{crew.job}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
