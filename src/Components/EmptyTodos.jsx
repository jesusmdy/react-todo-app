import {Paper, Typography, Avatar} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import ListAlt from '@material-ui/icons/ListAlt'
const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(4),
    textAlign: 'center'
  },
  icon: {
    margin: 'auto',
    marginBottom: theme.spacing(2),
    background: theme.palette.secondary.light
  }
}))
const EmptyTodos = () => {
  const classes = useStyles()
  return (
    <Paper className={classes.paper}>
      <Avatar className={classes.icon}>
        <ListAlt />
      </Avatar>
      <Typography variant="h6">
        There's no To-Do tasks
      </Typography>
      <Typography variant="subtitle">
        Create a new one and will be saved locally.
      </Typography>
    </Paper>
  )
}

export default EmptyTodos
