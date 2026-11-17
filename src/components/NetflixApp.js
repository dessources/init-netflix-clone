import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {NetflixAppBar} from './NetflixAppBar'
import {NetflixRow} from './NetflixRow'
import {NetFlixFooter} from './NetFlixFooter'
import {NetflixHeader} from './NetflixHeader'
import {getRandomType, getRandomId} from '../utils/helper'
import {API_URL, apiKey, lang, TYPE_MOVIE, TYPE_TV} from '../config'
import './Netflix.css'

const NetflixApp = ({logout}) => {
  const [type] = useState(getRandomType())
  const [defaultMovieId] = useState(getRandomId(type))
  const [headerMovie, setHeaderMovie] = useState(null)

  useEffect(() => {
    const url = `${API_URL}/${type}/${defaultMovieId}?api_key=${apiKey}&language=${lang}`

    // --- STEP 1: Using native browser fetch() ---
    // fetch(url)
    //   .then(response => response.json())
    //   .then(data => setHeaderMovie(data))
    //   .catch(error => console.error('Error fetching header movie:', error))

    // --- STEP 2: Simplified with axios.get() ---
    axios
      .get(url)
      .then(response => setHeaderMovie(response.data))
      .catch(error => console.error('Error fetching header movie:', error))
  }, [type, defaultMovieId])

  return (
    <div>
      <NetflixAppBar logout={logout} />
      <NetflixHeader movie={headerMovie} type={type} />
      <NetflixRow
        wideImage={true}
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
        wideImage={true}
      />
      <NetflixRow
        type={TYPE_TV}
        filter="genre"
        param="10759"
        title="Action & Adventure"
        watermark={true}
        wideImage={true}
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
