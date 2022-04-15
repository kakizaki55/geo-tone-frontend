import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import About from './views/About/About';
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
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}
