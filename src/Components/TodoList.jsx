import Todo from './Todo'
import {db} from '../Storage'
import EmptyTodos from './EmptyTodos'
import {useLiveQuery} from 'dexie-react-hooks'

const TodoList = () => {
  const allTodos = useLiveQuery(
    () => db.todos.reverse().toArray()
  )
  let activeTodos
  if (allTodos) activeTodos = allTodos.filter(todo => !todo.completed && !todo.archived)
  if (!allTodos || !activeTodos.length) return <EmptyTodos />
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
