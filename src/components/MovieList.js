import React from 'react';
import defaultPoster from '../posterNotAvailable.png';



const MovieList = (props) => {
	console.log(props.movies)
	const FavouriteComponent = props.favouriteComponent;

	return (
		<>
			{props.movies.map((movie, index) => (
				<div className='image-container d-flex justify-content-start m-3' key={index} onClick={() => props.viewDetail(movie.imdbID)}>
					{ movie.Poster.length > 4 ?
						<img src={movie.Poster} alt='movie' /> : 
						<img src={defaultPoster} alt='movie' />
					}
					<div
						onClick={() => props.handleFavouritesClick(movie)}
						className='overlay d-flex align-items-center justify-content-center'
					>
						<FavouriteComponent />
					</div>
				</div>
			))}
		</>
	);
};

export default MovieList;
