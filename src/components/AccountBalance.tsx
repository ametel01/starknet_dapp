import React from 'react'
import { stark, Provider } from 'starknet';
//import { getStarknet } from "@argent/get-starknet"
const { getSelectorFromName } = stark;


const CONTRACT_ADDRESS = "0x01569284542e8d4f9aa6dbf3ed66efcb3a5eff2255da6db6b33a68dbe1fb49cf";
const provider = new Provider()



export default function AccountBalance() {
       
    const [balance, setBalance] = React.useState<number>();
    const getBalance = async () => {
        const data = await provider.callContract({
            contract_address: CONTRACT_ADDRESS, 
            entry_point_selector: getSelectorFromName('get_balance'),
        })
        //const bal = await data;
        const bal = parseInt(data.result[0],16);
        setBalance(bal);
        console.log(bal);
        
    }
    getBalance();


    
    return (
       <div>
          <button onClick={ async () => { await getBalance()}}>Balance</button>
          <h2> { balance }</h2>
       </div>
    )
}
