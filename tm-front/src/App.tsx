import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInForm from './features/auth/components/signup/SignInForm';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signin' element={<SignInForm />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App