import store from 'app/store'
import 'bootstrap/dist/css/bootstrap.min.css'
import type { AppProps } from 'next/app'
import SSRProvider from 'react-bootstrap/SSRProvider'
import { Provider } from 'react-redux'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { theme } from 'theme'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Roboto-Regular';
    font-style: normal;
    font-display: block;
    src: url('/fonts/Roboto-Regular.ttf') format('truetype');
  }

  @font-face {
    font-family: 'Roboto-Bold';
    font-style: normal;
    font-display: block;
    src: url('/fonts/Roboto-Bold.ttf') format('truetype');
  }

  body {
    font-family: "Roboto-Regular", sans-serif;
    font-weight: 400;
    margin: 0;
  }

  p {
    margin: 0;
  }
`

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SSRProvider>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </SSRProvider>
  )
}
