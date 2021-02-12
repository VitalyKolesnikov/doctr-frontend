import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PatientListComponent from './components/PatientListComponent';
import HeaderComponent from './components/HeaderComponent.js';
import FooterComponent from './components/FooterComponent.js';
import CreatePatientComponent from './components/CreatePatientComponent';
import LoginComponent from './components/LoginComponent.jsx';
import LogoutComponent from './components/LogoutComponent.jsx';
import AuthenticatedRoute from './components/AuthenticatedRoute.jsx';

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className="container">
          <Switch>
            <Route path="/" exact component={LoginComponent} />
            <Route path="/login" exact component={LoginComponent} />
            <AuthenticatedRoute path="/logout" exact component={LogoutComponent} />
            <AuthenticatedRoute path="/patients" component={PatientListComponent}></AuthenticatedRoute>
            <AuthenticatedRoute path="/add-patient" component={CreatePatientComponent}></AuthenticatedRoute>
          </Switch>
        </div>
        <FooterComponent />
      </Router>
    </div>
  )
}

export default App;
