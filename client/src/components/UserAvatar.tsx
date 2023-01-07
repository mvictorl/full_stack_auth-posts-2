import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  Avatar,
  Box,
  Divider,
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material"
import { Input as InputIcon } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { authState, logout } from "../appstore/authSlice"
import { AppDispatch } from "../appstore/store"
import { name2letters } from "../helpers/name2letters"

export const UserAvatar = () => {
  const { currentUser } = useSelector(authState)
  const dispatch: AppDispatch = useDispatch()

  const { pathname } = useLocation()

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleSignOut = () => {
    setAnchorElUser(null)
    dispatch(logout())
  }

  if (currentUser.name) {
    return (
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg">
              {name2letters(currentUser.name)}
            </Avatar>
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography textAlign="center">Account</Typography>
          </MenuItem>
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography textAlign="center">Profile</Typography>
          </MenuItem>
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography textAlign="center">Dashboard</Typography>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleSignOut}>
            <Typography textAlign="center">Logout</Typography>
          </MenuItem>
        </Menu>
      </Box>
    )
  } else {
    return (
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Sign In">
          <IconButton
            to="/login"
            state={{ from: pathname }}
            size="large"
            component={Link}
          >
            <InputIcon sx={{ fontSize: "inherit", color: "white" }} />
          </IconButton>
        </Tooltip>
      </Box>
    )
  }
}
