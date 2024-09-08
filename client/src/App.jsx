import React from 'react'
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import TaskPage from './pages/TaskPage'
import TaskFormPage from './pages/TaskFormPage'
import NavComponent from './components/NavComponent'
import {Toaster} from 'react-hot-toast'



function App() {
  return (

    <BrowserRouter>
    <div className='container mx-auto'>
    <NavComponent/>
    <Routes>
      <Route path='/' element={<Navigate to="/tasks"/>}  />
     <Route path="/tasks" element={<TaskPage/>} />
     <Route path="/tasks-create" element={<TaskFormPage/>} />
     <Route path="/tasks/:id" element={<TaskFormPage/>} />

    </Routes>
    <Toaster/>
    
    </div>


    </BrowserRouter>

  )
}

export default App