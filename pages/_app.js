import 'tailwindcss/tailwind.css'
import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'
import 'swiper/components/pagination/pagination.scss'
import Layout from '../components/Layout'
import ShopProvider from '../context/shopContext'
import { useRouter } from 'next/router'
import Nav from '../components/Nav'
import NavAdmin from '../components/admin/Nav'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const { client } = pageProps
  
  return (
    <ShopProvider>
      <Layout>
        {client ? <Nav /> : <NavAdmin />}
        <Component {...pageProps} key={router.asPath} />
      </Layout>
    </ShopProvider>
  )
}

export default MyApp
