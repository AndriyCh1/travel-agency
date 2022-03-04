import './App.css';
import { 
  BrowserRouter as Router, 
  Route, 
  Redirect,
  Switch 
} from "react-router-dom";

import Tours from './pages/Tours';
import Navigation from './parts/Navigation/Navigation';
import Guides from './pages/Guides';
import Categories from './pages/Categories';

const App = () => {
  return (
    <Router>
      <Navigation/>
      <main>
        <Switch>
        <Route path="/" exact>
          <Tours/>
        </Route>
        <Route path="/guides" exact>
          <Guides/>
        </Route>
        <Route path="/categories" exact>
          <Categories/>
        </Route>
        <Redirect to="/"/>
        </Switch>
      </main>
    </Router>
    );
}

export default App;
