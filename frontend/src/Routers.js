import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from './Pages/Home'
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Saved from './Pages/Saved';

function router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/saved" element={<Saved />} />
    </Routes>
  );
}

export default router
