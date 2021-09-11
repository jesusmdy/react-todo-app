import {Card, CardContent, Button} from '@material-ui/core'
import GitHub from '@material-ui/icons/GitHub'
import {makeStyles} from '@material-ui/core/styles'
const useStyles = makeStyles(theme => ({
  card: {
    border: 'none',
    background: 'none',
    padding: theme.spacing(2, 4),
    display: 'flex',
    justifyContent: 'center'
  }
}))
export default function Info() {
  const classes = useStyles()
  return (
    <Card variant="outlined" className={classes.card}>
      <CardContent>
        <Button
          href="https://github.com/jesusmdy/react-todo-app"
          size="large"
          color="secondary"
          startIcon={<GitHub />}
        >
          Edit on github
        </Button>
      </CardContent>
    </Card>
  )
}
