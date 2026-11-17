import React, {useState, useEffect} from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

const NetflixAppBar = ({logout}) => {
  const [appBarStyle, setAppBarStyle] = useState({
    background: 'transparent',
    boxShadow: 'none',
  })

  useEffect(() => {
    const onScroll = e => {
      if (e.target.documentElement.scrollTop >= 100) {
        setAppBarStyle({
          background: '#111',
          transition: 'background .5s ease-out',
          boxShadow: 'none',
        })
      } else {
        setAppBarStyle({
          background: 'transparent',
          transition: 'background .5s ease-out',
          boxShadow: 'none',
        })
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItemStyle = {margin: 10, cursor: 'pointer'}

  return (
    <AppBar style={appBarStyle}>
      <Toolbar>
        <img className="nav__logo" src="/images/netflix-logo.png" alt="Netflix" />
        <Typography style={navItemStyle} variant="h6">
          Home
        </Typography>
        <Typography style={navItemStyle} variant="h6">
          TV Shows
        </Typography>
        <Typography style={navItemStyle} variant="h6">
          Movies
        </Typography>
        <Typography style={navItemStyle} variant="h6">
          New & Popular
        </Typography>
        <Typography style={navItemStyle} variant="h6">
          My List
        </Typography>
        <img
          role="button"
          aria-label="logout"
          title="Sign Out"
          style={{cursor: 'pointer', marginLeft: 'auto'}}
          className="nav__avatar"
          src="/images/netflix-avatar.png"
          alt="User Avatar"
          onClick={logout}
        />
      </Toolbar>
    </AppBar>
  )
}

export {NetflixAppBar}
