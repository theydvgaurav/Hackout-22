import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { StoreProvider } from 'easy-peasy';
import store from './Store/configureStore';
import './App.css';
import DoctorDashboard from './Components/Doctor/DoctorDashboard';
import DoctorRegistration from './Components/Doctor/DoctorRegistration';
import DoctorLogin from './Components/Doctor/DoctorLogin';
import PatientLogin from './Components/Patient/PatientLogin';
import ResetPassword from './Components/Patient/ResetPassword';
import PatientDashboard from './Components/Patient/PatientDashboard';
import ConfirmPatient from './Components/Patient/ConfirmPatient';
import PrescriptionDetails from './Components/Patient/PrescriptionDetails';
import PrescriptionDoctorDetails from './Components/Doctor/PrescriptionDoctorDetails';

// update-password-patient

function App() {
  return (
    <StoreProvider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PatientLogin />} exact />
          <Route path='/doctor-portal' element={<DoctorDashboard />} />
          <Route path='/doctor-register' element={<DoctorRegistration />} />
          <Route path='/doctor-login' element={<DoctorLogin />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/patient-portal' element={<PatientDashboard />} />
          <Route path='/login-pat/:token' element={<ConfirmPatient />} />
          <Route path='/prec-details/:id' element={<PrescriptionDetails />} />
          <Route path='/prec-doctor-details/:id' element={<PrescriptionDoctorDetails />} />
          <Route path='/update-password-patient' element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
