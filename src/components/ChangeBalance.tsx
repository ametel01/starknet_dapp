import React from 'react'
import { stark, Provider } from 'starknet';
import { getStarknet } from "@argent/get-starknet"
const { getSelectorFromName } = stark;


const CONTRACT_ADDRESS = "0x01569284542e8d4f9aa6dbf3ed66efcb3a5eff2255da6db6b33a68dbe1fb49cf";
const provider = new Provider();

export default function ChangeBalance() {
    const starknet = getStarknet({ showModal: true })

    const addToBalance = async () => {
        const [userWalletContractAddress] = await starknet.enable();
        console.log(userWalletContractAddress);
        if(starknet.isConnected) {
            const transaction = await starknet.signer.addTransaction({
                type: 'INVOKE_FUNCTION',
                contract_address: CONTRACT_ADDRESS,
                entry_point_selector: getSelectorFromName('increase_balance'),
                calldata: ['1'],
            });
            console.log(transaction);
        } else {
            console.log('wallet not connected')
        }
    }
    
    return (
        <div>
           <button onClick={ async () => { await addToBalance()}}>Increase Balance</button> 
        </div>
    )
}
