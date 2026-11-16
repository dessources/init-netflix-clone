import {NetflixAppBar} from 'components/NetflixAppBar'
import {useNavigate} from 'react-router-dom'

function ErrorFallback({error, resetErrorBoundary}) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/')
    resetErrorBoundary()
  }
  return (
    <div>
      <NetflixAppBar />
      <div
        role="alert"
        style={{
          height: '100%',
          textAlign: 'center',
          margin: '100px 300px',
          color: '#fff',
        }}
      >
        <h1 style={{fontSize: '2.5em'}}>Lost your way?</h1>
        <pre style={{color: 'red', fontSize: '1em'}}>
          Error: {error.message}
        </pre>

        <div className="banner__buttons">
          <button
            className="banner__button banner__buttonplay"
            onClick={handleClick}
          >
            Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default ErrorFallback
