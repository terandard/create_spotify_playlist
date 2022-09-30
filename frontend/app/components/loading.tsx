import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

type Props = {
    isLoading: boolean
}

const Loading = ({isLoading}: Props) => {

    if (isLoading) {
        return (
            <Box sx={{
                width: '100vw',
                height: '100vh',
                position: 'fixed',
                top: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                'z-index': 1000,
            }}>
                <Box sx={{
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <CircularProgress style={{'color': '#1ed760'}} />
                </Box>
            </Box>
        )
    } else return <></>

}

export default Loading;