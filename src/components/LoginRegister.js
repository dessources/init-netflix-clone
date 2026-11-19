/* ============================================================
   FILE 3: SIGN IN & SIGN UP FORM (src/components/LoginRegister.js)
   
   In this file, we connect our login and registration form inputs
   to Supabase Authentication using useState and async/await.
   
   Follow the steps below in order from top to bottom.
   ============================================================ */

import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Checkbox,
  FormGroup,
  FormControlLabel,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { supabase } from "../utils/supabaseClient";

function LoginRegister({ open, handleClose, signup = false }) {
  /* ------------------------------------------------------------
     STEP 1: FORM & AUTH STATE (useState)
     Declare state variables to track what the user types and the
     current status of the form:
       - create: initialized to signup (false = Sign In, true = Sign Up)
       - email: initialized to ''
       - password: initialized to ''
       - checked: initialized to false ("Remember me" checkbox)
       - isSubmitting: initialized to false (loading spinner state)
       - error: initialized to null (holds any Supabase error)
     
     Also create a helper constant:
       const label = create ? 'Sign Up' : 'Sign In'
     ------------------------------------------------------------ */

  const [create, setCreate] = useState(signup);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const label = create ? "Sign Up" : "Sign In";

  /* ------------------------------------------------------------
     STEP 2: SUBMIT HANDLER (CALLING SUPABASE AUTH)
     Write an async function named handleSubmit(e):
       1. Call e.preventDefault() so the browser doesn't reload the page.
       2. If !email || !password, return early.
       3. Call setIsSubmitting(true) and setError(null).
       4. If "create" is true (Sign Up mode):
            await supabase.auth.signUp({ email, password })
          Otherwise (Sign In mode):
            await supabase.auth.signInWithPassword({ email, password })
       5. If Supabase returns an { error }, pass it to setError(error).
       6. Call setIsSubmitting(false).
     ------------------------------------------------------------ */

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsSubmitting(true);
    setError(null);

    const { error: authError } = create
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      console.log(authError);
      setError(authError);
    }
    setIsSubmitting(false);
  };

  /* ------------------------------------------------------------
     STEP 3: SWITCHING BETWEEN SIGN IN & SIGN UP
     Write two helper functions:
       - handleSignUp(): clears error (setError(null)) and sets create to true
       - handleSignIn(): clears error (setError(null)) and sets create to false
     ------------------------------------------------------------ */

  const handleSignUp = () => {
    setError(null);
    setCreate(true);
  };

  const handleSignIn = () => {
    setError(null);
    setCreate(false);
  };

  return (
    <Dialog
      PaperProps={{ sx: { opacity: 0.95 } }}
      style={{ backgroundColor: "transparent" }}
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
            display: "flex",
            flexDirection: "column",
            minWidth: "330px",
            "& > *": { m: 1 },
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
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="password"
            type="password"
            label="Password"
            variant="filled"
            color="secondary"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            style={{ margin: "20px 0 5px 0" }}
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
                  <Typography component="span" style={{ fontSize: "0.8rem" }}>
                    Remember me
                  </Typography>
                }
              />
            </FormGroup>
          )}
        </Box>

        {error ? (
          <Alert severity="error" sx={{ mt: 2 }}>
            Error: {error.message || "Authentication failed"}
          </Alert>
        ) : null}
      </DialogContent>

      <DialogActions style={{ justifyContent: "flex-start" }}>
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
  );
}

export { LoginRegister };
