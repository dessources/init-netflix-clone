/* ============================================================
   FILE 4: ROOT APP & SESSION LISTENER (src/App.js)
   
   Now that LoginRegister can sign a user in, App.js listens to
   Supabase for active sessions and switches between UnauthApp
   (the login page) and NetflixApp (the movies dashboard).
   
   Follow the steps below in order from top to bottom.
   ============================================================ */

import React, {useState, useEffect} from 'react'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import {supabase} from './utils/supabaseClient'
import LoadingFullScreen from './components/LoadingFullScreen'
import UnauthApp from './UnauthApp'
import {NetflixApp} from './components/NetflixApp'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {main: '#767676'},
    secondary: {main: '#E50914'},
  },
})

function App() {
  /* ------------------------------------------------------------
     STEP 1: USER & LOADING STATE (useState)
     Replace the placeholders below with real useState hooks:
       - user: useState(null) (holds the logged-in user object)
       - loading: useState(true) (while we check if a session exists)
     ------------------------------------------------------------ */

  // TODO: Replace with const [user, setUser] = useState(null) and [loading, setLoading] = useState(true)
  const user = null
  const loading = false

  /* ------------------------------------------------------------
     STEP 2: LISTEN FOR AUTH SESSION (useEffect)
     Inside useEffect(..., []):
       1. Call supabase.auth.getSession() to check if the user is
          already logged in from an earlier visit. Set user to
          session?.user ?? null and set loading to false.
       2. Call supabase.auth.onAuthStateChange((_event, session) => ...)
          so whenever the user signs in, signs up, or logs out,
          our user state updates automatically!
       3. Return a cleanup function to unsubscribe when unmounted.
     ------------------------------------------------------------ */

  // TODO: Write useEffect to check getSession() and subscribe to onAuthStateChange()


  /* ------------------------------------------------------------
     STEP 3: LOGOUT HANDLER & LOADING CHECK
     1. Update handleLogout() to call await supabase.auth.signOut()
        and set user to null.
     2. Keep the loading check so <LoadingFullScreen /> renders
        while loading is true.
     ------------------------------------------------------------ */

  // TODO: Implement async handleLogout() with supabase.auth.signOut()
  const handleLogout = () => {}

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
