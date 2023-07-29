import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { UserProvider } from './context/UserContext';
import Layout from './components/Layout/Layout';
import About from './views/About/About';
import NoMatch from './views/NoMatch/NoMatch.jsx';
import Create from './views/Create/Create'
import Home from './views/Home/Home';


export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Router>
        <UserProvider>
          <Layout>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/create" element={<Create />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </Layout>
        </UserProvider>
      </Router>
    </MotionConfig>
  );
}
