import {
  Chip,
  Paper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@material-ui/core'
import ExpandMore from '@material-ui/icons/ExpandMore'
import {makeStyles} from '@material-ui/core/styles'
import Todo from './Todo'
import {db} from '../Storage'
import {useLiveQuery} from 'dexie-react-hooks'
import {useState} from 'react'

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(2, 0)
  },
  paper: {
    margin: theme.spacing(2, 0)
  },
  details: {
    padding: 0
  },
  inner: {
    width: '100%',
    padding: theme.spacing(0),
    boxShadow: 'none'
  },
  accordion: {
    border: 'none'
  }
}))

const CompletedTodos = () => {
  const classes = useStyles()

  const [expanded, setExpanded] = useState(false)

  const allTodos = useLiveQuery(() => db.todos.reverse().toArray())
  if (!allTodos) return null

  const completedTodos = allTodos.filter(todo => todo.completed)
  if (!completedTodos.length) return null

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }
  return (
    <Accordion expanded={expanded} variant="outlined" className={classes.accordion}>
      <AccordionSummary
        onClick={toggleExpanded}
        expandIcon={<ExpandMore />}
      >
        <Typography variant="h6">
          Completed items <Chip label={completedTodos.length} />
        </Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.details}>
        <Paper className={classes.inner}>
          {
            completedTodos.map(todo => (
              <Todo key={todo.id} todo={todo} id={todo.id} />
            ))
          }
        </Paper>
      </AccordionDetails>
    </Accordion>
  )
}

export default CompletedTodos
