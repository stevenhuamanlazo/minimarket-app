import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { List } from './pages/List';
import { Form } from './pages/Form';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<List />} />
          <Route path="/nuevo-producto" element={<Form />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;