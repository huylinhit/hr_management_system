import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router/router';
import { Provider } from 'react-redux';
import { store } from './app/store/configureStore';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
try{
  root.render(
    // <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
    // </React.StrictMode>
  );
}catch(error){
  console.log(error);
}
 

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
