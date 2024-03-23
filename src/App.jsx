import { Route, Routes } from "react-router-dom";
import LoginPage from "./features/LoginPage";
import ProfilePage from "./features/ProfilePage";

import './App.css';

export default function App() {

  return (
    <div id="main">
      
      <Routes>

        <Route path="/auth" element={<LoginPage />}/>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/profile" element={<ProfilePage />}/>

      </Routes>

    </div>
  )
}