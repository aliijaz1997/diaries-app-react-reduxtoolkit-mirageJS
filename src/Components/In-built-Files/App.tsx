import React, { FC, lazy, Suspense } from 'react';
import { useSelector } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { combinereducertype } from "./../ReduxStore/combinereducers";
import './App.css';
const Home = lazy(() => import('./userinterface/home'));
const Auth = lazy(() => import('./userinterface/auth'))
const App: FC = () => {
  const islogin = useSelector(
    (state: combinereducertype) => state.auth.isuserauthenticated
  )
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" >
            <Suspense fallback={<div>loading...</div>}>
              {islogin ? <Home /> : <Auth />}
            </Suspense>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
