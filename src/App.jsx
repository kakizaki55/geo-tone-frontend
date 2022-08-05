import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { UserProvider } from './context/UserContext';
import { ProjectProvider } from './context/ProjectContext';
import Layout from './components/Layout/Layout';
import About from './views/About/About';
import CreateProfile from './views/CreateProfile/CreateProfile';
import EditProfile from './views/EditProfile/EditProfile';
import Explore from './views/Explore/Explore';
import Home from './views/Home/Home';
import Project from './views/Project/Project';
import Register from './views/Register/Register';
import SignIn from './views/SignIn/SignIn';
import Profile from './views/Profile/Profile';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Router>
        <UserProvider>
          <Layout>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/explore" element={<Explore />} />
              <Route exact path="/signin" element={<SignIn />} />
              <Route exact path="/register" element={<Register />} />
              <Route
                exact
                path="/user/new"
                element={
                  <PrivateRoute>
                    <CreateProfile />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path="/user/:username"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path="/user/:username/edit"
                element={
                  <PrivateRoute>
                    <EditProfile />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path="/project/:id"
                element={
                  <ProjectProvider>
                    <Project />
                  </ProjectProvider>
                }
              />
            </Routes>
          </Layout>
        </UserProvider>
      </Router>
    </MotionConfig>
  );
}
