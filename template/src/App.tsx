import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './components';
import { HomePage } from './pages';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App
