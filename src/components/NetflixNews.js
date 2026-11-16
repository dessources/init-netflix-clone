import React from 'react'
import {NetflixAppBar} from './NetflixAppBar'
import {NetflixRow} from './NetflixRow'
import {NetFlixFooter} from './NetFlixFooter'
import {NetflixHeader} from './NetflixHeader'
import {getRandomType, getRandomId} from '../utils/helper'
import {useMovie} from '../utils/hooksMovies'
import {TYPE_MOVIE, TYPE_TV} from '../config'
import './Netflix.css'

const NetflixNews = ({logout}) => {
  const [type] = React.useState(getRandomType())
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
        filter="latest"
        title="Coming Soon"
      />
      <NetflixRow
        wideImage={false}
        watermark={true}
        type={TYPE_MOVIE}
        filter="latest"
        title="New Releases"
      />

      <NetflixRow
        type={TYPE_MOVIE}
        filter="latest"
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
      <NetFlixFooter color="secondary" si />
    </div>
  )
}
export {NetflixNews}
