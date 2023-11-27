import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';
import {ChainId, ThirdwebProvider} from '@thirdweb-dev/react';
import { Sepolia } from "@thirdweb-dev/chains";

import App from './App';
import { StateContextProvider } from './context';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <ThirdwebProvider activeChain={Sepolia} clientId="78fd236fd6d2da1eff647508559410ce">
        <Router>
            <StateContextProvider> 
                <App/>
            </StateContextProvider>
        </Router>
    </ThirdwebProvider>
)


