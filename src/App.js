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
     Create two state variables:
       - user: starts as null (holds the logged-in user object)
       - loading: starts as true (while we check if a session exists)
     ------------------------------------------------------------ */

  // TODO: Declare [user, setUser] and [loading, setLoading] using useState


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
     1. Write an async function handleLogout() that calls
        await supabase.auth.signOut() and sets user to null.
     2. If loading is true, return <LoadingFullScreen />.
     ------------------------------------------------------------ */

  // TODO: Write handleLogout() and return <LoadingFullScreen /> while loading

  return (
    <ThemeProvider theme={theme}>
      {user ? <NetflixApp logout={handleLogout} /> : <UnauthApp />}
    </ThemeProvider>
  )
}

export {App}
