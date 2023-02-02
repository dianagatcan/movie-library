import { useEffect, useState } from 'react';
import './container.scss';

import Navbar from '../Navbar/navbar';
import Modal from '../Modal/modal';
import MovieCard from '../MovieCard/movieCard';

const Container = () => {

    const [movies, setMovies] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState()
    const [category, setCategory] = useState("top_rated")
    const [modalMovie, setModalMovie] = useState({})

    const [showModal, setShowModal] = useState(false)

    const openModal = (movie) => {
        setModalMovie(movie)
        setShowModal(true)
        document.body.classList.add('disable_scroll')
    }

    const closeModal = () => {
        setShowModal(false)
        document.body.classList.remove('disable_scroll')
    }


    const URL = 'https://api.themoviedb.org/3'
    const SEARCH = (page, category) => URL + `/movie/${category}?` + API_KEY + `&language=en&page=${page}`;

    const searchURL = (page) => URL + '/search/movie?' + API_KEY + `&language=en&page=${page}`;



    function getMovies(url){
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        };
        
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                console.log()
                setMovies(data.results)
                setTotalPages(data.total_pages)
            })
            .catch(err => console.error(err));
    }


    useEffect(() => {
        getMovies(SEARCH(currentPage, category))
    },[currentPage, category]) 

    const sendToSearch = (search) => {
        if(search) {
          try{
            getMovies(searchURL(currentPage) + '&query=' + search)
        } catch(error){
            console.error(error)
        }
        }
    }

    const nextPage = () => {
        if(currentPage < totalPages){
            setCurrentPage(currentPage + 1)
        }
    }

    const prevPage = () => {
        if(currentPage > 1){
            setCurrentPage(currentPage - 1)
            console.log(currentPage)
        }
    }


    return(
        <section>
            <Modal modalMovie={modalMovie} showModal={showModal} closeModal={closeModal} />
            <Navbar sendToSearch={sendToSearch}/>
            <section className={`${showModal ? 'main__modal' : ''} main`}>   
                <section className='button_section'>
                    <button className='button' onClick={() => setCategory("top_rated")}>Top rated</button>
                    <button className='button' onClick={() => setCategory("popular")}>Popular</button>
                    <button className='button' onClick={() => setCategory("now_playing")}>Now Playing</button>
                </section>
                <button onClick={() => prevPage()}>Prev</button>
                <button onClick={() => nextPage()}>Next</button>
                <ul>{movies.map((movie) => {    
                    return <MovieCard
                    key={movie.id}
                    movie={movie}
                    openModal={openModal}
                />
                })}
                </ul>
            </section>
        </section>
    )
}

export default Container;