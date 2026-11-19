/* ============================================================
   FILE 3: SIGN IN & SIGN UP FORM (src/components/LoginRegister.js)
   
   In this file, we connect our login and registration form inputs
   to Supabase Authentication using useState and async/await.
   
   Follow the steps below in order from top to bottom.
   ============================================================ */

import React, {useState} from 'react'
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  Checkbox, FormGroup, FormControlLabel, TextField, Typography, Alert, CircularProgress,
} from '@mui/material'
import {supabase} from '../utils/supabaseClient'

function LoginRegister({open, handleClose, signup = false}) {
  /* ------------------------------------------------------------
     STEP 1: FORM & AUTH STATE (useState)
     Replace the placeholder values below with real useState hooks:
       - create: useState(signup) (false = Sign In, true = Sign Up)
       - email: useState('')
       - password: useState('')
       - checked: useState(false) ("Remember me" checkbox)
       - isSubmitting: useState(false) (loading spinner state)
       - error: useState(null) (holds any Supabase error)
     
     Also keep the helper constant:
       const label = create ? 'Sign Up' : 'Sign In'
     ------------------------------------------------------------ */

  // TODO: Replace these placeholders with useState(...)
  const [create, setCreate] = [signup, () => {}]
  const [email, setEmail] = ['', () => {}]
  const [password, setPassword] = ['', () => {}]
  const [checked, setChecked] = [false, () => {}]
  const [isSubmitting, setIsSubmitting] = [false, () => {}]
  const [error, setError] = [null, () => {}]
  const label = create ? 'Sign Up' : 'Sign In'

  /* ------------------------------------------------------------
     STEP 2: SUBMIT HANDLER (CALLING SUPABASE AUTH)
     Update handleSubmit(e) to be an async function that:
       1. Calls e.preventDefault() so the browser doesn't reload.
       2. If !email || !password, returns early.
       3. Calls setIsSubmitting(true) and setError(null).
       4. If "create" is true (Sign Up mode):
            await supabase.auth.signUp({ email, password })
          Otherwise (Sign In mode):
            await supabase.auth.signInWithPassword({ email, password })
       5. If Supabase returns an { error }, passes it to setError(error).
       6. Calls setIsSubmitting(false).
     ------------------------------------------------------------ */

  // TODO: Implement async handleSubmit(e) with Supabase Auth
  const handleSubmit = e => {
    e.preventDefault()
  }

  /* ------------------------------------------------------------
     STEP 3: SWITCHING BETWEEN SIGN IN & SIGN UP
     Fill in these two helper functions:
       - handleSignUp(): clears error (setError(null)) and sets create to true
       - handleSignIn(): clears error (setError(null)) and sets create to false
     ------------------------------------------------------------ */

  // TODO: Implement handleSignUp and handleSignIn
  const handleSignUp = () => {}
  const handleSignIn = () => {}

  return (
    <Dialog
      PaperProps={{sx: {opacity: 0.95}}}
      style={{backgroundColor: 'transparent'}}
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
    >
      <DialogTitle id="alert-dialog-title">{label}</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minWidth: '330px',
            '& > *': {m: 1},
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="email"
            type="email"
            label="Email"
            variant="filled"
            color="secondary"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
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

          <Button
            style={{margin: '20px 0 5px 0'}}
            variant="contained"
            color="secondary"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              label
            )}
          </Button>

          {create ? (
            <>
              <small>* Terms and conditions apply</small>
              <small>This page is protected by Google reCAPTCHA</small>
            </>
          ) : (
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
                  <Typography component="span" style={{fontSize: '0.8rem'}}>
                    Remember me
                  </Typography>
                }
              />
            </FormGroup>
          )}
        </Box>

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
  )
}

export {LoginRegister}
