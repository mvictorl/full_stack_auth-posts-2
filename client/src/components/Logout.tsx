import { useDispatch } from "react-redux"
import { logout } from "../appstore/authSlice"
import { AppDispatch } from "../appstore/store"

const Logout = () => {
  const dispatch: AppDispatch = useDispatch()

  const logoutHandler = (e: React.SyntheticEvent) => {
    e.preventDefault()
    dispatch(logout())
  }

  return (
    <>
      <h1>Logout</h1>
      <button onClick={logoutHandler}>Logout</button>
    </>
  )
}

export default Logout
