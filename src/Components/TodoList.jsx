import Todo from './Todo'
import {db} from '../Storage'
import {useLiveQuery} from 'dexie-react-hooks'

const TodoList = () => {
  const allTodos = useLiveQuery(
    () => db.todos.reverse().toArray()
  )
  if (!allTodos) return null
  const activeTodos = allTodos.filter(todo => !todo.completed && !todo.archived)
  return (
    <>
      {
        activeTodos.map(todo => (
          <Todo key={todo.id} todo={todo} id={todo.id} />
        ))
      }
    </>
  )
}

export default TodoList
