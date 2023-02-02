import Star from "../../assets/star.png"
import './modal.scss';

const Modal = ({modalMovie, showModal, closeModal}) => {

    return(
        <div className={`${showModal ? 'modal__show' :''} modal`}>
            <div className={`${showModal ? 'visible ' : ''}popup`}>
                <img className="popup__poster" 
                    src={modalMovie.poster_path ? `https://image.tmdb.org/t/p/w500/${modalMovie.poster_path}` : "https://bit.ly/3jlWjaH"} 
                    alt={modalMovie.original_title}/>
                <div className="popup__details">
                    <p className="popup__title">{modalMovie.original_title}</p>
                    <p>{modalMovie.overview}</p>
                    <p>RELEASED: {new Date(modalMovie.release_date).toLocaleDateString()}</p>
                    <div className="popup__bottom">
                        <div className="popup__rating">
                            <img className="popup__star" src={Star} alt="star"/>
                            <p>{modalMovie.vote_average}</p>
                        </div>
                        <button className="popup__close" onClick={() => {closeModal()}}>Close</button>
                    </div>
                </div>
            </div>
        </div>   
    )
}

export default Modal;