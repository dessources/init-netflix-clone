import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import {useAuth} from '../context/AuthContext'

const FormLogin = ({create = false, login, register, logout}) => {
  const [checked, setChecked] = React.useState(false)
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const label = create ? 'Sign Up' : 'Sign In'

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minWidth: '330px',
        '& > *': {
          m: 1,
        },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="email"
        label="Email or username"
        variant="filled"
        color="secondary"
        value={username}
        onChange={e => setUsername(e.target.value)}
        style={{opacity: '1'}}
      />
      <TextField
        id="password"
        type="password"
        label="Password"
        variant="filled"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      {create ? (
        <>
          <Button
            style={{margin: '20px 0 5px 0'}}
            variant="contained"
            color="secondary"
            onClick={() => register({username, password})}
          >
            {label}
          </Button>
          <small>* Terms and conditions apply</small>
          <small>This page is protected by Google reCAPTCHA</small>
        </>
      ) : (
        <>
          <Button
            style={{margin: '20px 0 5px 0'}}
            variant="contained"
            color="secondary"
            onClick={() => login({username, password})}
          >
            {label}
          </Button>
          <div>
            {' '}
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="checkedA"
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                    color="primary"
                  />
                }
                label={
                  <Typography component={'span'} style={{fontSize: '0.8rem'}}>
                    Remember me
                  </Typography>
                }
              />
            </FormGroup>
          </div>
        </>
      )}
    </Box>
  )
}

function PopupLogin({open, handleClose, signup = false, status}) {
  const {login, logout, register, authError: error} = useAuth()
  const [create, setCreate] = React.useState(signup)
  const handleSignUp = () => {
    setCreate(true)
  }
  const handleSignIn = () => {
    setCreate(false)
  }
  const label = create ? 'Sign Up' : 'Sign In'
  const spinner =
    status === 'fetching ' ? <CircularProgress color="secondary" /> : <></>
  return (
    <>
      <Dialog
        PaperProps={{
          sx: {opacity: 0.9},
        }}
        style={{backgroundColor: 'transparent'}}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{label}</DialogTitle>
        <DialogContent>
          <FormLogin
            create={create}
            login={login}
            register={register}
            logout={logout}
          />
          {error ? (
            <Alert severity="error">Error: {error.message}</Alert>
          ) : null}
        </DialogContent>
        <DialogActions style={{justifyContent: 'flex-start'}}>
          {!create ? (
            <Button onClick={handleSignUp} color="secondary">
              New to Netflix? {spinner}
            </Button>
          ) : (
            <Button onClick={handleSignIn} color="secondary" autoFocus>
              Already have an account? {spinner}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  )
}
export {PopupLogin as LoginRegister}
