import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Layout from '../components/layout';
import Custom401 from './401';
import Custom403 from './403';
import Error from './_error';

function MyApp({ Component, pageProps }: AppProps) {
  if (pageProps.error) {
    switch(pageProps.error.statusCode) {
      case 401:
        return <Custom401 />
      case 403:
        return <Custom403 />
      default:
        return <Error statusCode={pageProps.error.statusCode}/>
    }
  }
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
