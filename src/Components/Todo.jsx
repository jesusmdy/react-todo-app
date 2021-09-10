import {useState, useEffect} from 'react'

// List
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction
} from '@material-ui/core'
import {
  Card,
  CardActions,
  CardContent
} from '@material-ui/core'

// Pieces
import {
  ClickAwayListener,
  Divider,
  Chip,
  Checkbox,
  IconButton
} from '@material-ui/core'

// Icons
import Event from '@material-ui/icons/Event'
import ExpandMore from '@material-ui/icons/ExpandMore'
import ExpandLess from '@material-ui/icons/ExpandLess'
import DeleteIcon from '@material-ui/icons/Delete'
import ArchiveIcon from '@material-ui/icons/Archive'
import UnarchiveIcon from '@material-ui/icons/Unarchive'
import NewReleasesIcon from '@material-ui/icons/NewReleases'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'


// Utils
import {markAsCompleted, archiveItem, deleteItem} from '../Storage'
import {makeStyles} from '@material-ui/core/styles'
import {lightGreen} from '@material-ui/core/colors'
import {Typography} from '@material-ui/core'
import {formatDistance} from 'date-fns'
import clsx from 'clsx'


const useStyles = makeStyles(theme => ({
  card: {
    border: 'none',
    borderRadius: 0,
    listStyle: 'none'
  },
  completed: {
    background: lightGreen[100],
    textDecoration: 'line-through'
  },
  archived: {
    background: '#f5f5f5',
    color: '#777'
  },
  item: {
    listStyle: 'none'
  },
  chip: {
    borderRadius: 3,
    fontSize: '.7rem',
    marginRight: theme.spacing(.5)
  },
  actions: {
    justifyContent: 'flex-end'
  },
  tinyIcon: {
    fontSize: '1rem',
    margin: theme.spacing(0, .3)
  },
  description: {
    display: 'flex',
    alignItems: 'center',
    lineHeight: 1.5
  },
  rawDescription: {
    fontFamily: 'inherit',
    fontSize: 'inherit',
    color: 'inherit',
    fontWeight: 'inherit'
  }
}))

const Todo = ({todo}) => {
  const classes = useStyles()
  const {id, title, description, completed, important, archived, dueDate} = todo
  const [checked, setChecked] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    setChecked(completed)
  }, [completed])

  const handleClick = () => {
    markAsCompleted(id, !completed)
  }
  const toggleArchived = () => {
    archiveItem(id, !archived)
  }
  const removeItem = () => {
    deleteItem(id)
  }
  const toggleExpanded = () => {
    setExpanded(!expanded)
  }
  const handleClickAway = () => {
    setExpanded(false)
  }
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Card
        className={
          clsx(
            classes.card,
            completed && classes.completed,
            archived && classes.archived
          )
        }
        variant="outlined"
      >
        <ListItem className={classes.item}>
          <ListItemIcon>
            <Checkbox
              disabled={archived}
              onClick={handleClick}
              checked={checked}
              onChange={handleClick}
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<CheckCircleIcon />}
            />
          </ListItemIcon>
          <ListItemText
            primary={title}
            onClick={toggleExpanded}
            secondary={
              <>
                <Typography component="span" variant="subtitle2" className={classes.description}>
                  {
                    !expanded &&
                    <Typography noWrap component="i" variant="subtitle2">
                      {description}
                    </Typography>
                  }
                  {
                    important &&
                    <NewReleasesIcon className={classes.tinyIcon} />
                  }
                  {
                    dueDate &&
                    <Event className={classes.tinyIcon} />
                  }
                </Typography>
              </>
            }
          />
          <ListItemSecondaryAction>
            <Checkbox
              checked={expanded}
              onClick={toggleExpanded}
              icon={<ExpandMore />}
              checkedIcon={<ExpandLess />}
            />
          </ListItemSecondaryAction>
        </ListItem>
        {
          expanded &&
          <CardContent>
            <Typography component="pre" variant="subtitle2">{description}</Typography>
          </CardContent>
        }
        {
          expanded &&
          <CardActions className={classes.actions}>
            {
              dueDate &&
              <Chip
                size="small"
                color="primary"
                variant="outlined"
                className={classes.chip}
                icon={<Event />}
                label={formatDistance(dueDate, new Date(), { addSuffix: true })}
              />
            }
            {
              important &&
              <Chip
                size="small"
                variant="outlined"
                className={classes.chip}
                color="secondary"
                icon={<NewReleasesIcon />}
                label="Important"
              />
            }
            {
              !completed &&
              <IconButton size="small" color={archived ? 'primary' : 'inherit'} onClick={toggleArchived}>
                {
                  archived
                  ? <UnarchiveIcon />
                  : <ArchiveIcon />
                }
              </IconButton>
            }
            <IconButton size="small" onClick={removeItem}>
              <DeleteIcon />
            </IconButton>
          </CardActions>
        }
        <Divider />
      </Card>
    </ClickAwayListener>
  )
}

export default Todo
