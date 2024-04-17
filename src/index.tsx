import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import {BrowserRouter, HashRouter} from "react-router-dom";
import {RecoilRoot} from "recoil";

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
    <React.StrictMode>
        <HashRouter>
            <RecoilRoot>
                <App/>
            </RecoilRoot>
        </HashRouter>
    </React.StrictMode>
);

