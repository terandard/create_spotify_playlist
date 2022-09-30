import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Layout from '../components/layout';
import Custom401 from './401';
import Custom403 from './403';
import Error from './_error';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) => url !== router.asPath && setIsLoading(true)
    const handleComplete = () => setIsLoading(false)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  })

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
    <Layout isLoading={isLoading}>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
