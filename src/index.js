import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import { ContactProvider } from './ContactContext'

ReactDOM.render(
  <React.StrictMode>
    <ContactProvider>
      <App />
    </ContactProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

//We import the component and add the tags around <App />. 
// Now, <App /> is passed as props.children to our ContactProvider 
//component and is therefore wrapped in our <ContactContext.Provider> tags.