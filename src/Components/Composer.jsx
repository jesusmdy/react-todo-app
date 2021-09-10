import {Divider, Card, Chip, CardActions, CardContent, CardHeader} from '@material-ui/core'
import {Avatar, Paper, IconButton, Button, Typography, Snackbar} from '@material-ui/core'
import {FormControl, TextField, Checkbox} from '@material-ui/core'

import DateFnsUtils from '@date-io/date-fns'
import {formatDistance, subDays} from 'date-fns'
import {DateTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers'

import Add from '@material-ui/icons/Add'
import Event from '@material-ui/icons/Event'
import Error from '@material-ui/icons/Error'
import ErrorOutline from '@material-ui/icons/ErrorOutline'
import Edit from '@material-ui/icons/Edit'

import {makeStyles} from '@material-ui/core/styles'

import {useEffect, useState} from  'react'

import {addTodo} from '../Storage'
import useTimeAgo from '../Hooks/useTimeAgo'

const useStyles = makeStyles(theme => ({
  card: {
    border: 'none'
  },
  action: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  actionsButtons: {
    boxShadow: 'none'
  },
  button: {
    borderRadius: 6
  },
  margin: {
    margin: theme.spacing(0.5, 0)
  },
  chip: {
    margin: theme.spacing(0.5)
  },
  title: {
    marginBottom: theme.spacing(1)
  }
}))
const Composer = () => {
  const [open, setOpen] = useState(false)
  const [isPickerShown, setPickerShown] = useState(false)
  const [openEditor, setOpenEditor] = useState(false)
  const [isImportant, setImportant] = useState(false)
  const [selectedDate, handleDateChange] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const classes = useStyles()
  const handleDescription = e =>  {
    const {value} = e.target
    setDescription(value)
  }
  const handleTitle = e =>  {
    const {value} = e.target
    setTitle(value)
  }
  const saveTodo = () => {
    if (!title) return
    const item = {
      title: title,
      description: description,
      important: isImportant,
      dueDate: selectedDate
    }
    addTodo(item)
    .then(clearFields())
  }
  const clearFields = () => {
    setTitle('')
    setDescription('')
    handleDateChange(null)
    setImportant(false)
    setPickerShown(false)
    setOpenEditor(false)
    handleSnackbar()
  }
  const handleSnackbar = () => {
    setOpen(true)
  }
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return
    setOpen(false)
  }
  const toggleEditor = () => {
    setOpenEditor(!openEditor)
  }
  const clearDueDate = () => handleDateChange(null)
  const clearImportant = () => setImportant(false)
  const hidePicker = () => setPickerShown(false)
  const togglePicker = () => setPickerShown(!isPickerShown)
  const toggleImportant = () => setImportant(!isImportant)
  return (
    <Card variant="outlined" className={classes.card}>
      <CardContent>
        <Typography element="h4" variant="h6" className={classes.title}>
          Enter a new task
        </Typography>
        <FormControl fullWidth className={classes.margin}>
          <TextField
            size="small"
            label="Task title"
            variant="outlined"
            placeholder="Buy new fruits"
            value={title}
            onChange={handleTitle}
          />
        </FormControl>
        {
          openEditor &&
          <FormControl fullWidth className={classes.margin}>
            <TextField
              label="Decription"
              multiline
              variant="outlined"
              placeholder="Apples, Mangos and Bananas"
              rows={2}
              onChange={handleDescription}
              value={description}
            />
          </FormControl>
        }
        {
          isPickerShown &&
          <MuiPickersUtilsProvider utils={DateFnsUtils} className={classes.margin}>
            <DateTimePicker
              onClose={hidePicker}
              fullWidth
              value={selectedDate}
              onChange={handleDateChange}
              placeholder="Select a due date"
              label="Due date"
              inputVariant="outlined"
              disablePast
              variant="inline"
              classList={classes.pickerField}
              clearable
            />
          </MuiPickersUtilsProvider>
        }
        <Paper className={classes.margin} elevation={0}>
          {
            selectedDate &&
            <Chip
              icon={<Event />}
              className={classes.chip}
              onDelete={clearDueDate}
              label={formatDistance(selectedDate, new Date(), { addSuffix: true })}
            />
          }
          {
            isImportant &&
            <Chip
              label="Important"
              color="secondary"
              onDelete={clearImportant}
            />
          }
        </Paper>
      </CardContent>
      {
        title &&
        <CardActions className={classes.action}>
          <Paper className={classes.actionsButtons}>
            <IconButton
              color={isPickerShown ? 'primary' : '' || selectedDate ? 'primary' : ''}
              onClick={togglePicker}
            >
              <Event />
            </IconButton>
            <IconButton
              color={openEditor ? 'primary' : '' || description ? 'primary' : ''}
              onClick={toggleEditor}
              variant={openEditor ? 'contained' : ''}
            ><Edit /></IconButton>
            <Checkbox
              icon={<ErrorOutline />}
              checkedIcon={<Error />}
              checked={isImportant}
              onChange={toggleImportant}
            />
          </Paper>
          <Button
            className={classes.button}
            color="primary"
            disabled={!title}
            onClick={saveTodo}
          >Save</Button>
        </CardActions>
      }
      <Snackbar open={open} onClose={handleCloseSnackbar} autoHideDuration={3000} message="Task created!" severity="success" />
      <Divider />
    </Card>
  )
}

export default Composer
