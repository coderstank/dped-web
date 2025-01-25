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
import EditStudents from '../pages/EditStudent';
import Payments from '../pages/Payments';
import Front from '../pages/Front';
import AddStudent from '../pages/AddStudent';

function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Dashboard />}>
        <Route path="/students" element={<Students />} /> 
        <Route index element={<Front />} /> 
        <Route path="/add-student" element={<AddStudent />} /> 
        <Route path="/edit-student/:id" element={<EditStudents />} /> 
        <Route path="/payment" element={<Payments />} /> 
      </Route>
    </Routes>
  );
}

export default App;

