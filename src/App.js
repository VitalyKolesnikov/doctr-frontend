import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PatientListComponent from './components/PatientListComponent';
import ClinicListComponent from './components/ClinicListComponent';
import VisitListComponent from './components/VisitListComponent';
import HeaderComponent from './components/HeaderComponent.js';
import FooterComponent from './components/FooterComponent.js';
import AddUpdatePatientComponent from './components/AddUpdatePatientComponent';
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
            <AuthenticatedRoute exact path="/" component={PatientListComponent} />
            <Route exact path="/login" component={LoginComponent} />
            <AuthenticatedRoute path="/logout" exact component={LogoutComponent} />
            <AuthenticatedRoute path="/patients" component={PatientListComponent} />
            <AuthenticatedRoute path="/clinics" component={ClinicListComponent} />
            <AuthenticatedRoute path="/visits" component={VisitListComponent} />
            <AuthenticatedRoute path="/add-update-patient/:id" component={AddUpdatePatientComponent} />
          </Switch>
        </div>
        <FooterComponent />
      </Router>
    </div>
  )
}

export default App;
