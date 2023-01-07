import { Typography } from "@mui/material"

export function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © 2023"}
    </Typography>
  )
}
