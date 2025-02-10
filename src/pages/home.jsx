import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Slider from "../components/slider";
import RecommendedMovies from "../components/recommende-movies";
import TopRatedMovies from "../components/top-rated-movies";
import UpcomingMovies from "../components/upcoming-movies";

const Home = () => {
    const [moviesData, setMoviesData] = useState({
        bannerData: [],
        topRatedMovies: [],
        upcomingMovies: [],
    });

    const fetchMoviesData = useCallback(async () => {
        try {
            const [trending, config, topRated, upcoming] = await Promise.all([
                axios.get("/trending/movie/week"),
                axios.get("/configuration"),
                axios.get("/movie/top_rated"),
                axios.get("/movie/upcoming"),
            ]);

            const newMoviesData = {
                bannerData: trending.data.results,
                topRatedMovies: topRated.data.results,
                upcomingMovies: upcoming.data.results,
            };

            localStorage.setItem("imgUrl", config.data.images.secure_base_url + "original");

            setMoviesData(newMoviesData);
        } catch (error) {
            console.error("Error fetching movie data:", error);
        }
    }, []);

    useEffect(() => {
        fetchMoviesData();
    }, [fetchMoviesData]);

    return (
        <>
            <Slider data={moviesData.bannerData} />
            <section className="max-w-6xl mx-auto px-3 my-7">
                <h2 className="text-xl lg:text-2xl font-bold mb-6 text-black">
                    Recommended Movies
                </h2>
                <RecommendedMovies recommendedMovies={moviesData.bannerData} />
            </section>
            <section className="max-w-6xl mx-auto px-3 my-7">
                <h2 className="text-xl lg:text-2xl font-bold mb-6 text-black">
                    Top Rated Movies
                </h2>
                <TopRatedMovies topRatedMovies={moviesData.topRatedMovies} />
            </section>
            <section className="max-w-6xl mx-auto px-3 my-7">
                <h2 className="text-xl lg:text-2xl font-bold mb-6 text-black">
                    Upcoming Movies
                </h2>
                <UpcomingMovies upcomingMovies={moviesData.upcomingMovies} />
            </section>
        </>
    );
};

export default Home;
