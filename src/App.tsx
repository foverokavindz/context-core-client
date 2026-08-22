import { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static">
        <Toolbar>
          <RocketLaunchIcon sx={{ mr: 1 }} />
          <Typography variant="h6" component="div">
            Context Core Client
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Stack spacing={3} sx={{ alignItems: 'flex-start' }}>
          <Typography variant="h4">Vite + React + MUI</Typography>
          <Typography color="text.secondary">
            Axios client configured in <code>src/api/client.ts</code>.
          </Typography>
          <Button variant="contained" onClick={() => setCount((c) => c + 1)}>
            count is {count}
          </Button>
        </Stack>
      </Container>
    </Box>
  )
}

export default App
