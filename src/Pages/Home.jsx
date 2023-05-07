import React, { useEffect, useRef, useState } from 'react'
import { API } from '../constants'
import Loading from './Loading'
import { Link } from 'react-router-dom'

const Home = () => {
    const [movies, setMovies] = useState([])
    const [years, setYears] = useState([])
    const search = useRef('')
    const [msg, setMsg] = useState('Loading Results')

    const show_message = () => {
        setTimeout(() => {
            setMsg("Failed to load results. Please update your search...")
        }, [10000])
        return <div className='text-center p-5'><span className='rounded-pill p-2 px-5 m-auto fs-3 text-center mt-5 bg-dark text-white'>{msg}</span></div>
    }
    // search.current = 'batman'
    useEffect(() => {
        fetch(`${API}s=${search.current}`)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setYears([])
                    setMovies(data.Search)
                    let m_years = data.Search.map(movie => movie.Year)
                    m_years.sort()
                    // setYears([m_years[0]])
                    let new_array = []
                    for (let i = 1; i < m_years.length; i++) {
                        if (new_array.findIndex(yr => yr === m_years[i]) == -1) {
                            new_array.push(m_years[i])
                        }
                    }
                    setYears(new_array)
                }
            })
    }, [])

    const data_update = (e) => {
        setMsg("Loading Results...")

        search.current = e.target.value
        fetch(`${API}s=${search.current}`)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setYears([])
                    setMovies(data.Search)
                    let m_years = data.Search.map(movie => movie.Year)
                    m_years.sort()
                    // setYears([m_years[0]])
                    let new_array = []
                    for (let i = 1; i < m_years.length; i++) {
                        if (new_array.findIndex(yr => yr === m_years[i]) == -1) {
                            new_array.push(m_years[i])
                        }
                    }
                    setYears(new_array)
                }
            })
    }


    return (
        <div className='container'>
            <div className="container">
                <div className="row text-center d-flex align-items-center">
                    <div className="col-md-6">
                        <input type="search" onChange={data_update} className='form-control m-auto my-5 ps-3' />
                    </div>
                    <div className="col-md-3 d-flex justify-content-evenly">
                        <div className="form-check">
                            <input type='radio' className='form-check-input' id='all' name='type' value=''></input>
                            <label class="form-check-label" for="all">
                                All
                            </label>
                        </div>
                        <div className="form-check">
                            <input type='radio' className='form-check-input' id='movies' name='type' value='movie'></input>
                            <label class="form-check-label" for="movies">
                                Movie
                            </label>
                        </div>
                        <div className="form-check">
                            <input type='radio' className='form-check-input' id='series' name='type' value='series'></input>
                            <label class="form-check-label" for="series">
                                Series
                            </label>
                        </div>
                    </div>
                    <div className="col-md-2">

                        <select name="" id="years" className='px-3 py-1'>
                            <option value="">Year</option>
                            {console.log(years)}
                            {
                                years && years.map(yr => {
                                    return <option value={yr}>{yr}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="col-md-1">
                        <Link to='/translate'>Tr</Link>
                    </div>

                </div>
            </div>
            {
                !movies ?
                <>
                    <Loading />
                    {show_message()}
                </>
                    :
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
                        {movies.map((movie, i) => {
                            return <div className="col">
                                <div className="card">
                                    <div className='p-2'>
                                        <img src={movie.Poster} className="card-img-top" alt={movie.Title} />
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">{movie.Title}</h5>
                                        <h6 className="card-title">Type: {movie.Type}</h6>
                                        <p className="card-text">Year: {movie.Year} </p>

                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
            }
        </div>

    )
}

export default Home