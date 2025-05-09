// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// main.tsx
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {import.meta.env.DEV && <ReactQueryDevtools />}
  </QueryClientProvider>
);