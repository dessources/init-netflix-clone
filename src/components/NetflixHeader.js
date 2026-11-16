import React from 'react'
import {imagePathOriginal, TYPE_MOVIE} from '../config'
import {HeaderSkeleton} from './skeletons/HeaderSkeleton'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  useBookmark,
  useAddBookmark,
  useDeleteBookmark,
} from '../utils/hooksMovies'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const NetflixHeader = ({movie, type = TYPE_MOVIE}) => {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false)
  const [mutateBookmarkError, setMutateBookmarkError] = React.useState()
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
  const data = useBookmark()

  const addMutation = useAddBookmark({
    onSuccess: () => {
      setSnackbarOpen(true)
      setMutateBookmarkError()
    },
    onError: error => {
      setSnackbarOpen(true)
      setMutateBookmarkError(error)
    },
  })

  const deleteMutation = useDeleteBookmark({
    onSuccess: () => {
      setSnackbarOpen(true)
      setMutateBookmarkError()
    },
    onError: error => {
      setSnackbarOpen(true)
      setMutateBookmarkError(error)
    },
  })

  const handleAddToListClick = () => {
    addMutation.mutate({
      type,
      id: movie.id,
    })
  }

  const handleDeleteToListClick = () => {
    deleteMutation.mutate({
      type,
      id: movie.id,
    })
  }
  const isInList = data?.bookmark[
    type === TYPE_MOVIE ? 'movies' : 'series'
  ]?.includes(movie?.id)

  if (!movie) {
    return <HeaderSkeleton></HeaderSkeleton>
  }

  return (
    <header style={banner} aria-label="banner">
      <div className="banner__contents">
        <h1 className="banner__title">{title ?? '...'}</h1>
        <div className="banner__buttons">
          <a href={movie.homepage} target="_blank" rel="noreferrer">
            <button className="banner__button banner__buttonplay">
              Play
            </button>
          </a>
          {isInList ? (
            <button
              className="banner__button banner__buttonInfo"
              onClick={handleDeleteToListClick}
            >
              <DeleteIcon
                color="secondary"
                style={{marginRight: '5px'}}
                fontSize={'small'}
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
      {!mutateBookmarkError ? (
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert severity="success" sx={{width: '100%'}}>
            List updated successfully
          </Alert>
        </Snackbar>
      ) : null}
      {mutateBookmarkError ? (
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert severity="error" sx={{width: '100%'}}>
            Error updating list: {mutateBookmarkError.message}
          </Alert>
        </Snackbar>
      ) : null}
    </header>
  )
}

export {NetflixHeader}
