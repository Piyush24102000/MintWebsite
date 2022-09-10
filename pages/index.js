import { useState } from 'react'
//import styles from '../styles/Home.module.css'
import MainMint from "./MainMint.js";
import NavBar from './NavBar';

export default function Home() {
  const [accounts, setAccounts] = useState([]);

  return (
    <div className='overlay'>
    <div className="App">
      <NavBar accounts={accounts} setAccounts={setAccounts} />
      <MainMint accounts={accounts} setAccounts={setAccounts} />
    </div>
    <div className='moving-background'></div>
    </div>
  )
}
