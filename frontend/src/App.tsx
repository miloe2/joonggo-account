import Layout from './layouts/Layout.tsx'
import Home from './pages/Home.tsx'
import { Routes, Route } from 'react-router-dom';
import Statistics from './pages/Statistics.tsx';
import Auth from './pages/Auth.tsx';
function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="statistics" element={<Statistics />} />
        <Route path="/auth" element={<Auth />} />
      </Route>
    </Routes>
  )
}

export default App
