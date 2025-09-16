import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CssBaseline } from '@mui/material'
import App from './App'
import PeoplePage from './pages/PeoplePage'
import PersonPage from './pages/PersonPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <PeoplePage /> },
      { path: 'person/:id', element: <PersonPage /> },
    ],
  },
])

const client = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <CssBaseline />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
)
