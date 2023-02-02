import './movieCard.scss';

const MovieCard = ({movie, openModal}) => {

    const setModal = () => {
        openModal(movie)
    }

    return (
        <section>
            <li>
                <div className="movie_card" key={movie.id} onClick={setModal}>
                    <img className="movie_poster" 
                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : "https://bit.ly/3jlWjaH"} 
                    alt={movie.original_title}/>
                    <div className="movie_info">
                        <p className="movie_title">{movie.original_title}</p>
                    </div>
                </div>
            </li>
            <div>
                
            </div>
        </section>
)
}

export default MovieCard;