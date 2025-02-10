import CardSlider from "./card-slider";
import CardSkeleton from "./skeletons/card-skeleton";

const RecommendedMovies = ({ recommendedMovies }) => {
    if (!recommendedMovies || recommendedMovies.length === 0) return <CardSkeleton />;

    return (
        <div className="relative w-full h-[220px] md:h-[300px]">
            <CardSlider data={recommendedMovies} />
        </div>
    );
};

export default RecommendedMovies;
