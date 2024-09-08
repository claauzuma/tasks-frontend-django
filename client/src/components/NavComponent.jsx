import React from 'react'
import { Link } from 'react-router-dom'

function NavComponent() {
  return (
    <div className='flex justify-between py-3'>
      {/* Enlace de "Volver" */}
      <Link to="/tasks">Volver</Link>


      <h1 className='font-bold text-3xl mb-4'>Task App</h1>


      <Link to="/tasks-create">
        <button className='bg-indigo-500 px-3 py-2 rounded-lg'>
          Crear Tarea
        </button>
      </Link>
    </div>
  )
}

export default NavComponent;
