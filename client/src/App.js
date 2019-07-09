import React from 'react';
import { BrowserRouter as Router, Switch,Route} from 'react-router-dom';
import './App.css';
import LoginPage from './components/Login';
import HomePage from './components/HomePage';
function App() {
  
  return (
    <div className="App">
      <Router>
        <Switch>                    
            <Route exact path="/" 
                    render={(props) => <HomePage />}/>
            <Route path='/login'
                    render={(props) => <LoginPage />}/>                                
        </Switch>
      </Router>
    </div>
  );
}

export default App;

