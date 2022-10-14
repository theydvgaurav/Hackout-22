import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { StoreProvider } from 'easy-peasy';
import store from './Store/configureStore';
import './App.css';

function App() {
  return (
    <StoreProvider store={store}>
      <BrowserRouter>
        {/* <Header /> */}
        <Routes>
          {/* <Route path='/' element={<LandingPage />} exact />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/register' element={<SignupScreen />} />
          <Route path='/notes' element={<MyNotes />} />
          <Route path='/newNote' element={<NewNote />} />
          <Route path='/editNote/:id' element={<EditNote />} /> */}
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
