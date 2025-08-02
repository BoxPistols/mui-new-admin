import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import LinearProgress from '@mui/material/LinearProgress'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import Checkbox from '@mui/material/Checkbox'
import Divider from '@mui/material/Divider'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddTaskIcon from '@mui/icons-material/AddTask'
import AssignmentIcon from '@mui/icons-material/Assignment'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import PersonIcon from '@mui/icons-material/Person'
import CustomizedTreeView from '../components/CustomizedTreeView'

interface Task {
  id: number
  title: string
  description: string
  status: 'Todo' | 'In Progress' | 'Review' | 'Completed'
  priority: 'Low' | 'Medium' | 'High' | 'Critical'
  assignee: string
  dueDate: string
  createdDate: string
  tags: string[]
  progress: number
  estimatedHours: number
  actualHours: number
}

const mockTasks: Task[] = [
  {
    id: 1,
    title: 'Implement user authentication',
    description: 'Add login and registration functionality with JWT tokens',
    status: 'In Progress',
    priority: 'High',
    assignee: 'John Doe',
    dueDate: '2024-02-15',
    createdDate: '2024-01-20',
    tags: ['frontend', 'backend', 'security'],
    progress: 65,
    estimatedHours: 16,
    actualHours: 12
  },
  {
    id: 2,
    title: 'Design payment gateway integration',
    description: 'Research and implement Stripe payment processing',
    status: 'Todo',
    priority: 'Medium',
    assignee: 'Sarah Smith',
    dueDate: '2024-02-20',
    createdDate: '2024-01-18',
    tags: ['payment', 'api', 'integration'],
    progress: 0,
    estimatedHours: 24,
    actualHours: 0
  },
  {
    id: 3,
    title: 'Fix mobile responsive issues',
    description: 'Resolve layout problems on tablets and mobile devices',
    status: 'Review',
    priority: 'Medium',
    assignee: 'Mike Johnson',
    dueDate: '2024-02-10',
    createdDate: '2024-01-25',
    tags: ['frontend', 'css', 'responsive'],
    progress: 90,
    estimatedHours: 8,
    actualHours: 7
  },
  {
    id: 4,
    title: 'Database optimization',
    description: 'Optimize slow queries and add proper indexing',
    status: 'Completed',
    priority: 'High',
    assignee: 'Emma Wilson',
    dueDate: '2024-01-30',
    createdDate: '2024-01-15',
    tags: ['database', 'performance', 'backend'],
    progress: 100,
    estimatedHours: 12,
    actualHours: 10
  },
  {
    id: 5,
    title: 'Security audit and penetration testing',
    description: 'Comprehensive security review of the application',
    status: 'Todo',
    priority: 'Critical',
    assignee: 'Alex Brown',
    dueDate: '2024-02-25',
    createdDate: '2024-01-22',
    tags: ['security', 'testing', 'audit'],
    progress: 0,
    estimatedHours: 32,
    actualHours: 0
  }
]

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(mockTasks)
  const [currentTab, setCurrentTab] = useState(0)
  const [openDialog, setOpenDialog] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [priorityFilter, setPriorityFilter] = useState<string>('All')

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue)
  }

  const filterTasks = () => {
    let filtered = tasks
    
    if (statusFilter !== 'All') {
      filtered = filtered.filter(task => task.status === statusFilter)
    }
    
    if (priorityFilter !== 'All') {
      filtered = filtered.filter(task => task.priority === priorityFilter)
    }
    
    setFilteredTasks(filtered)
  }

  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status)
    filterTasks()
  }

  const handlePriorityFilterChange = (priority: string) => {
    setPriorityFilter(priority)
    filterTasks()
  }

  const handleAddTask = () => {
    setEditingTask(null)
    setOpenDialog(true)
  }

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
    setOpenDialog(true)
  }

  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter(t => t.id !== taskId))
    setFilteredTasks(filteredTasks.filter(t => t.id !== taskId))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Todo': return 'default'
      case 'In Progress': return 'primary'
      case 'Review': return 'warning'
      case 'Completed': return 'success'
      default: return 'default'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Low': return 'success'
      case 'Medium': return 'warning'
      case 'High': return 'error'
      case 'Critical': return 'error'
      default: return 'default'
    }
  }

  const getOverdueTasks = () => {
    const today = new Date()
    return tasks.filter(task => 
      new Date(task.dueDate) < today && 
      task.status !== 'Completed'
    )
  }

  const getTasksByStatus = (status: string) => {
    return tasks.filter(task => task.status === status)
  }

  const TabPanel = ({ children, value, index }: any) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  )

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography component="h2" variant="h6">
          Tasks Management ({filteredTasks.length})
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddTaskIcon />}
          onClick={handleAddTask}
        >
          Add Task
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="primary">
                {getTasksByStatus('Todo').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Todo
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="info.main">
                {getTasksByStatus('In Progress').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                In Progress
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="warning.main">
                {getTasksByStatus('Review').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                In Review
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="success.main">
                {getTasksByStatus('Completed').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Completed
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Tabs value={currentTab} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Card View" />
        <Tab label="List View" />
        <Tab label="Tree View" />
        <Tab label="Overdue Tasks" />
      </Tabs>

      <TabPanel value={currentTab} index={0}>
        <Box sx={{ mb: 3 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Box>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Filter by Status
              </Typography>
              <Select
                value={statusFilter}
                onChange={(e) => handleStatusFilterChange(e.target.value)}
                sx={{ minWidth: 150 }}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Todo">Todo</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Review">Review</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </Select>
            </Box>
            <Box>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Filter by Priority
              </Typography>
              <Select
                value={priorityFilter}
                onChange={(e) => handlePriorityFilterChange(e.target.value)}
                sx={{ minWidth: 150 }}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Critical">Critical</MenuItem>
              </Select>
            </Box>
          </Stack>
        </Box>

        <Grid container spacing={3}>
          {filteredTasks.map((task) => (
            <Grid key={task.id} size={{ xs: 12, md: 6, lg: 4 }}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" sx={{ flexGrow: 1, mr: 2 }}>
                      {task.title}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <Chip
                        label={task.status}
                        color={getStatusColor(task.status) as any}
                        size="small"
                      />
                      <Chip
                        label={task.priority}
                        color={getPriorityColor(task.priority) as any}
                        size="small"
                        icon={<PriorityHighIcon />}
                      />
                    </Stack>
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {task.description}
                  </Typography>
                  
                  <Stack spacing={1} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <PersonIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2">{task.assignee}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AccessTimeIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2">Due: {task.dueDate}</Typography>
                    </Box>
                  </Stack>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Progress: {task.progress}%
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={task.progress} 
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                  
                  <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 0.5 }}>
                    {task.tags.map((tag, index) => (
                      <Chip key={index} label={tag} size="small" variant="outlined" />
                    ))}
                  </Stack>
                </CardContent>
                
                <CardActions>
                  <IconButton 
                    size="small" 
                    onClick={() => handleEditTask(task)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    onClick={() => handleDeleteTask(task.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                  <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
                    {task.actualHours}h / {task.estimatedHours}h
                  </Typography>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={currentTab} index={1}>
        <List>
          {filteredTasks.map((task, index) => (
            <Box key={task.id}>
              <ListItem>
                <ListItemIcon>
                  <Checkbox 
                    checked={task.status === 'Completed'}
                    disabled={task.status === 'Completed'}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={task.title}
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {task.description}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                        <Chip label={task.status} size="small" color={getStatusColor(task.status) as any} />
                        <Chip label={task.priority} size="small" color={getPriorityColor(task.priority) as any} />
                        <Typography variant="caption">
                          {task.assignee} • Due: {task.dueDate}
                        </Typography>
                      </Stack>
                    </Box>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton onClick={() => handleEditTask(task)} size="small">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteTask(task.id)} size="small">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              {index < filteredTasks.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      </TabPanel>

      <TabPanel value={currentTab} index={2}>
        <CustomizedTreeView />
      </TabPanel>

      <TabPanel value={currentTab} index={3}>
        <Typography variant="h6" sx={{ mb: 2, color: 'error.main' }}>
          Overdue Tasks ({getOverdueTasks().length})
        </Typography>
        <List>
          {getOverdueTasks().map((task, index) => (
            <Box key={task.id}>
              <ListItem>
                <ListItemIcon>
                  <AssignmentIcon color="error" />
                </ListItemIcon>
                <ListItemText
                  primary={task.title}
                  secondary={
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant="body2" color="error">
                        Overdue by {Math.ceil((new Date().getTime() - new Date(task.dueDate).getTime()) / (1000 * 3600 * 24))} days
                      </Typography>
                      <Chip label={task.priority} size="small" color={getPriorityColor(task.priority) as any} />
                    </Stack>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton onClick={() => handleEditTask(task)} size="small">
                    <EditIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              {index < getOverdueTasks().length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      </TabPanel>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingTask ? 'Edit Task' : 'Add New Task'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Task Title
              </Typography>
              <TextField
                placeholder="Enter task title"
                defaultValue={editingTask?.title || ''}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Description
              </Typography>
              <TextField
                placeholder="Enter task description"
                multiline
                rows={3}
                defaultValue={editingTask?.description || ''}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Status
              </Typography>
              <Select
                defaultValue={editingTask?.status || 'Todo'}
                fullWidth
              >
                <MenuItem value="Todo">Todo</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Review">Review</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </Select>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Priority
              </Typography>
              <Select
                defaultValue={editingTask?.priority || 'Medium'}
                fullWidth
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Critical">Critical</MenuItem>
              </Select>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Assignee
              </Typography>
              <TextField
                placeholder="Enter assignee name"
                defaultValue={editingTask?.assignee || ''}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Due Date
              </Typography>
              <TextField
                type="date"
                defaultValue={editingTask?.dueDate || ''}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Estimated Hours
              </Typography>
              <TextField
                placeholder="Enter estimated hours"
                type="number"
                defaultValue={editingTask?.estimatedHours || ''}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Progress (%)
              </Typography>
              <TextField
                placeholder="Enter progress percentage"
                type="number"
                inputProps={{ min: 0, max: 100 }}
                defaultValue={editingTask?.progress || 0}
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={() => setOpenDialog(false)} variant="contained">
            {editingTask ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}