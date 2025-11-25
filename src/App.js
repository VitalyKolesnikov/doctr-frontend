import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
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
import ErrorBoundary from './components/common/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
      <ReminderProvider>
        <BrowserRouter>
          <Header />
          <div className='container'>
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route
                path='/'
                element={
                  <AuthenticatedRoute>
                    <Home />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path='/patients/:id'
                element={
                  <AuthenticatedRoute>
                    <PatientCard />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path='/visits/:id'
                element={
                  <AuthenticatedRoute>
                    <VisitCard />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path='/logout'
                element={
                  <AuthenticatedRoute>
                    <Navigate to='/login' replace />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path='/patients'
                element={
                  <AuthenticatedRoute>
                    <PatientList />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path='/clinics'
                element={
                  <AuthenticatedRoute>
                    <ClinicList />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path='/visits'
                element={
                  <AuthenticatedRoute>
                    <VisitList />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path='/reminders'
                element={
                  <AuthenticatedRoute>
                    <ReminderList />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path='/add-update-patient/:id'
                element={
                  <AuthenticatedRoute>
                    <AddUpdatePatient />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path='/add-update-visit/:id'
                element={
                  <AuthenticatedRoute>
                    <AddUpdateVisit />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path='/add-update-reminder/:id'
                element={
                  <AuthenticatedRoute>
                    <AddUpdateReminder />
                  </AuthenticatedRoute>
                }
              />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </ReminderProvider>
    </ErrorBoundary>
  )
}

export default App
