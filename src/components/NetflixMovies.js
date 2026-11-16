import React from 'react'
import {NetflixAppBar} from './NetflixAppBar'
import {NetflixRow} from './NetflixRow'
import {NetFlixFooter} from './NetFlixFooter'
import {NetflixHeader} from './NetflixHeader'
import {getRandomId} from '../utils/helper'
import {useMovie} from '../utils/hooksMovies'
import {TYPE_MOVIE} from '../config'
import './Netflix.css'

const NetflixMovies = ({logout}) => {
  const type = TYPE_MOVIE
  const [defaultMovieId] = React.useState(getRandomId(type))
  const headerMovie = useMovie(type, defaultMovieId)
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
        type={TYPE_MOVIE}
        filter="toprated"
        title="Top Rated"
      />

      <NetflixRow
        type={TYPE_MOVIE}
        filter="populaire"
        title="Popular Movies"
        watermark={true}
        wideImage={true}
      />

      <NetflixRow
        type={TYPE_MOVIE}
        filter="genre"
        param="14"
        title="Fantasy Movies"
        watermark={true}
        wideImage={true}
      />

      <NetflixRow
        type={TYPE_MOVIE}
        filter="genre"
        param="878"
        title="Sci-Fi Movies"
        watermark={false}
        wideImage={false}
      />
      <NetFlixFooter color="secondary" si />
    </div>
  )
}
export {NetflixMovies}
