import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {NetflixRowView} from './NetflixRowView'
import {API_URL, apiKey, lang, TYPE_MOVIE} from '../config'
import {RowSkeleton} from './skeletons/RowSkeleton'

const getEndpoint = (type, filter, param) => {
  switch (filter) {
    case 'populaire':
      return `${type}/popular`
    case 'latest':
      return `${type}/upcoming`
    case 'toprated':
      return `${type}/top_rated`
    case 'genre':
      return `discover/${type}?with_genres=${param}`
    case 'trending':
      return `trending/${type}/day`
    default:
      throw new Error('Filter type not supported')
  }
}

const NetflixRow = ({
  title = '',
  wideImage = true,
  type = TYPE_MOVIE,
  param,
  filter = 'populaire',
  watermark = false,
}) => {
  const [movies, setMovies] = useState(null)

  useEffect(() => {
    const endpoint = getEndpoint(type, filter, param)
    const separator = endpoint.includes('?') ? '&' : '?'
    const url = `${API_URL}/${endpoint}${separator}api_key=${apiKey}&language=${lang}&page=1`

    // --- STEP 1: Using native browser fetch() ---
    // fetch(url)
    //   .then(response => response.json())
    //   .then(data => setMovies(data.results ?? []))
    //   .catch(error => console.error('Error fetching row:', error))

    // --- STEP 2: Simplified with axios.get() ---
    axios
      .get(url)
      .then(response => setMovies(response.data?.results ?? []))
      .catch(error => console.error('Error fetching row:', error))
  }, [type, filter, param])

  if (!movies) {
    return <RowSkeleton title={title} wideImage={wideImage} />
  }

  return (
    <NetflixRowView
      data={movies}
      title={title}
      type={type}
      wideImage={wideImage}
      watermark={watermark}
    />
  )
}

export {NetflixRow}
