import {Paper, Grid} from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import {makeStyles} from '@material-ui/core/styles'

import Header from './Components/Header.jsx'
import Composer from './Components/Composer.jsx'
import TodoList from './Components/TodoList.jsx'
import ArchivedTodos from './Components/ArchivedTodos.jsx'
import CompletedTodos from './Components/CompletedTodos.jsx'

const useStyles = makeStyles((theme) => ({
  padding: {
    padding: theme.spacing(2)
  },
  container: {
    padding: theme.spacing(0, 2),
    marginBottom: theme.spacing(5)
  },
  paper: {
    marginTop: theme.spacing(-7)
  }
}))

export default function SignIn() {
  const classes = useStyles()
  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container justifyContent="center">
        <Grid xs={12} sm={12} md={5} lg={5} xl={5} className={classes.container}>
          <Paper className={classes.paper} elevation={15}>
            <Composer />
            <TodoList />
            <CompletedTodos />
            <ArchivedTodos />
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}