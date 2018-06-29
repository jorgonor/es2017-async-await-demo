import React from 'react';
import ReactDOM from 'react-dom';

import ListReposApp from '../containers/ListReposApp';
import UserDashboardAppAsyncAwait from '../containers/UserDashboardAppAsyncAwait';
import UserDashboardAppPromiseAll from '../containers/UserDashboardAppPromiseAll';
const view = 'dashboard_concurrent';
let ViewComponent = <p>No view for {view}</p>;

switch (view) {
    case 'simple':
        ViewComponent = ListReposApp;
        break;
    case 'dashboard':
        ViewComponent = UserDashboardAppAsyncAwait;
        break;
    case 'dashboard_concurrent':
        ViewComponent = UserDashboardAppPromiseAll;
        break;
}

ReactDOM.render(
    <div className="container">
        <ViewComponent user="jorgonor" />
    </div>,
    document.getElementById('app')
);