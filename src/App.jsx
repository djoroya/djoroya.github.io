import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootswatch/dist/lux/bootstrap.min.css";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Navbar } from './components/Navbar';
import { About } from './components/About/About';
import { Blog } from './components/Blog/Blog';
import { PostDetail } from './components/Blog/PostDetail';
import { Home } from './components/Home/Home';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:postId" element={<PostDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
