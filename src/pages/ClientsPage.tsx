import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import EmailIcon from '@mui/icons-material/Email'
import FilterListIcon from '@mui/icons-material/FilterList'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import PhoneIcon from '@mui/icons-material/Phone'
import SearchIcon from '@mui/icons-material/Search'
import Avatar from '@mui/material/Avatar'
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
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import CustomizedDataGrid from '../components/CustomizedDataGrid'

interface Client {
  id: number
  name: string
  email: string
  phone: string
  company: string
  status: 'Active' | 'Inactive' | 'Pending'
  avatar: string
  lastContact: string
  revenue: number
}

const mockClients: Client[] = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@company.com',
    phone: '+1 (555) 123-4567',
    company: 'Tech Corp',
    status: 'Active',
    avatar: 'J',
    lastContact: '2024-01-15',
    revenue: 25000,
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.j@business.com',
    phone: '+1 (555) 987-6543',
    company: 'Business Solutions',
    status: 'Active',
    avatar: 'S',
    lastContact: '2024-01-12',
    revenue: 45000,
  },
  {
    id: 3,
    name: 'Mike Wilson',
    email: 'mike.w@startup.io',
    phone: '+1 (555) 456-7890',
    company: 'StartupIO',
    status: 'Pending',
    avatar: 'M',
    lastContact: '2024-01-10',
    revenue: 12000,
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily.davis@enterprise.com',
    phone: '+1 (555) 321-9876',
    company: 'Enterprise Ltd',
    status: 'Inactive',
    avatar: 'E',
    lastContact: '2023-12-20',
    revenue: 78000,
  },
]

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>(mockClients)
  const [filteredClients, setFilteredClients] = useState<Client[]>(mockClients)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [openDialog, setOpenDialog] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    filterClients(term, statusFilter)
  }

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status)
    filterClients(searchTerm, status)
  }

  const filterClients = (search: string, status: string) => {
    let filtered = clients

    if (search) {
      filtered = filtered.filter(
        (client) =>
          client.name.toLowerCase().includes(search.toLowerCase()) ||
          client.email.toLowerCase().includes(search.toLowerCase()) ||
          client.company.toLowerCase().includes(search.toLowerCase()),
      )
    }

    if (status !== 'All') {
      filtered = filtered.filter((client) => client.status === status)
    }

    setFilteredClients(filtered)
  }

  const handleAddClient = () => {
    setEditingClient(null)
    setOpenDialog(true)
  }

  const handleEditClient = (client: Client) => {
    setEditingClient(client)
    setOpenDialog(true)
  }

  const handleDeleteClient = (clientId: number) => {
    setClients(clients.filter((c) => c.id !== clientId))
    setFilteredClients(filteredClients.filter((c) => c.id !== clientId))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'success'
      case 'Pending':
        return 'warning'
      case 'Inactive':
        return 'error'
      default:
        return 'default'
    }
  }

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
          Clients Management ({filteredClients.length})
        </Typography>
        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          onClick={handleAddClient}
        >
          Add Client
        </Button>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems="center"
        >
          <Box>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Search Clients
            </Typography>
            <TextField
              placeholder="Search clients..."
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
              Filter by Status
            </Typography>
            <Select
              value={statusFilter}
              onChange={(e) => handleStatusFilter(e.target.value)}
              startAdornment={<FilterListIcon sx={{ mr: 1 }} />}
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </Box>
        </Stack>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {filteredClients.map((client) => (
          <Grid key={client.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                    {client.avatar}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" noWrap>
                      {client.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {client.company}
                    </Typography>
                  </Box>
                  <Chip
                    label={client.status}
                    color={getStatusColor(client.status)}
                    size="small"
                  />
                </Box>

                <Stack spacing={1}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <EmailIcon
                      sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }}
                    />
                    <Typography variant="body2" noWrap>
                      {client.email}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PhoneIcon
                      sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }}
                    />
                    <Typography variant="body2">{client.phone}</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Last contact: {client.lastContact}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ${client.revenue.toLocaleString()}
                  </Typography>
                </Stack>
              </CardContent>

              <CardActions>
                <IconButton
                  size="small"
                  onClick={() => handleEditClient(client)}
                  color="primary"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleDeleteClient(client.id)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
                <Button size="small" href={`mailto:${client.email}`}>
                  Contact
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6" sx={{ mb: 2 }}>
        Detailed View
      </Typography>
      <CustomizedDataGrid />

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingClient ? 'Edit Client' : 'Add New Client'}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <Box>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Full Name
              </Typography>
              <TextField
                placeholder="Enter full name"
                defaultValue={editingClient?.name || ''}
                fullWidth
                variant="outlined"
              />
            </Box>
            <Box>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Email Address
              </Typography>
              <TextField
                placeholder="Enter email address"
                type="email"
                defaultValue={editingClient?.email || ''}
                fullWidth
                variant="outlined"
              />
            </Box>
            <Box>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Phone Number
              </Typography>
              <TextField
                placeholder="Enter phone number"
                defaultValue={editingClient?.phone || ''}
                fullWidth
                variant="outlined"
              />
            </Box>
            <Box>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Company Name
              </Typography>
              <TextField
                placeholder="Enter company name"
                defaultValue={editingClient?.company || ''}
                fullWidth
                variant="outlined"
              />
            </Box>
            <Box>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Status
              </Typography>
              <Select
                defaultValue={editingClient?.status || 'Pending'}
                fullWidth
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </Box>
            <Box>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Expected Revenue ($)
              </Typography>
              <TextField
                placeholder="Enter expected revenue"
                type="number"
                defaultValue={editingClient?.revenue || ''}
                fullWidth
                variant="outlined"
              />
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={() => setOpenDialog(false)} variant="contained">
            {editingClient ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
