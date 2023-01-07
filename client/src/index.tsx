import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"

import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import store from "./appstore/store"
import App from "./App"
import "./index.css"
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material"

const theme = createTheme()

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>
)
