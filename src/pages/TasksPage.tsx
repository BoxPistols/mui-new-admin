import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2'
import Paper from '@mui/material/Paper'
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress'
import Chip from '@mui/material/Chip'

export default function TasksPage() {
  const tasks = [
    { id: 1, title: 'Update user dashboard', completed: true, priority: 'High' },
    { id: 2, title: 'Fix navigation bug', completed: false, priority: 'Critical' },
    { id: 3, title: 'Review pull requests', completed: false, priority: 'Medium' },
    { id: 4, title: 'Write documentation', completed: false, priority: 'Low' },
    { id: 5, title: 'Implement new feature', completed: false, priority: 'High' },
  ]

  const completedTasks = tasks.filter((task) => task.completed).length
  const progress = (completedTasks / tasks.length) * 100

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return 'error'
      case 'High':
        return 'warning'
      case 'Medium':
        return 'info'
      case 'Low':
        return 'default'
      default:
        return 'default'
    }
  }

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Tasks
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Task Progress
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Typography variant="h4">{completedTasks}</Typography>
                <Typography variant="body2" color="text.secondary">
                  / {tasks.length} tasks
                </Typography>
              </Box>
              <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 4 }} />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {progress.toFixed(0)}% Complete
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper>
            <List>
              {tasks.map((task) => (
                <ListItem
                  key={task.id}
                  secondaryAction={
                    <>
                      <Chip
                        label={task.priority}
                        color={getPriorityColor(task.priority)}
                        size="small"
                        sx={{ mr: 1 }}
                      />
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </>
                  }
                  sx={{
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    '&:last-child': { borderBottom: 'none' },
                  }}
                >
                  <ListItemIcon>
                    <Checkbox edge="start" checked={task.completed} tabIndex={-1} disableRipple />
                  </ListItemIcon>
                  <ListItemText
                    primary={task.title}
                    sx={{
                      textDecoration: task.completed ? 'line-through' : 'none',
                      color: task.completed ? 'text.secondary' : 'text.primary',
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <AssignmentRoundedIcon sx={{ fontSize: 48, color: 'primary.main' }} />
            <Box>
              <Typography variant="h6">Task Management</Typography>
              <Typography variant="body2" color="text.secondary">
                Organize and track your tasks efficiently
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
