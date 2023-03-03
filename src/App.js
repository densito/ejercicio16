import './App.css';
import Login from './login';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import Register from './register';
import Tasks from './tasks';

function App() {

  let loggedIn = true;

  return (
    <Router>
        {/* Route Switch */}
        <Switch>
            {/* Redirections to protect our routes */}
            <Route exact path='/' >
                {
                    loggedIn ?
                    <Redirect from='/login' to='/tasks' />
                    :
                    <Redirect from='/' to='/login' /> 
                }
            </Route>
                {/* Login Route */}
            <Route exact path='/login' component={Login} />
            <Route exact path='/tasks' component={Tasks} />
            {/* register Route */}
            <Route exact path='/register' >
                {
                    loggedIn ?
                    <Redirect from='/register' to='/login' />
                    :
                    <Register/> 
                }
            </Route>
            <Route component={NotFoundPage} />
        </Switch>
    </Router>
  );
}

export default App;
