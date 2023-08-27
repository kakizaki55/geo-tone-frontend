import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { Layout } from '@components/general';
import About from './views/About/About';
import NoMatch from './views/NoMatch/NoMatch.jsx';
import Create from './views/Create/Create';
import Home from './views/Home/Home';

const App = () => {
  return (
    <MotionConfig reducedMotion="user">
      <Router>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/create" element={<Create />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </Layout>
      </Router>
    </MotionConfig>
  );
};

export default App;
