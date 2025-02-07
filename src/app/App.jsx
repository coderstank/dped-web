
import { Routes, Route } from 'react-router-dom'; 
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Students from '../pages/Students';
import EditStudents from '../pages/EditStudent';
import Payments from '../pages/Payments';
import Front from '../pages/Front';
import AddStudent from '../pages/AddStudent';
import PreviewForm from '../pages/PreviewForm';

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
        <Route path="/preview/:id" element={<PreviewForm />} /> 
      </Route>
    </Routes>
  );
}

export default App;

