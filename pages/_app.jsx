import '../app/globals.css'
import '../app/bootstrap.scss'

function Root({ Component, pageProps }) {
  return <Component  { ...pageProps }/>
}

export default Root