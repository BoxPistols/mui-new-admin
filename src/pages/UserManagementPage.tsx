import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import BlockIcon from '@mui/icons-material/Block'
import DeleteIcon from '@mui/icons-material/Delete'
import DownloadIcon from '@mui/icons-material/Download'
import EditIcon from '@mui/icons-material/Edit'
import EmailIcon from '@mui/icons-material/Email'
import FilterListIcon from '@mui/icons-material/FilterList'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import PhoneIcon from '@mui/icons-material/Phone'
import SearchIcon from '@mui/icons-material/Search'

import VerifiedIcon from '@mui/icons-material/Verified'
import Avatar from '@mui/material/Avatar'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'

import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch'
import Tab from '@mui/material/Tab'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Tabs from '@mui/material/Tabs'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

interface User {
  id: number
  name: string
  email: string
  phone: string
  role: 'Admin' | 'Moderator' | 'User' | 'Guest'
  status: 'Active' | 'Inactive' | 'Suspended' | 'Pending'
  avatar: string
  lastLogin: string
  createdDate: string
  permissions: string[]
  isVerified: boolean
  loginCount: number
  department: string
}

const mockUsers: User[] = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@company.com',
    phone: '+1 (555) 123-4567',
    role: 'Admin',
    status: 'Active',
    avatar: 'J',
    lastLogin: '2024-02-01 14:30',
    createdDate: '2023-01-15',
    permissions: ['read', 'write', 'delete', 'admin'],
    isVerified: true,
    loginCount: 245,
    department: 'IT',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.j@business.com',
    phone: '+1 (555) 987-6543',
    role: 'Moderator',
    status: 'Active',
    avatar: 'S',
    lastLogin: '2024-02-01 09:15',
    createdDate: '2023-03-22',
    permissions: ['read', 'write', 'moderate'],
    isVerified: true,
    loginCount: 128,
    department: 'Marketing',
  },
  {
    id: 3,
    name: 'Mike Wilson',
    email: 'mike.w@startup.io',
    phone: '+1 (555) 456-7890',
    role: 'User',
    status: 'Pending',
    avatar: 'M',
    lastLogin: '2024-01-28 16:45',
    createdDate: '2024-01-20',
    permissions: ['read'],
    isVerified: false,
    loginCount: 3,
    department: 'Development',
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily.davis@enterprise.com',
    phone: '+1 (555) 321-9876',
    role: 'User',
    status: 'Suspended',
    avatar: 'E',
    lastLogin: '2024-01-15 11:20',
    createdDate: '2023-08-10',
    permissions: ['read'],
    isVerified: true,
    loginCount: 89,
    department: 'Sales',
  },
  {
    id: 5,
    name: 'Alex Brown',
    email: 'alex.brown@tech.com',
    phone: '+1 (555) 654-3210',
    role: 'Admin',
    status: 'Active',
    avatar: 'A',
    lastLogin: '2024-02-01 18:00',
    createdDate: '2022-11-05',
    permissions: ['read', 'write', 'delete', 'admin'],
    isVerified: true,
    loginCount: 456,
    department: 'Security',
  },
]

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [filteredUsers, setFilteredUsers] = useState<User[]>(mockUsers)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('All')
  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [currentTab, setCurrentTab] = useState(0)
  const [openDialog, setOpenDialog] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue)
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    filterUsers(term, roleFilter, statusFilter)
  }

  const handleRoleFilter = (role: string) => {
    setRoleFilter(role)
    filterUsers(searchTerm, role, statusFilter)
  }

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status)
    filterUsers(searchTerm, roleFilter, status)
  }

  const filterUsers = (search: string, role: string, status: string) => {
    let filtered = users

    if (search) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()) ||
          user.department.toLowerCase().includes(search.toLowerCase()),
      )
    }

    if (role !== 'All') {
      filtered = filtered.filter((user) => user.role === role)
    }

    if (status !== 'All') {
      filtered = filtered.filter((user) => user.status === status)
    }

    setFilteredUsers(filtered)
  }

  const handleAddUser = () => {
    setEditingUser(null)
    setOpenDialog(true)
  }

  const handleEditUser = (user: User) => {
    setEditingUser(user)
    setOpenDialog(true)
  }

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter((u) => u.id !== userId))
    setFilteredUsers(filteredUsers.filter((u) => u.id !== userId))
  }

  const handleSuspendUser = (userId: number) => {
    setUsers(
      users.map((u) =>
        u.id === userId
          ? {
              ...u,
              status:
                u.status === 'Suspended' ? 'Active' : ('Suspended' as const),
            }
          : u,
      ),
    )
    setFilteredUsers(
      filteredUsers.map((u) =>
        u.id === userId
          ? {
              ...u,
              status:
                u.status === 'Suspended' ? 'Active' : ('Suspended' as const),
            }
          : u,
      ),
    )
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'error'
      case 'Moderator':
        return 'warning'
      case 'User':
        return 'primary'
      case 'Guest':
        return 'default'
      default:
        return 'default'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'success'
      case 'Pending':
        return 'warning'
      case 'Inactive':
        return 'default'
      case 'Suspended':
        return 'error'
      default:
        return 'default'
    }
  }

  const getRoleStats = () => {
    const stats = users.reduce(
      (acc, user) => {
        acc[user.role] = (acc[user.role] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )
    return stats
  }

  const getStatusStats = () => {
    const stats = users.reduce(
      (acc, user) => {
        acc[user.status] = (acc[user.status] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )
    return stats
  }

  interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
  }

  const TabPanel = ({ children, value, index }: TabPanelProps) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  )

  const roleStats = getRoleStats()
  const statusStats = getStatusStats()

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography component="h2" variant="h6">
          User Management ({filteredUsers.length})
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" startIcon={<DownloadIcon />}>
            Export
          </Button>
          <Button
            variant="contained"
            startIcon={<PersonAddIcon />}
            onClick={handleAddUser}
          >
            Add User
          </Button>
        </Stack>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="error.main">
                {roleStats.Admin || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Administrators
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="warning.main">
                {roleStats.Moderator || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Moderators
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="primary">
                {roleStats.User || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Regular Users
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="success.main">
                {statusStats.Active || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active Users
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mb: 3 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems="center"
        >
          <Box>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Search Users
            </Typography>
            <TextField
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
                ),
              }}
              sx={{ minWidth: 300 }}
              variant="outlined"
            />
          </Box>
          <Box>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Filter by Role
            </Typography>
            <Select
              value={roleFilter}
              onChange={(e) => handleRoleFilter(e.target.value)}
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="All">All Roles</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Moderator">Moderator</MenuItem>
              <MenuItem value="User">User</MenuItem>
              <MenuItem value="Guest">Guest</MenuItem>
            </Select>
          </Box>
          <Box>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Filter by Status
            </Typography>
            <Select
              value={statusFilter}
              onChange={(e) => handleStatusFilter(e.target.value)}
              startAdornment={<FilterListIcon sx={{ mr: 1 }} />}
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="All">All Status</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
              <MenuItem value="Suspended">Suspended</MenuItem>
            </Select>
          </Box>
        </Stack>
      </Box>

      <Tabs value={currentTab} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Card View" />
        <Tab label="Table View" />
        <Tab label="Permissions" />
      </Tabs>

      <TabPanel value={currentTab} index={0}>
        <Grid container spacing={3}>
          {filteredUsers.map((user) => (
            <Grid key={user.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      badgeContent={
                        user.isVerified ? (
                          <VerifiedIcon
                            sx={{ fontSize: 16, color: 'success.main' }}
                          />
                        ) : null
                      }
                    >
                      <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                        {user.avatar}
                      </Avatar>
                    </Badge>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" noWrap>
                        {user.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {user.department}
                      </Typography>
                    </Box>
                    <Stack spacing={1}>
                      <Chip
                        label={user.role}
                        color={getRoleColor(user.role)}
                        size="small"
                        icon={
                          user.role === 'Admin' ? (
                            <AdminPanelSettingsIcon />
                          ) : undefined
                        }
                      />
                      <Chip
                        label={user.status}
                        color={getStatusColor(user.status)}
                        size="small"
                      />
                    </Stack>
                  </Box>

                  <Stack spacing={1}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <EmailIcon
                        sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }}
                      />
                      <Typography variant="body2" noWrap>
                        {user.email}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <PhoneIcon
                        sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }}
                      />
                      <Typography variant="body2">{user.phone}</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Last login: {user.lastLogin}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Logins: {user.loginCount}
                    </Typography>
                  </Stack>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                      Permissions:
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={0.5}
                      flexWrap="wrap"
                      sx={{ gap: 0.5, mt: 0.5 }}
                    >
                      {user.permissions.map((permission) => (
                        <Chip
                          key={permission}
                          label={permission}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                    </Stack>
                  </Box>
                </CardContent>

                <CardActions>
                  <IconButton
                    size="small"
                    onClick={() => handleEditUser(user)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <Tooltip
                    title={
                      user.status === 'Suspended'
                        ? 'Activate User'
                        : 'Suspend User'
                    }
                  >
                    <IconButton
                      size="small"
                      onClick={() => handleSuspendUser(user.id)}
                      color={
                        user.status === 'Suspended' ? 'success' : 'warning'
                      }
                    >
                      <BlockIcon />
                    </IconButton>
                  </Tooltip>
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteUser(user.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                  <Button size="small" href={`mailto:${user.email}`}>
                    Contact
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={currentTab} index={1}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Last Login</TableCell>
                <TableCell>Logins</TableCell>
                <TableCell>Verified</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ mr: 2, width: 32, height: 32 }}>
                          {user.avatar}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight="medium">
                            {user.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {user.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={user.role}
                        color={getRoleColor(user.role)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={user.status}
                        color={getStatusColor(user.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell>{user.loginCount}</TableCell>
                    <TableCell>
                      {user.isVerified ? (
                        <VerifiedIcon color="success" />
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          No
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <IconButton
                          size="small"
                          onClick={() => handleEditUser(user)}
                          color="primary"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleSuspendUser(user.id)}
                          color={
                            user.status === 'Suspended' ? 'success' : 'warning'
                          }
                        >
                          <BlockIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteUser(user.id)}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(_event, newPage) => setPage(newPage)}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10))
              setPage(0)
            }}
          />
        </TableContainer>
      </TabPanel>

      <TabPanel value={currentTab} index={2}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Role-Based Permissions
        </Typography>
        <Grid container spacing={3}>
          {['Admin', 'Moderator', 'User', 'Guest'].map((role) => (
            <Grid key={role} size={{ xs: 12, md: 6 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    {role} Permissions
                  </Typography>
                  <Stack spacing={2}>
                    <FormControlLabel
                      control={<Switch checked={role !== 'Guest'} />}
                      label="Read Access"
                    />
                    <FormControlLabel
                      control={
                        <Switch checked={role !== 'Guest' && role !== 'User'} />
                      }
                      label="Write Access"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={role === 'Admin' || role === 'Moderator'}
                        />
                      }
                      label="Moderate Content"
                    />
                    <FormControlLabel
                      control={<Switch checked={role === 'Admin'} />}
                      label="Delete Content"
                    />
                    <FormControlLabel
                      control={<Switch checked={role === 'Admin'} />}
                      label="User Management"
                    />
                    <FormControlLabel
                      control={<Switch checked={role === 'Admin'} />}
                      label="System Settings"
                    />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{editingUser ? 'Edit User' : 'Add New User'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Full Name
              </Typography>
              <TextField
                placeholder="Enter full name"
                defaultValue={editingUser?.name || ''}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Email Address
              </Typography>
              <TextField
                placeholder="Enter email address"
                type="email"
                defaultValue={editingUser?.email || ''}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Phone Number
              </Typography>
              <TextField
                placeholder="Enter phone number"
                defaultValue={editingUser?.phone || ''}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Department
              </Typography>
              <TextField
                placeholder="Enter department"
                defaultValue={editingUser?.department || ''}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Role
              </Typography>
              <Select defaultValue={editingUser?.role || 'User'} fullWidth>
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Moderator">Moderator</MenuItem>
                <MenuItem value="User">User</MenuItem>
                <MenuItem value="Guest">Guest</MenuItem>
              </Select>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Status
              </Typography>
              <Select defaultValue={editingUser?.status || 'Pending'} fullWidth>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
                <MenuItem value="Suspended">Suspended</MenuItem>
              </Select>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControlLabel
                control={
                  <Switch defaultChecked={editingUser?.isVerified || false} />
                }
                label="Email Verified"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={() => setOpenDialog(false)} variant="contained">
            {editingUser ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
