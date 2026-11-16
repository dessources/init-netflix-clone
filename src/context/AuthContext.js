import * as React from 'react'
import { supabase, isMockAuth } from '../utils/supabaseClient'
import { clientNetFlix } from '../utils/clientApi'
import { useQueryClient } from 'react-query'
import { useClearHistory } from './HistoryMoviesContext'
import LoadingFullScreen from '../components/LoadingFullScreen'

const AuthContext = React.createContext()

const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth() must be used within an <AuthProvider>')
  }
  return context
}

const AuthProvider = props => {
  const queryclient = useQueryClient()
  const clearHistory = useClearHistory()

  const [authUser, setAuthUser] = React.useState(null)
  const [token, setToken] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [authError, setAuthError] = React.useState(null)

  React.useEffect(() => {
    // 1. Check existing session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setAuthUser(session.user)
        setToken(session.access_token)
      } else {
        setAuthUser(null)
        setToken(null)
      }
      setLoading(false)
    })

    // 2. React to auth state changes in real time
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setAuthUser(session.user)
        setToken(session.access_token)
      } else {
        setAuthUser(null)
        setToken(null)
      }
      setLoading(false)
    })

    return () => {
      subscription?.unsubscribe?.()
    }
  }, [])

  const login = React.useCallback(async ({ email, username, password }) => {
    setAuthError(null)
    const userEmail = email || (username?.includes('@') ? username : `${username}@example.com`)
    const { data, error } = await supabase.auth.signInWithPassword({
      email: userEmail,
      password,
    })
    if (error) {
      setAuthError(error)
      throw error
    }
    return data.user
  }, [])

  const register = React.useCallback(async ({ email, username, password }) => {
    setAuthError(null)
    const userEmail = email || (username?.includes('@') ? username : `${username}@example.com`)
    const { data, error } = await supabase.auth.signUp({
      email: userEmail,
      password,
    })
    if (error) {
      setAuthError(error)
      throw error
    }
    return data.user
  }, [])

  const logout = React.useCallback(async () => {
    setAuthError(null)
    await supabase.auth.signOut()
    queryclient.clear()
    clearHistory()
    setAuthUser(null)
    setToken(null)
  }, [clearHistory, queryclient])

  const value = React.useMemo(
    () => ({
      authUser: authUser ? { ...authUser, token } : null,
      login,
      register,
      logout,
      authError,
      setAuthError,
      isMockAuth,
    }),
    [authError, authUser, login, logout, register, token],
  )

  if (loading) {
    return <LoadingFullScreen />
  }

  return <AuthContext.Provider value={value} {...props} />
}

const useClientNetflix = () => {
  const { authUser } = useAuth()
  const token = authUser?.token || authUser?.id
  return (endpoint, data) => clientNetFlix(endpoint, { ...data, token })
}

export { AuthContext, useAuth, AuthProvider, useClientNetflix }
