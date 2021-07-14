import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

const App = React.lazy(() => import('./App'));
const Foo = React.lazy(() => import('./Foo'));

ReactDOM.render(
  <Router>
    <React.Suspense fallback={<></>}>
      <Switch>
        <Route path="/foo" component={Foo}/>
        <Route path="/" component={App}/>
      </Switch>
    </React.Suspense>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
