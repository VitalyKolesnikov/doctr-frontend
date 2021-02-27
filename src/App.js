import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PatientList from './components/patients/PatientList'
import ClinicList from './components/clinics/ClinicList'
import VisitList from './components/visits/VisitList'
import ReminderList from './components/reminders/ReminderList'
import Header from './components/Header.js'
import Footer from './components/Footer.js'
import AddUpdatePatient from './components/patients/AddUpdatePatient'
import AddUpdateVisit from './components/visits/AddUpdateVisit'
import Login from './components/auth/Login.jsx'
import { AuthenticatedRoute } from './components/auth/AuthenticatedRoute.jsx'
import PatientCard from './components/patients/PatientCard'
import VisitCard from './components/visits/VisitCard'
import Home from './components/Home'
import AddUpdateReminder from './components/reminders/AddUpdateReminder'
import { ReminderProvider } from './components/ReminderContext'

function App() {
  return (
    <ReminderProvider>
      <Router>
        <Header />
        <div className='container'>
          <Switch>
            <AuthenticatedRoute exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
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
            <AuthenticatedRoute path='/clinics' component={ClinicList} />
            <AuthenticatedRoute path='/visits' component={VisitList} />
            <AuthenticatedRoute path='/reminders' component={ReminderList} />
            <AuthenticatedRoute
              path='/add-update-patient/:id'
              component={AddUpdatePatient}
            />
            <AuthenticatedRoute
              path='/add-update-visit/:id'
              component={AddUpdateVisit}
            />
            <AuthenticatedRoute
              path='/add-update-reminder/:id'
              component={AddUpdateReminder}
            />
          </Switch>
        </div>
        <Footer />
      </Router>
    </ReminderProvider>
  )
}

export default App
