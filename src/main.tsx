import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import { router } from './router.tsx'
import { TreeProvider } from './context/TreeProvider.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <TreeProvider>
        <RouterProvider router={router} />
      </TreeProvider>
    </QueryClientProvider>
  </StrictMode>,
)
