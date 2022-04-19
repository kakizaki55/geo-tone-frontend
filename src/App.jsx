import { Routes, BrowserRouter, Route } from 'react-router-dom';
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
import { UserProvider } from './context/UserContext';
import { ProjectProvider } from './context/ProjectContext';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export default function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/signin" element={<SignIn />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/user/new" element={<CreateProfile />} />

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
              element={<EditProfile />}
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
            <Route exact path="/explore" element={<Explore />} />
          </Routes>
        </Layout>
      </UserProvider>
    </BrowserRouter>
  );
}
