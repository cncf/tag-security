import Sidebar from '../components/sidenav'
import '../styles/globals.css'
import styles from '../styles/Home.module.css'
function MyApp({ Component, pageProps }) {
  
  return (
    <div class="container">
      <div className="row">
        <div className="col-sm">
          <Sidebar {...pageProps} />
        </div>
        <div className="col-xxl">
        <Component {...pageProps} />
        </div>
      </div>
    </div>
  )
}
export default MyApp
