import { render } from 'solid-js/web';

import './index.css';
import App from './App';

// Globally declare an extension of the new window property "ethereum" is of type any.
// Bypass (window as any).ethereum
declare global {
  interface Window {
    ethereum: any;
  }
}

render(() => <App />, document.getElementById('root') as HTMLElement);
