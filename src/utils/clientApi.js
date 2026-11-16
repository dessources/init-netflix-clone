import axios from 'axios'
import {apiKey, lang, API_URL} from '../config'

/**
 * Client for fetching movies, TV series, and posters from TMDB API
 */
const clientApi = async endpoint => {
  const page = 1
  const startChar = endpoint.includes('?') ? `&` : `?`
  const keyLang = `${startChar}api_key=${apiKey}&language=${lang}&page=${page}`
  return axios.get(`${API_URL}/${endpoint}${keyLang}`).catch(error => {
    if (error.response) {
      const err = {
        ...error.response,
        message: error.response?.data?.status_message,
      }
      return Promise.reject(err)
    } else {
      return Promise.reject(error)
    }
  })
}

/**
 * Dead-simple local bookmark storage for the workshop.
 * Replaces the old MSW service-worker mock with pure, zero-config localStorage.
 */
const BOOKMARK_STORAGE_KEY = 'netflix_bookmarks'

const getLocalBookmarks = () => {
  try {
    const raw = window.localStorage.getItem(BOOKMARK_STORAGE_KEY)
    return raw ? JSON.parse(raw) : { movies: [749274], series: [] }
  } catch {
    return { movies: [749274], series: [] }
  }
}

const saveLocalBookmarks = bookmarks => {
  window.localStorage.setItem(BOOKMARK_STORAGE_KEY, JSON.stringify(bookmarks))
}

const clientNetFlix = async (endpoint, {data, method = 'GET'} = {}) => {
  if (endpoint.startsWith('bookmark')) {
    const bookmarks = getLocalBookmarks()
    const isMovie = endpoint.includes('movie')
    const category = isMovie ? 'movies' : 'series'

    if (method === 'GET') {
      return { bookmark: bookmarks }
    }

    if (method === 'POST') {
      const id = data?.id
      if (id && !bookmarks[category].includes(id)) {
        bookmarks[category].push(id)
        saveLocalBookmarks(bookmarks)
      }
      return { bookmark: bookmarks }
    }

    if (method === 'DELETE') {
      const id = data?.id
      if (id) {
        bookmarks[category] = bookmarks[category].filter(item => item !== id)
        saveLocalBookmarks(bookmarks)
      }
      return { bookmark: bookmarks }
    }
  }

  return { bookmark: { movies: [], series: [] } }
}

const clientAuth = () => Promise.resolve({ data: {} })

export { clientApi, clientAuth, clientNetFlix }
