import React, {useState, useRef, useEffect} from 'react'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import {RowSkeleton} from './skeletons/RowSkeleton'
import {TYPE_MOVIE, imagePath400} from '../config'

const NetflixRowView = ({
  data = [],
  title = '',
  wideImage = false,
  type = TYPE_MOVIE,
  watermark = false,
}) => {
  const rowRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollButtons = () => {
    const el = rowRef.current
    if (!el) return
    const {scrollLeft, scrollWidth, clientWidth} = el
    setCanScrollLeft(scrollLeft > 5)
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5)
  }

  useEffect(() => {
    updateScrollButtons()
    window.addEventListener('resize', updateScrollButtons)
    return () => window.removeEventListener('resize', updateScrollButtons)
  }, [data])

  const handleScroll = direction => {
    const el = rowRef.current
    if (!el) return
    const scrollAmount = el.clientWidth * 0.75
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  if (!data) {
    return <RowSkeleton title={title} wideImage={wideImage} />
  }

  return (
    <div className="row" onMouseEnter={updateScrollButtons}>
      <h2>{title}</h2>
      <div className="row__slider">
        {canScrollLeft && (
          <button
            type="button"
            className="row__arrow row__arrow--left"
            aria-label="Scroll left"
            onClick={() => handleScroll('left')}
          >
            <ChevronLeftIcon fontSize="large" />
          </button>
        )}

        <div
          ref={rowRef}
          className="row__posters"
          role="listitem"
          aria-label={type}
          onScroll={updateScrollButtons}
        >
          {data.map(movie => (
            <RowCard
              key={movie.id}
              movie={movie}
              type={movie.media_type || type}
              watermark={watermark}
              wideImage={wideImage}
              onImageLoad={updateScrollButtons}
            />
          ))}
        </div>

        {canScrollRight && (
          <button
            type="button"
            className="row__arrow row__arrow--right"
            aria-label="Scroll right"
            onClick={() => handleScroll('right')}
          >
            <ChevronRightIcon fontSize="large" />
          </button>
        )}
      </div>
    </div>
  )
}

const RowCard = ({movie, type, watermark, wideImage, onImageLoad}) => {
  const buildImagePath = data => {
    const image = wideImage ? data?.backdrop_path : data?.poster_path
    return image ? `${imagePath400}${image}` : null
  }
  const watermarkClass = watermark ? 'watermarked' : ''

  if (!movie) {
    return null
  }

  const imageSrc = buildImagePath(movie)
  if (!imageSrc) {
    return null
  }

  const handleSelect = () => {
    window.dispatchEvent(
      new CustomEvent('netflix:select-movie', {
        detail: {movie, type},
      }),
    )
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  return (
    <div
      className={`row__poster row__posterLarge ${watermarkClass}`}
      onClick={handleSelect}
    >
      <img
        src={imageSrc}
        alt={movie?.name || movie?.title || ''}
        onLoad={onImageLoad}
      />
    </div>
  )
}

export {NetflixRowView, RowCard}
