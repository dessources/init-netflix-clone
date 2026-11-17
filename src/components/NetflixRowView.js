import React from 'react'
import {RowSkeleton} from './skeletons/RowSkeleton'
import {TYPE_MOVIE, imagePath400} from '../config'

const NetflixRowView = ({
  data = [],
  title = '',
  wideImage = true,
  type = TYPE_MOVIE,
  watermark = false,
}) => {
  if (!data) {
    return <RowSkeleton title={title} wideImage={wideImage} />
  }
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters" role="listitem" aria-label={type}>
        {data.map(movie => (
          <RowCard
            key={movie.id}
            movie={movie}
            watermark={watermark}
            wideImage={wideImage}
          />
        ))}
      </div>
    </div>
  )
}

const RowCard = ({movie, watermark, wideImage}) => {
  const buildImagePath = data => {
    const image = wideImage ? data?.backdrop_path : data?.poster_path
    return image ? `${imagePath400}${image}` : null
  }
  const watermarkClass = watermark ? 'watermarked' : ''

  if (!movie) {
    return null
  }
  return (
    <div className={`row__poster row__posterLarge ${watermarkClass}`}>
      <img
        src={buildImagePath(movie)}
        alt={movie?.name || movie?.title || ''}
      />
    </div>
  )
}

export {NetflixRowView, RowCard}
