import Sidebar from '../components/sidenav'
import '../styles/globals.css'
import styles from '../styles/Home.module.css'
function MyApp({ Component, pageProps }) {
  
  return (
    <div className="row">
      <div className="col-md-3">
        <Sidebar {...pageProps} />
      </div>
      <div>
      <Component {...pageProps} />
      </div>
    </div>
  )
}
export default MyApp