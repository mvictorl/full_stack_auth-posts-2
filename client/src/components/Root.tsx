import { Outlet } from "react-router-dom"
import { TopPanel } from "./TopPanel"
import { Box, Container } from "@mui/material"

export const Root = () => {
  return (
    <Box id="root">
      <TopPanel />
      <Container>
        <Outlet />
      </Container>
    </Box>
  )
}
