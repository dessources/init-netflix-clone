import React, {useState} from 'react'
import {imagePathOriginal, TYPE_MOVIE} from '../config'
import {HeaderSkeleton} from './skeletons/HeaderSkeleton'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import DeleteIcon from '@mui/icons-material/Delete'

const BOOKMARK_STORAGE_KEY = 'netflix_bookmarks'

const getSavedIds = () => {
  try {
    const raw = window.localStorage.getItem(BOOKMARK_STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

const NetflixHeader = ({movie, type = TYPE_MOVIE}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [savedIds, setSavedIds] = useState(getSavedIds)

  if (!movie) {
    return <HeaderSkeleton />
  }

  const title = type === TYPE_MOVIE ? movie?.title : movie?.name
  const imageUrl = `${imagePathOriginal}${movie?.backdrop_path}`
  const banner = {
    backgroundImage: `url('${imageUrl}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    color: 'white',
    objectFit: 'contain',
    height: '448px',
  }

  const isInList = savedIds.includes(movie.id)

  const handleAddToListClick = () => {
    const updated = [...savedIds, movie.id]
    setSavedIds(updated)
    window.localStorage.setItem(BOOKMARK_STORAGE_KEY, JSON.stringify(updated))
    setSnackbarOpen(true)
  }

  const handleDeleteToListClick = () => {
    const updated = savedIds.filter(id => id !== movie.id)
    setSavedIds(updated)
    window.localStorage.setItem(BOOKMARK_STORAGE_KEY, JSON.stringify(updated))
    setSnackbarOpen(true)
  }

  return (
    <header style={banner} aria-label="banner">
      <div className="banner__contents">
        <h1 className="banner__title">{title ?? '...'}</h1>
        <div className="banner__buttons">
          <a href={movie.homepage} target="_blank" rel="noreferrer">
            <button className="banner__button banner__buttonplay">Play</button>
          </a>
          {isInList ? (
            <button
              className="banner__button banner__buttonInfo"
              onClick={handleDeleteToListClick}
            >
              <DeleteIcon
                color="secondary"
                style={{marginRight: '5px'}}
                fontSize="small"
              />
              Remove from list
            </button>
          ) : (
            <button
              className="banner__button banner__buttonInfo"
              onClick={handleAddToListClick}
            >
              Add to list
            </button>
          )}
        </div>
        <h1 className="synopsis">{movie?.overview ?? '...'}</h1>
      </div>
      <div className="banner--fadeBottom"></div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success" variant="filled" sx={{width: '100%'}}>
          List updated successfully
        </Alert>
      </Snackbar>
    </header>
  )
}

export {NetflixHeader}
