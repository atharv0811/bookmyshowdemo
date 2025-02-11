import axios from "axios";
import MovieDetailsTop from "../components/movie-details-top";
import MobileDetailsTopMobile from "../components/movie-details-top-mobile";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCasts from "../components/movie-casts";
import MovieCrew from "../components/movie-crew";

const MovieDetails = () => {
    const [movieDetails, setMovieDetails] = useState(null);
    const [movieCasts, setMovieCasts] = useState([]);
    const [movieCrew, setMovieCrew] = useState([]);
    const [loading, setLoading] = useState(true);

    const { id } = useParams();

    const fetchMovieData = useCallback(async () => {
        setLoading(true);
        try {
            const [detailsResponse, creditsResponse] = await Promise.all([
                axios.get(`/movie/${id}`),
                axios.get(`/movie/${id}/credits`),
            ]);

            setMovieDetails(detailsResponse.data);

            setMovieCasts(
                creditsResponse.data.cast
                    .filter((cast) => cast.profile_path)
                    .slice(0, 5)
            );

            setMovieCrew(
                creditsResponse.data.crew
                    .filter(
                        (crew) =>
                            ["Director", "Producer", "Animation"].includes(crew.job) &&
                            crew.profile_path
                    )
                    .slice(0, 5)
            );
        } catch (error) {
            console.error("Failed to fetch movie details:", error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchMovieData();
    }, [fetchMovieData]);

    return (
        <div className="min-h-screen bg-gray-100 pb-12 md:pb-6">
            <MovieDetailsTop details={movieDetails} loading={loading} id={id} />
            <MobileDetailsTopMobile details={movieDetails} loading={loading} />

            <div className="max-w-[1180px] mx-auto pr-10 my-6 hidden md:block ms-4">
                <h2 className="text-2xl font-bold">About this movie</h2>
                {loading ? (
                    <div className="h-6 bg-gray-300 rounded w-full animate-pulse"></div>
                ) : (
                    <p>{movieDetails?.overview}</p>
                )}
            </div>

            <hr className="max-w-[1180px] mx-auto" />

            <MovieCasts movieCasts={movieCasts} loading={loading} />

            {movieCasts.length > 0 && <hr className="max-w-[1180px] mx-auto" />}

            <MovieCrew movieCrew={movieCrew} loading={loading} />
        </div>
    );
};

export default MovieDetails;
