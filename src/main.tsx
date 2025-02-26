import { createRoot } from 'react-dom/client'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.tsx'

const auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN;
const auth0ClientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

createRoot(document.getElementById('root')!).render(
<Auth0Provider
    domain={auth0Domain}
    clientId={auth0ClientId}
    authorizationParams={{
      redirect_uri: window.location.origin,
      useRefreshTokens: true, // Enables silent authentication
      cacheLocation: "localstorage", // Stores tokens across refreshes
    }}
    
  >
    <App />
  </Auth0Provider>,
)
