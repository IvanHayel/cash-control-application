import React                     from 'react';
import ReactDOM                  from 'react-dom/client';
import './index.scss';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider}                from 'mobx-react';
import stores                    from './Stores';
import App                       from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider {...stores}>
      <Router>
        <App />
      </Router>
    </Provider>,
);