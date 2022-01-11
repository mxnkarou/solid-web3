// Type imports
import type { Component } from 'solid-js';

// CSS Imports
import styles from './App.module.css';

// Functional Imports
import { createSignal } from 'solid-js';
import { ethers } from 'ethers';

// Smart Contract ABI (Application Program Interface) Import
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json';

const greeterAdress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const App: Component = () => {
  const [greeting, setGreetingValue] = createSignal('');

  // Prompts user to connect the MetaMask Wallet & returns the Accounts (Array).
  const requestAccount = async () => {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  };

  const fetchGreeting = async () => {
    // Check if MetaMask exists.
    if (typeof window.ethereum !== 'undefined') {
      // Set Web3Provider to MetaMask.
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // Initialize a new contract instance by passing the Adress, ABI & the current provider.
      const contract = new ethers.Contract(
        greeterAdress,
        Greeter.abi,
        provider
      );
      try {
        // Now we have access to the contract methods.
        const data = await contract.greet();
        console.log('Data: ', data);
      } catch (err) {
        console.log('Error: ', err);
      }
    }
  };

  const setGreeting = async () => {
    // Check if user has entered a Greeting input.
    if (!greeting()) return;
    // Check if MetaMask is installed.
    if (typeof window.ethereum !== 'undefined') {
      // Request user to enable their account.
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // Create a signer to sign transactions.
      const signer = provider.getSigner();
      // Initialize a new contract instance - this time, by passing the signer.
      const contract = new ethers.Contract(greeterAdress, Greeter.abi, signer);
      // Call the Smart Contract method with user input.
      const transaction = await contract.setGreeting(greeting());
      // Wait until the transaction has finalized.
      await transaction.wait();
      // Fetch the new greeting & log it to the console.
      fetchGreeting();
    }
  };

  // Typesafe Input Handler.
  const handleInput = (e: Event) => {
    const { target } = e;

    if (target) {
      setGreetingValue((target as HTMLButtonElement).value);
    }
  };

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <div>
          <button onClick={fetchGreeting}>Fetch Greeting!</button>
        </div>
        <div>
          <input
            onInput={handleInput}
            placeholder="Greeting Input"
            value={greeting()}
          />
          <button onClick={setGreeting}>Set Greeting!</button>
        </div>
      </header>
    </div>
  );
};

export default App;
