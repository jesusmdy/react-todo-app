import {
  Grid,
  Box,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles(theme => ({
  header: {
    backgroundImage: `url('/gradient.jpg')`,
    height: '35vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    color: '#ffffff',
  },
  text: {
    padding: theme.spacing(10, 2)
  }
}))
const Header = () => {
  const classes = useStyles()
  const hours = [
    [0, 4, "Good Night"],
    [5, 11, "Good Morning"],
    [12, 17, "Good Afternoon"],
    [18, 24, "Good Night"]
  ]
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October', 'November', 'December']
  const formatGreet = () => {
    const hour = new Date().getHours()
    for(var i = 0; i < hours.length; i++) {
      if (hour >= hours[i][0] && hour <= hours[i][1]) {
        return hours[i][2]
      }
    }
  }
  const formatDate = () => {
    const date = new Date()
    return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`
  } 
  return (
    <Box className={classes.header}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={12} md={5} lg={5} xl={5} className={classes.text}>
          <Typography variant="h3">{formatGreet()}</Typography>
          <Typography variant="h5">{formatDate()}</Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Header
