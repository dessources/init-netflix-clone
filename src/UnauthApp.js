/* ============================================================
   FILE 1: UNAUTHENTICATED LANDING PAGE (src/UnauthApp.js)
   
   Welcome to the Authentication & APIs Workshop!
   
   In this first file, we build a complete React component from
   scratch so our Netflix landing page and Sign In / Sign Up
   dialog appear on the screen.
   
   Follow the steps below in order from top to bottom.
   ============================================================ */

/* ------------------------------------------------------------
   STEP 1: IMPORTS
   Import React and the pre-styled { LoginRegister } dialog
   component from './components/LoginRegister'.
   ------------------------------------------------------------ */

// TODO: Import React and { LoginRegister }

/* ------------------------------------------------------------
   STEP 2: THE COMPONENT FUNCTION & JSX
   A React component is a JavaScript function that returns JSX
   (HTML-like syntax).
   
   Replace the placeholder function below so UnauthApp() returns:
     1. A wrapper <div className="unauth-page">
     2. Inside it, the Netflix logo:
        <img src="/images/netflix-logo.png" alt="Netflix" className="unauth-logo" />
     3. Underneath the logo, the login dialog with the "open" prop set to true:
        <LoginRegister open={true} />
   ------------------------------------------------------------ */

// TODO: Replace this placeholder with your UnauthApp component JSX
function UnauthApp() {
  return null;
}

/* ------------------------------------------------------------
   STEP 3: EXPORT THE COMPONENT
   Export UnauthApp as the default export so src/App.js can
   render it whenever no user is logged in.
   ------------------------------------------------------------ */

export default UnauthApp;
