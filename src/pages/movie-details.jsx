import axios from "axios";
import MovieDetailsTop from "../components/movie-details-top";
import MobileDetailsTopMobile from "../components/movie-details-top-mobile"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
    const [movieDetails, setMovieDetails] = useState({})
    const [movieCasts, setMovieCasts] = useState([])
    const [loading, setLoading] = useState(true);

    const { id } = useParams();
    const imgUrl = localStorage.getItem('imgUrl')

    const fetchMovieDetails = async () => {
        try {
            const response = await axios.get(`/movie/${id}`);
            console.log(response.data)
            setMovieDetails(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch movie details:", error);
            setLoading(false);
        }
    };

    const fetchMovieCasts = async () => {
        try {
            const response = await axios.get(`/movie/${id}/credits`);
            setMovieCasts(response.data.cast.slice(0, 5));
            console.log(response.data.cast.slice(0, 5))
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch movie details:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovieDetails();
        fetchMovieCasts()
    }, [id]);

    return (
        <div className="min-h-screen bg-gray-100 pb-12 md:pb-6">
            <MovieDetailsTop details={movieDetails} loading={loading} />
            <MobileDetailsTopMobile details={movieDetails} loading={loading} />

            <div className="max-w-[1180px] mx-auto pr-10 my-6 hidden md:block">
                <h2 className="text-2xl font-bold">About this movie</h2>
                <p>{movieDetails.overview}</p>
            </div>

            <hr className="max-w-[1180px] mx-auto" />

            <div className="max-w-[90%] md:max-w-[1180px] mx-auto my-6">
                <h2 className="text-2xl font-bold mb-4">Cast</h2>

                <div className="flex items-center gap-4 overflow-y-auto w-full">
                    {movieCasts.map(cast => {
                        return (
                            <img key={cast.id} src={imgUrl + cast.profile_path} alt="" className="w-28 h-28 rounded-full" />
                        )
                    })
                    }
                </div>

            </div>
        </div>
    );
};

export default MovieDetails;
