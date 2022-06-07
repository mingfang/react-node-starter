import React from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RemoteComponent from './components/RemoteComponent';
import './index.css'

const App = React.lazy(() => import('./App'));
const FooLocal = React.lazy(() => import('./Foo'));
const FooRemote = React.lazy(() => RemoteComponent({
  path:`${window.location.origin}/remoteEntry.js`,
  scope: 'exposes',
  module: './Foo'
}));

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <BrowserRouter>
    <React.Suspense fallback={<></>}>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/foo-local" element={<FooLocal/>}/>
        <Route path="/foo-remote" element={<FooRemote/>}/>
      </Routes>
    </React.Suspense>
  </BrowserRouter>
);
