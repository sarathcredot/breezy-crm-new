import React from 'react';
import { Route, Routes, Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './componet/Sidebar';
import Home from './componet/Home/Home';
import Billing from './componet/Billing/Billing';
import Adds from './componet/Adds/Adds';

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-white min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/billing" element={<Billing />} />
            <Route path="/adds" element={<Adds />} />
        </Routes>
      </main>
      <ToastContainer 
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      
      />
    </div>
  );
}

export default App;