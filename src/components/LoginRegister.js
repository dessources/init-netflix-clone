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

const FormLogin = ({create = false, login, register}) => {
  const [checked, setChecked] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const label = create ? 'Sign Up' : 'Sign In'

  const handleSubmit = async e => {
    e.preventDefault()
    if (!email || !password) return
    setIsSubmitting(true)
    try {
      if (create) {
        await register({email, password})
      } else {
        await login({email, password})
      }
    } catch {
      // Error is caught and set in AuthContext
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
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
        type="email"
        label="Email or username"
        variant="filled"
        color="secondary"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{opacity: '1'}}
      />
      <TextField
        id="password"
        type="password"
        label="Password"
        variant="filled"
        color="secondary"
        required
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      {create ? (
        <>
          <Button
            style={{margin: '20px 0 5px 0'}}
            variant="contained"
            color="secondary"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={24} color="inherit" /> : label}
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
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={24} color="inherit" /> : label}
          </Button>
          <div>
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

function PopupLogin({open, handleClose, signup = false}) {
  const {login, register, authError: error, setAuthError, isMockAuth} = useAuth()
  const [create, setCreate] = React.useState(signup)

  const handleSignUp = () => {
    setAuthError(null)
    setCreate(true)
  }
  const handleSignIn = () => {
    setAuthError(null)
    setCreate(false)
  }
  const label = create ? 'Sign Up' : 'Sign In'

  return (
    <>
      <Dialog
        PaperProps={{
          sx: {opacity: 0.95},
        }}
        style={{backgroundColor: 'transparent'}}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{label}</DialogTitle>
        <DialogContent>
          {isMockAuth && (
            <Alert severity="info" sx={{mb: 2}}>
              Mock Auth Active (set Supabase keys in .env for live auth)
            </Alert>
          )}
          <FormLogin
            create={create}
            login={login}
            register={register}
          />
          {error ? (
            <Alert severity="error" sx={{mt: 2}}>
              Error: {error.message || 'Authentication failed'}
            </Alert>
          ) : null}
        </DialogContent>
        <DialogActions style={{justifyContent: 'flex-start'}}>
          {!create ? (
            <Button onClick={handleSignUp} color="secondary">
              New to Netflix? Sign up now
            </Button>
          ) : (
            <Button onClick={handleSignIn} color="secondary" autoFocus>
              Already have an account? Sign in
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  )
}

export {PopupLogin as LoginRegister}
