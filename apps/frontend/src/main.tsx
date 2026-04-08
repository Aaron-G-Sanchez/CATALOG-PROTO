import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'

import './index.css'
import { Feed } from './routes/Feed.tsx'
import { Landing } from './routes/Landing.tsx'
import { ProtectedRoute } from './components/ProtectedRoute.tsx'
import { ClerkProvider } from '@clerk/clerk-react'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Clerk publishable key not provided.')
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/feed',
        element: <Feed />,
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <RouterProvider router={router}></RouterProvider>
    </ClerkProvider>
  </StrictMode>
)
