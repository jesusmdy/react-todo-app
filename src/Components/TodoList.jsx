import {Paper, Typography} from '@material-ui/core'

import {makeStyles} from '@material-ui/core/styles'
import Todo from './Todo'
import {db} from '../Storage'
import {useLiveQuery} from 'dexie-react-hooks'

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(2, 0)
  },
  paper: {
    border: 'none',
    margin: 0
  }
}))

const TodoList = () => {
  const classes = useStyles()
  const allTodos = useLiveQuery(
    () => db.todos.reverse().toArray()
  )
  if (!allTodos) return null
  const activeTodos = allTodos.filter(todo => !todo.completed && !todo.archived)
  return (
    <>
      {
        activeTodos.map(todo => (
          <Todo todo={todo} id={todo.id} />
        ))
      }
    </>
  )
}

export default TodoList
