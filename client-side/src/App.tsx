import React, { lazy, Suspense } from 'react';
import './App.css';
import { NavbarComponent } from './components/navbar.component';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
//import { ReimbursementComponent } from './components/reimbursements.component';
//import { HomeComponent } from './components/home.component';
import { UploadComponent } from './components/upload.component';

const HomeComponent = lazy(() => import('./components/home.component').then(({HomeComponent}) => ({default: HomeComponent})))
const ReimbursementComponent = lazy(() => import('./components/reimbursements.component').then(({ReimbursementComponent}) => ({default: ReimbursementComponent})))

function App() {
  const isManager = localStorage.getItem('userRole') === 'manager';  
  return (
    <BrowserRouter>
      <div className="App">
        <NavbarComponent />
        <main>
          <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/">
              <HomeComponent />
            </Route>
            <Route path="/reimbursements">
              <ReimbursementComponent />
            </Route>
            <Route path="/upload">
              { isManager ? (<UploadComponent />) : (<Redirect to="/" />)}
            </Route>
          </Switch>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
