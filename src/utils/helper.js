import {TYPE_TV, TYPE_MOVIE} from '../config'

export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function getRandomType() {
  return [TYPE_TV, TYPE_MOVIE][getRandomIntInclusive(0, 1)]
}

export function getRandomMovie() {
  const moviesIds = [399566, 602734, 579047, 385128, 615658]
  return moviesIds[getRandomIntInclusive(0, moviesIds.length - 1)]
}

export function getRandomSerie() {
  const tvIds = [71446, 60574, 1399, 66732]
  return tvIds[getRandomIntInclusive(0, tvIds.length - 1)]
}

export function getRandomId(type = TYPE_MOVIE) {
  return type === TYPE_TV ? getRandomSerie() : getRandomMovie()
}

export function getEndpoint(type, filter, param) {
  switch (filter) {
    case 'populaire':
      return `${type}/popular?`
    case 'latest':
      return `${type}/upcoming?`
    case 'toprated':
      return `${type}/top_rated?`
    case 'genre':
      return `discover/${type}?with_genres=${param}&`
    case 'trending':
      return `trending/${type}/day?`
    default:
      throw new Error('Filter type not supported')
  }
}

export function isSupabaseConfigured(url, key) {
  return Boolean(
    url?.trim() &&
      key?.trim() &&
      url.trim() !== 'your_supabase_project_url_here',
  )
}

/**
 * Simple localStorage mock of Supabase Auth so the app works
 * even before students configure their .env Supabase credentials.
 */
class SimpleMockAuth {
  constructor() {
    this.listeners = []
    this.storageKey = 'simple_mock_auth_session'
  }

  async getSession() {
    try {
      const raw = window.localStorage.getItem(this.storageKey)
      return {data: {session: raw ? JSON.parse(raw) : null}, error: null}
    } catch {
      return {data: {session: null}, error: null}
    }
  }

  async signInWithPassword({email, password}) {
    if (!email || !password) {
      return {
        data: {user: null, session: null},
        error: new Error('Email and password are required.'),
      }
    }
    const user = {
      id: btoa(email),
      email,
      created_at: new Date().toISOString(),
      user_metadata: {name: email.split('@')[0]},
    }
    const session = {
      user,
      access_token: `mock-jwt-token-${Date.now()}`,
    }
    window.localStorage.setItem(this.storageKey, JSON.stringify(session))
    this.notify(session)
    return {data: {user, session}, error: null}
  }

  async signUp({email, password}) {
    return this.signInWithPassword({email, password})
  }

  async signOut() {
    window.localStorage.removeItem(this.storageKey)
    this.notify(null)
    return {error: null}
  }

  onAuthStateChange(callback) {
    this.listeners.push(callback)
    return {
      data: {
        subscription: {
          unsubscribe: () => {
            this.listeners = this.listeners.filter(cb => cb !== callback)
          },
        },
      },
    }
  }

  notify(session) {
    const event = session ? 'SIGNED_IN' : 'SIGNED_OUT'
    this.listeners.forEach(cb => {
      try {
        cb(event, session)
      } catch (err) {
        console.error('Auth state listener error:', err)
      }
    })
  }
}

export function createMockSupabase() {
  return {auth: new SimpleMockAuth()}
}
