/* ============================================================
   FILE 5: HERO BANNER & SEARCH (src/components/NetflixApp.js)
   
   NetflixApp is the main authenticated dashboard. It renders:
     - NetflixAppBar (top navigation & search input)
     - NetflixHeader (the featured hero show banner at the top)
     - NetflixRow (each scrollable category row of posters)
   
   Follow STEP 1 below to fetch the featured hero banner show,
   then review the pre-built search effect right underneath it.
   ============================================================ */

import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {NetflixAppBar} from './NetflixAppBar'
import {NetflixRow} from './NetflixRow'
import {NetflixRowView} from './NetflixRowView'
import {NetFlixFooter} from './NetFlixFooter'
import {NetflixHeader} from './NetflixHeader'
import {getRandomType, getRandomId} from '../utils/helper'
import {API_URL, apiKey, lang, TYPE_MOVIE, TYPE_TV} from '../config'
import './Netflix.css'

const NetflixApp = ({logout}) => {
  const [type, setType] = useState(getRandomType())
  const [defaultMovieId] = useState(getRandomId(type))
  const [headerMovie, setHeaderMovie] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])

  /* ------------------------------------------------------------
     STEP 1: FETCH THE INITIAL HERO BANNER SHOW (useEffect)
     Inside useEffect(..., [defaultMovieId]):
       1. Build the TMDB URL for the single movie or TV show:
          const url = `${API_URL}/${type}/${defaultMovieId}?api_key=${apiKey}&language=${lang}`
       2. Fetch the show details with axios.get(url) (or fetch(url))
          and pass response.data to setHeaderMovie(response.data).
     ------------------------------------------------------------ */

  // TODO: Write useEffect to fetch the initial featured show and call setHeaderMovie


  /* ------------------------------------------------------------
     WALKTHROUGH ONLY (PRE-BUILT): SEARCH & HERO UPDATE
     When the user submits a search in NetflixAppBar, searchQuery
     updates. This effect queries TMDB's /search/multi endpoint,
     displays the matching row, and promotes the first result
     (results[0]) to the hero banner!
     ------------------------------------------------------------ */
  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([])
      return
    }

    const url = `${API_URL}/search/multi?query=${encodeURIComponent(
      searchQuery,
    )}&api_key=${apiKey}&language=${lang}&page=1`

    axios
      .get(url)
      .then(response => {
        const results = (response.data?.results ?? []).filter(
          item => item.backdrop_path || item.poster_path,
        )
        setSearchResults(results)
        if (results.length > 0) {
          const firstShow = results[0]
          const firstType =
            firstShow.media_type === TYPE_TV ? TYPE_TV : TYPE_MOVIE
          setType(firstType)
          setHeaderMovie(firstShow)
        }
      })
      .catch(error => console.error('Error searching movies:', error))
  }, [searchQuery])

  // Updates the hero section whenever any poster card is clicked
  useEffect(() => {
    const handleSelectMovie = e => {
      const {movie, type: selectedType} = e.detail
      if (!movie) return
      const resolvedType =
        selectedType || (movie.media_type === TYPE_TV ? TYPE_TV : TYPE_MOVIE)
      setType(resolvedType)
      setHeaderMovie(movie)

      const url = `${API_URL}/${resolvedType}/${movie.id}?api_key=${apiKey}&language=${lang}`
      axios
        .get(url)
        .then(response => setHeaderMovie(response.data))
        .catch(() => {})
    }

    window.addEventListener('netflix:select-movie', handleSelectMovie)
    return () =>
      window.removeEventListener('netflix:select-movie', handleSelectMovie)
  }, [])

  return (
    <div>
      <NetflixAppBar logout={logout} onSearch={setSearchQuery} />
      <NetflixHeader movie={headerMovie} type={type} />
      {searchQuery ? (
        searchResults.length > 0 ? (
          <NetflixRowView
            data={searchResults}
            wideImage={false}
            watermark={false}
            type={TYPE_MOVIE}
            title={`Search Results for "${searchQuery}"`}
          />
        ) : (
          <div className="row">
            <h2>No results found for "{searchQuery}"</h2>
          </div>
        )
      ) : null}
      <NetflixRow
        wideImage={false}
        watermark={true}
        type={TYPE_MOVIE}
        filter="trending"
        title="Netflix Movies"
      />
      <NetflixRow
        wideImage={false}
        watermark={true}
        type={TYPE_TV}
        filter="trending"
        title="Netflix TV Shows"
      />
      <NetflixRow
        type={TYPE_MOVIE}
        filter="toprated"
        title="Top Rated"
        watermark={true}
        wideImage={false}
      />
      <NetflixRow
        type={TYPE_TV}
        filter="genre"
        param="10759"
        title="Action & Adventure"
        watermark={true}
        wideImage={false}
      />
      <NetflixRow
        type={TYPE_MOVIE}
        filter="genre"
        param="53"
        title="Best Thrillers"
        watermark={false}
        wideImage={false}
      />
      <NetFlixFooter color="secondary" />
    </div>
  )
}

export {NetflixApp}
