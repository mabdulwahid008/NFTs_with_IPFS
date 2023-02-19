import React, { useEffect, useRef, useState } from 'react'
import { Contract, providers } from "ethers";
import './App.css'
import Web3Modal from 'web3modal'
import { NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI } from './constants/index'

function App() {
  const [walletConnected, setWalletConnected] = useState(false)

  const web3ModalRef = useRef()

  const getTokenIds = async() => {
    try {
      // const provider = await getProviderOrSigner();

      // const contract = new Contract(
      //   NFT_CONTRACT_ADDRESS,
      //   NFT_CONTRACT_ABI,
      //   provider
      // )

      // const _tokenIds = await contract.tokenIds()
      // console.log();
    } catch (error) {
      console.error(error);
    }
  }

  const getProviderOrSigner = async (needSigner = false) => {
    const provider = web3ModalRef.current.connect()
    const web3Provider = new providers.web3Provider(provider)

    // const { chainId } = await web3Provider.getNetwork();
    // if (chainId !== 80001) {
    //   window.alert("Change the network to Mumbai");
    //   throw new Error("Change network to Mumbai");
    // }

    // if (needSigner) {
    //   const signer = web3Provider.getSigner();
    //   return signer;
    // }
    // return web3Provider;
  }
  const connectWalledt = async() => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if(!walletConnected){
      web3ModalRef.current = new Web3Modal({
        network: "mumbai",
        providerOptions: {},
        disableInjectedProvider: false
      })
      // connectWalledt()
    }
  }, [])
  
  
  return (
    <div className='main'>
       <div>
          <h1 className="title">Welcome to LW3Punks!</h1>
          <div className="description">
            Its an NFT collection for LearnWeb3 students.
          </div>
          <div className="description">
            {/* {tokenIdsMinted}/10 have been minted */}
          </div>
          {/* {renderButton()} */}
        </div>
        <div>
          <img className="image" src="./LW3punks/1.png" />
        </div>
    </div>
  )
}

export default App