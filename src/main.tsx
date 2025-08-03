import { StyledEngineProvider } from '@mui/material/styles'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// biome-ignore lint/style/noNonNullAssertion: The root element is guaranteed to exist in index.html
ReactDOM.createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </React.StrictMode>,
)
