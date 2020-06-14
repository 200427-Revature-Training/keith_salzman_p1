import React, { lazy, Suspense } from 'react';
import './App.css';
import { NavbarComponent } from './components/navbar.component';
import { BrowserRouter, Switch, Route, Redirect, Router } from 'react-router-dom';
//import { ReimbursementComponent } from './components/reimbursements.component';
//import { HomeComponent } from './components/home.component';
import { ReimbursementManagerComponent } from './components/reimbursement-manager.component';
import { HomeComponent } from './components/home.component';
import history from './history';

const LoginComponent = lazy(() => import('./components/login.component').then(({LoginComponent}) => ({default: LoginComponent})))
const ReimbursementComponent = lazy(() => import('./components/reimbursements.component').then(({ReimbursementComponent}) => ({default: ReimbursementComponent})))

function App() {
  const isManager = localStorage.getItem('userRole') === 'manager';  
  return (
    <BrowserRouter >
      <div className="App">
        <main>
          <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/">
              <LoginComponent />
            </Route>
            <div><NavbarComponent />
            <Route path="/reimbursements">
              <ReimbursementComponent />
            </Route>
            <Route path="/reimbursementmanager">
              { isManager ? (<ReimbursementManagerComponent />) : (<Redirect to="/" />)}
            </Route>
            <Route path="/home">
              <HomeComponent />
            </Route>
            </div>
          </Switch>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
