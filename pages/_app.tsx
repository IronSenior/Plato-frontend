import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider as NextAuthProvider } from 'next-auth/client';
import { ChakraProvider } from "@chakra-ui/react"
import { extendTheme } from "@chakra-ui/react"

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
}
// 3. extend the theme
const theme = extendTheme({ config })

// Use the <Provider> to improve performance and allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App ({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <NextAuthProvider session={pageProps.session} >
        <Component {...pageProps} />
      </NextAuthProvider>
    </ChakraProvider>
  )
}
