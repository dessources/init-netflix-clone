import React from 'react'
import {NetflixAppBar} from './NetflixAppBar'
import {NetflixRow} from './NetflixRow'
import {NetFlixFooter} from './NetFlixFooter'
import {NetflixHeader} from './NetflixHeader'
import {getRandomId} from '../utils/helper'
import {useMovie} from '../utils/hooksMovies'
import {TYPE_TV} from '../config'
import './Netflix.css'

const NetflixSeries = ({logout}) => {
  const type = TYPE_TV
  const [defaultMovieId] = React.useState(getRandomId(type))
  const headerMovie = useMovie(type, defaultMovieId)
  return (
    <div>
      <NetflixAppBar logout={logout} />
      <NetflixHeader movie={headerMovie} type={type} />
      <NetflixRow
        wideImage={true}
        watermark={true}
        type={TYPE_TV}
        filter="trending"
        title="Trending TV Shows"
      />
      <NetflixRow
        wideImage={false}
        watermark={true}
        type={TYPE_TV}
        filter="toprated"
        title="Top Rated TV Shows"
      />

      <NetflixRow
        type={TYPE_TV}
        filter="populaire"
        title="Popular TV Shows"
        watermark={true}
        wideImage={true}
      />

      <NetflixRow
        type={TYPE_TV}
        filter="genre"
        param="99"
        title="Documentaries"
        watermark={true}
        wideImage={true}
      />

      <NetflixRow
        type={TYPE_TV}
        filter="genre"
        param="80"
        title="Crime TV Shows"
        watermark={false}
        wideImage={false}
      />
      <NetFlixFooter color="secondary" si />
    </div>
  )
}
export {NetflixSeries}
