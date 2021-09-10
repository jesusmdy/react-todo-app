import Dexie from 'dexie'
const dbName = 'To-Do'

export const db = new Dexie(dbName)

db.version(1.2).stores(
  { todos: '++id, title, description, completed, archived, important, dueDate, date' }
)

export async function addTodo({ title, description, important, dueDate }) {
  await db.todos.add({
    title: title,
    description: description,
    completed: false,
    important: important,
    dueDate: dueDate,
    date: new Date()
  })
}

export async function markAsCompleted(id, status) {
  await db.todos.update(id, {completed: status})
}

export async function archiveItem(id, archive) {
  await db.todos.update(id, {archived: archive})
}

export async function deleteItem(id) {
  await db.todos.delete(id)
}
