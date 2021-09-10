import {Container, Typography} from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from '@material-ui/core/styles'

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
    padding: 0
  }
}))

export default function SignIn() {
  const classes = useStyles()
  return (
    <Container maxWidth="sm" className={classes.container}>
      <CssBaseline />
      <Header />
      <Composer />
      <TodoList />
      <CompletedTodos />
      <ArchivedTodos />
    </Container>
  )
}