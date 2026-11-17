import React, {useState, useEffect} from 'react'
import {AppBar, Toolbar, Typography, InputBase} from '@mui/material'
import {styled, alpha} from '@mui/material/styles'
import SearchIcon from '@mui/icons-material/Search'

const Search = styled('div')(({theme}) => ({
  marginRight: '15px',
  marginLeft: 'auto',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({theme}) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({theme}) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}))

const NetflixAppBar = ({logout, onSearch}) => {
  const [appBarStyle, setAppBarStyle] = useState({
    background: 'transparent',
    boxShadow: 'none',
  })
  const [query, setQuery] = useState('')

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

  const handleKeyDown = e => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      onSearch?.(query.trim())
    }
  }

  const handleClearSearch = () => {
    setQuery('')
    onSearch?.('')
  }

  const navItemStyle = {margin: 10, cursor: 'pointer'}

  return (
    <AppBar style={appBarStyle}>
      <Toolbar>
        <img
          className="nav__logo"
          src="/images/netflix-logo.png"
          alt="Netflix"
          style={{cursor: 'pointer'}}
          onClick={handleClearSearch}
        />
        <Typography
          style={navItemStyle}
          variant="h6"
          onClick={handleClearSearch}
        >
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
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            onKeyDown={handleKeyDown}
            onChange={e => {
              setQuery(e.target.value)
              if (e.target.value === '') onSearch?.('')
            }}
            value={query}
            placeholder="Search"
            inputProps={{'aria-label': 'search'}}
          />
        </Search>
        <img
          role="button"
          aria-label="logout"
          title="Sign Out"
          style={{cursor: 'pointer'}}
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
