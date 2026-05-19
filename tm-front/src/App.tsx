import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUpForm from './features/auth/components/signup/SignUpForm';
import SignInForm from './features/auth/components/signin/SignInForm';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<SignUpForm />} />
          <Route path='/signin' element={<SignInForm />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App