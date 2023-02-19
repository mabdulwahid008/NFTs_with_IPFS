import './App.css';
import react, { useEffect, useRef, useState } from 'react'
import * as ethers from 'ethers'
import Web3Modal from 'web3modal'
import { NFT_CONTRACT_ABI, NFT_CONTRACT_ADDRESS } from "./constansts/index"

function App() {
  const [walletConnected, setwalletConnected] = useState(false)
  const web3ModalRef = useRef()

  const getTokenIds = async() => {
    const provider = await getProviderOrSigner()
    const contract = new ethers.Contract(
      NFT_CONTRACT_ADDRESS,
      NFT_CONTRACT_ABI,
      provider
    )

    const _tokenIds = await contract.tokenIds()
    console.log("tokenIds", _tokenIds.toString());
  }

  const getProviderOrSigner = async(needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new ethers.BrowserProvider(provider)

    const { chainId } = await web3Provider.getNetwork()

    if(chainId != 80001){
      window.alert("Change network to Mumbai");
      throw new Error("Change network to Mumbai")
    }

    if(needSigner){
      const signer = await web3Provider.getSigner()
      return signer;
    }
    return web3Provider;
  }

  const connectwallet = async() => {
    try {
      await getProviderOrSigner()
      setwalletConnected(true)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if(!walletConnected){
      web3ModalRef.current = new Web3Modal({
        network: 'mumbai',
        providerOptions: {},
        disableInjectedProvider: false
      })
      connectwallet()
    }
    getTokenIds()
  }, [])
  
  return (
    <div className="App">
      Hello 
    </div>
  );
}

export default App;
