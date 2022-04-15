import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import About from './views/About/About';
import CreateProfile from './views/CreateProfile/CreateProfile';
import EditProfile from './views/EditProfile/EditProfile';
import Home from './views/Home/Home';
import Register from './views/Register/Register';
import SignIn from './views/SignIn/SignIn';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/signin">
            <SignIn />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/user/new">
            <CreateProfile />
          </Route>
          <Route exact path="/user/:username/edit">
            <EditProfile />
          </Route>
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}
