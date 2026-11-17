import React from 'react'
import {LoginRegister} from './components/LoginRegister'

function UnauthApp() {
  return (
    <div className="unauth-page">
      <img
        src="/images/netflix-logo.png"
        alt="Netflix"
        className="unauth-logo"
      />
      <LoginRegister open={true} />
    </div>
  )
}

export default UnauthApp
