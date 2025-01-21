// import { useState } from 'react'
// import Login from '../pages/Login'
// import Dashboard from '../pages/Dashboard'
// import Sidebar from '../components/Sidebar'
// import Students from '../pages/Students'
// import Home from '../pages/home'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//      <div>
//      {/* <Login/> */}
//      <Dashboard/>
//      {/* <Sidebar/> */}
//      {/* <Students/> */}
//      {/* <Home/> */}
//      </div>
//     </>
//   )
// }

// export default App
import { Routes, Route } from 'react-router-dom'; 
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Students from '../pages/Students';
import Home from '../pages/home';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<Home />} /> 
        <Route path="add-student" element={<Students />} /> 
      </Route>
    </Routes>
  );
}

export default App;

