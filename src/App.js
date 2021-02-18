import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PatientList from './components/patients/PatientList'
import ClinicListComponent from './components/clinics/ClinicListComponent'
import VisitList from './components/visits/VisitList'
import Header from './components/Header.js'
import Footer from './components/Footer.js'
import AddUpdatePatient from './components/patients/AddUpdatePatient'
import AddUpdateVisit from './components/visits/AddUpdateVisit'
import LoginComponent from './components/auth/LoginComponent.jsx'
import AuthenticatedRoute from './components/auth/AuthenticatedRoute.jsx'
import PatientCard from './components/patients/PatientCard'
import VisitCard from './components/visits/VisitCard'
import Home from './components/Home'

function App() {
  return (
    <div>
      <Router>
        <Header />
        <div className='container'>
          <Switch>
            <AuthenticatedRoute exact path='/' component={Home} />
            <Route exact path='/login' component={LoginComponent} />
            <AuthenticatedRoute
              exact
              path='/patients/:id'
              component={PatientCard}
            />
            <AuthenticatedRoute
              exact
              path='/visits/:id'
              component={VisitCard}
            />
            <AuthenticatedRoute path='/logout' />
            <AuthenticatedRoute path='/patients' component={PatientList} />
            <AuthenticatedRoute
              path='/clinics'
              component={ClinicListComponent}
            />
            <AuthenticatedRoute path='/visits' component={VisitList} />
            <AuthenticatedRoute
              path='/add-update-patient/:id'
              component={AddUpdatePatient}
            />
            <AuthenticatedRoute
              path='/add-update-visit/:id'
              component={AddUpdateVisit}
            />
            <AuthenticatedRoute
              path='/add-update-visit/:id'
              component={AddUpdateVisit}
            />
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>
  )
}

export default App
