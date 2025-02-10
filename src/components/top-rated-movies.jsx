import CardSlider from "./card-slider";
import CardSkeleton from "./skeletons/card-skeleton";

const TopRatedMovies = ({ topRatedMovies }) => {
    if (!topRatedMovies || topRatedMovies.length === 0) return <CardSkeleton />;

    return (
        <div className="relative w-full h-[220px] md:h-[300px]">
            <CardSlider data={topRatedMovies} />
        </div>
    )
}

export default TopRatedMovies