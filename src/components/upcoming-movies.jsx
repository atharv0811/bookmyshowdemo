import React from 'react'
import CardSlider from './card-slider'
import CardSkeleton from './skeletons/card-skeleton';

const UpcomingMovies = ({ upcomingMovies }) => {
    if (!upcomingMovies || upcomingMovies.length === 0) return <CardSkeleton />;

    return (
        <div className="relative w-full h-[220px] md:h-[300px]">
            <CardSlider data={upcomingMovies} />
        </div>
    )
}

export default UpcomingMovies