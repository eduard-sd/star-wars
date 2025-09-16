import { Outlet, Link, useLocation } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material'
import type { FC } from 'react'

const App: FC = () => {
  const loc = useLocation()
  return (
    <Box>
      <AppBar position="sticky">
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            SWAPI People
          </Typography>
          <Typography sx={{ ml: 2, opacity: 0.8, fontSize: 14 }}>
            {loc.pathname}
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ py: 3 }}>
        <Outlet />
      </Container>
    </Box>
  )
}

export default App
