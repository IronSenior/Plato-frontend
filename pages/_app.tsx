import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider as NextAuthProvider } from 'next-auth/client';
import { ChakraProvider } from "@chakra-ui/react"


// Use the <Provider> to improve performance and allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App ({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <NextAuthProvider session={pageProps.session} >
        <Component {...pageProps} />
      </NextAuthProvider>
    </ChakraProvider>
  )
}
