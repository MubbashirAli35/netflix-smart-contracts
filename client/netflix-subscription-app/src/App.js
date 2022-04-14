import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import configuration from './NetflixSmartContract.json';
import Web3 from 'web3';

const netflixAccount = '0x9626ACF4BADd095A0e2Ff72D3D35B515f9979701';
const contractAddress = configuration.networks["5777"].address;
const contractAbi = configuration.abi;

const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
const contract = new web3.eth.Contract(contractAbi, contractAddress);

let counter = 0;

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const onSubmit = async () => {
    const accounts = await web3.eth.requestAccounts();
    let account = accounts[0];

    console.log({
      'name': name, 
      'netflixAccount': netflixAccount, 
      'counter': counter, 
      'email': email
    })

    await contract.methods.subscribe(name, netflixAccount, counter++, email).send({
      from: account, 
      value: 1e17
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ width: '40%' }} >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label>Full Name</label>
            <input id = "name" onChange={(e) => setName(e.target.value)}></input>
          </div>

          <br></br>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label>Email</label>
            <input id="email" onChange={(e) => setEmail(e.target.value)}></input>
          </div>

          <br></br>

          <button onClick={onSubmit}>
            Subscribe for 0.1 Ether
          </button>
          
        </div>
      </header>
    </div>
  );
}

export default App;
