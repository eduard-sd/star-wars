import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CssBaseline } from '@mui/material'
import App from './App'
import PeoplePage from './pages/PeoplePage'
import PersonPage from './pages/PersonPage'
import {AppRoutes} from "./routes/routes";

const router = createBrowserRouter([
  {
    path: AppRoutes.ROOT,
    element: <App />,
    children: [
      { index: true, element: <PeoplePage /> },
      { path: AppRoutes.PERSON, element: <PersonPage /> },
      { path: AppRoutes.NOT_FOUND, element: <Navigate to={AppRoutes.ROOT} replace /> },
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
