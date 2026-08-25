import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import NavSidebar from '../components/NavSidebar';
import TopBar from '../components/TopBar';
import Chat from '../pages/Chat';
import Dashboard from '../pages/Dashboard';
import DataSources from '../pages/DataSources';
import Documents from '../pages/Documents';
import Organization from '../pages/Organization';
import AgentsMcp from '../pages/AgentsMcp';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout sidebar={<NavSidebar />} topBar={<TopBar />} />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'chat/:chatSessionId?', element: <Chat /> },
      { path: 'data-sources', element: <DataSources /> },
      { path: 'documents', element: <Documents /> },
      { path: 'organization', element: <Organization /> },
      { path: 'agents-mcp', element: <AgentsMcp /> },
    ],
  },
]);
