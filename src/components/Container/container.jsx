import { useEffect, useState } from 'react';
import './container.scss';

import { ArrowCircleLeft, ArrowCircleRight } from 'kidogo/duo';

import Navbar from '../Navbar/navbar';
import Modal from '../Modal/modal';
import MovieCard from '../MovieCard/movieCard';

const Container = () => {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [category, setCategory] = useState('top_rated');
    const [modalMovie, setModalMovie] = useState({});
    const [showModal, setShowModal] = useState(false);

    const URL = 'https://api.themoviedb.org/3';
    const SEARCH = (page, category) =>
        URL + `/movie/${category}?` + API_KEY + `&language=en&page=${page}`;
    const searchURL = (page) =>
        URL + '/search/movie?' + API_KEY + `&language=en&page=${page}`;

    function getMovies(url) {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
        };

        fetch(url, options)
            .then((response) => response.json())
            .then((data) => {
                console.log();
                setMovies(data.results);
                setTotalPages(data.total_pages);
            })
            .catch((err) => console.error(err));
    }

    useEffect(() => {
        getMovies(SEARCH(currentPage, category));
    }, [currentPage, category]);

    const sendToSearch = (search) => {
        if (search) {
            try {
                getMovies(searchURL(currentPage) + '&query=' + search);
            } catch (error) {
                console.error(error);
            }
        }
    };

    const openModal = (movie) => {
        setModalMovie(movie);
        setShowModal(true);
        document.body.classList.add('disable_scroll');
    };

    const closeModal = () => {
        setShowModal(false);
        document.body.classList.remove('disable_scroll');
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            console.log(currentPage);
        }
    };

    const changeCategory = (category) => {
        setCategory(category);
        setCurrentPage(1);
    };

    return (
        <section>
            <Modal
                modalMovie={modalMovie}
                showModal={showModal}
                closeModal={closeModal}
            />
            <Navbar sendToSearch={sendToSearch} />
            <section className={`${showModal ? 'main__modal' : ''} main`}>
                <section className="category_section">
                    <button
                        className="category"
                        onClick={() => changeCategory('top_rated')}
                    >
                        Top rated
                    </button>
                    <button
                        className="category"
                        onClick={() => changeCategory('popular')}
                    >
                        Popular
                    </button>
                    <button
                        className="category"
                        onClick={() => changeCategory('now_playing')}
                    >
                        Now Playing
                    </button>
                </section>
                <section className="page_section">
                    <ArrowCircleLeft
                        width="1.5rem"
                        height="1.5rem"
                        onClick={() => prevPage()}
                        color="#404258"
                        secondaryColor={
                            currentPage === 1 ? '#6B728E' : '#EEEEEE'
                        }
                        cursor={currentPage === 1 ? '' : 'pointer'}
                    />
                    <ArrowCircleRight
                        width="1.5rem"
                        height="1.5rem"
                        onClick={() => nextPage()}
                        color="#404258"
                        secondaryColor={
                            currentPage === totalPages ? '#6B728E' : '#EEEEEE'
                        }
                        cursor={currentPage === totalPages ? '' : 'pointer'}
                    />
                </section>
                <ul>
                    {movies.map((movie) => {
                        return (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                openModal={openModal}
                            />
                        );
                    })}
                </ul>
            </section>
        </section>
    );
};

export default Container;
