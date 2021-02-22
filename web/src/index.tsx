import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
// tslint:disable-next-line:no-import-side-effect
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
// tslint:disable-next-line:no-import-side-effect
import './common/util/array';
import React from 'react';
import ReactDOM from 'react-dom';
// tslint:disable-next-line:no-import-side-effect
import './index.scss';
import * as serviceWorker from './serviceWorker';
import {configureFontAwesome} from './font-awesome-config';
import App from './App';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import {validateEnvironment} from './env';
// tslint:disable-next-line:no-import-side-effect
import './dark-mode.scss';
import {configureTheme} from './appTheme';
validateEnvironment();
configureTheme();
configureFontAwesome();

ReactDOM.render((
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
  ), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
