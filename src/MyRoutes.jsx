import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Translator from './Pages/Translator'

const MyRoutes = () => {
    const routes = [
        { path: '/', element: <Home /> },
        { path: '/translate' , element: <Translator/>}
    ]
    return (
        <BrowserRouter>
            <Routes>
                {routes.map(route => {
                    return <Route path={route.path} element={route.element} key={route.path}/>
                })}
            </Routes>
        </BrowserRouter>
    )
}

export default MyRoutes