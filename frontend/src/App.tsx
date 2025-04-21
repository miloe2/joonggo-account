import Layout from './layouts/Layout.tsx'
import Home from './pages/Home.tsx'
import { Routes, Route } from 'react-router-dom';
import Statistics from './pages/Statistics.tsx';
function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="statistics" element={<Statistics />} />
      </Route>
    </Routes>
  )
}

export default App
