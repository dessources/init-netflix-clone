import React, {useState, useEffect} from 'react'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import {supabase} from './utils/supabaseClient'
import LoadingFullScreen from './components/LoadingFullScreen'
import UnauthApp from './UnauthApp'
import {NetflixApp} from './components/NetflixApp'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#767676',
    },
    secondary: {
      main: '#E50914',
    },
  },
})

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 1. Check active session on initial load
    supabase.auth.getSession().then(({data: {session}}) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // 2. Listen for login, register, and logout events
    const {
      data: {subscription},
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription?.unsubscribe?.()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  if (loading) {
    return <LoadingFullScreen />
  }

  return (
    <ThemeProvider theme={theme}>
      {user ? <NetflixApp logout={handleLogout} /> : <UnauthApp />}
    </ThemeProvider>
  )
}

export {App}
