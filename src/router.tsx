
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { CompanyPage } from './pages/company/[id]';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/company/:id",
        element: <CompanyPage />,
      },
    ],
  },
]);
