import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { StoreProvider } from 'easy-peasy';
import store from './Store/configureStore';
import './App.css';
import DoctorDashboard from './Components/Doctor/DoctorDashboard';
import DoctorRegistration from './Components/Doctor/DoctorRegistration';
import DoctorLogin from './Components/Doctor/DoctorLogin';

function App() {
  return (
    <StoreProvider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/doctor-portal' element={<DoctorDashboard />} exact />
          <Route path='/doctor-register' element={<DoctorRegistration />} />
          <Route path='/doctor-login' element={<DoctorLogin />} />
          {/* <Route path='/notes' element={<MyNotes />} />
          <Route path='/newNote' element={<NewNote />} />
          <Route path='/editNote/:id' element={<EditNote />} /> */}
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
