import { useEffect, useState } from 'react'
import './App.css'
import MyRoutes from './MyRoutes'

function App() {
  const [mode, setMode] = useState('')
  useEffect(()=>{
    localStorage.getItem('mode')? setMode(localStorage.getItem('mode')): setMode('light')
    localStorage.setItem('mode',mode)
  },[])

  return (
    <MyRoutes/>
  )
}

export default App
