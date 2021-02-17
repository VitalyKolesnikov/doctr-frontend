import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PatientListComponent from './components/patients/PatientListComponent'
import ClinicListComponent from './components/clinics/ClinicListComponent'
import VisitListComponent from './components/visits/VisitListComponent'
import HeaderComponent from './components/HeaderComponent.js'
import FooterComponent from './components/FooterComponent.js'
import AddUpdatePatientComponent from './components/patients/AddUpdatePatientComponent'
import AddUpdateVisitComponent from './components/visits/AddUpdateVisitComponent'
import LoginComponent from './components/auth/LoginComponent.jsx'
import AuthenticatedRoute from './components/auth/AuthenticatedRoute.jsx'

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className='container'>
          <Switch>
            <AuthenticatedRoute
              exact
              path='/'
              component={PatientListComponent}
            />
            <Route exact path='/login' component={LoginComponent} />
            <AuthenticatedRoute path='/logout' />
            <AuthenticatedRoute
              path='/patients'
              component={PatientListComponent}
            />
            <AuthenticatedRoute
              path='/clinics'
              component={ClinicListComponent}
            />
            <AuthenticatedRoute path='/visits' component={VisitListComponent} />
            <AuthenticatedRoute
              path='/add-update-patient/:id'
              component={AddUpdatePatientComponent}
            />
            <AuthenticatedRoute
              path='/add-update-visit/:id'
              component={AddUpdateVisitComponent}
            />
          </Switch>
        </div>
        <FooterComponent />
      </Router>
    </div>
  )
}

export default App
