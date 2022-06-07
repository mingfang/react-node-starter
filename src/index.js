import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './index.css'

const App = React.lazy(() => import('./App'));
const Foo = React.lazy(() => import('./Foo'));

createRoot(document.getElementById('root')).render(
  <Router>
    <React.Suspense fallback={<></>}>
      <Routes>
        <Route path="/foo" element={<Foo/>}/>
        <Route path="/" element={<App/>}/>
      </Routes>
    </React.Suspense>
  </Router>
);
