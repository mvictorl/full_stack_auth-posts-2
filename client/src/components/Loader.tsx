import { Backdrop, CircularProgress } from '@mui/material'

export const Loader = () => {
	return (
		<Backdrop open>
			<CircularProgress size="10rem" />
		</Backdrop>
	)
}
