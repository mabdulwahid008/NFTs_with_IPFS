import './App.css';
import react, { useEffect, useRef, useState } from 'react'
import {utils, providers, Contract } from 'ethers'
import Web3Modal from 'web3modal'
import img from './LW3Punks/1.png'
import { NFT_CONTRACT_ABI, NFT_CONTRACT_ADDRESS } from "./constansts/index"

function App() {
  const [walletConnected, setwalletConnected] = useState(false)
  const [loading, setLoading] = useState(false)
  const [tokenIds, setTokenIds] = useState(0)
  const web3ModalRef = useRef()

  const publicmint = async( ) => {
    const signer = await getProviderOrSigner(true);
    
    const contract = new Contract(
      NFT_CONTRACT_ADDRESS,
      NFT_CONTRACT_ABI,
      signer
      )
      const tx = await contract.mint({
        value: utils.parseEther("0.5"),
      });

    setLoading(true)
    await tx.wait()
    setLoading(false)
    await getTokenIds()
  }
  const getTokenIds = async() => {
    const provider = await getProviderOrSigner(true)

    const contract = new Contract(
      NFT_CONTRACT_ADDRESS,
      NFT_CONTRACT_ABI,
      provider
    )

    const _tokenIds = await contract.tokenIds()
    // console.log(_tokenIds);
    setTokenIds(_tokenIds.toString())
  }

  const getProviderOrSigner = async(needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    const { chainId } = await web3Provider.getNetwork();

    // if(chainId != 80001){
    //   window.alert("Change network to Mumbai");
    //   throw new Error("Change network to Mumbai")
    // }
    // console.log(chainId);
    if(chainId != 5){
      window.alert("Change network to Goerli");
      throw new Error("Change network to Goerli")
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
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

  const renderButton = ( ) => {
    if (!walletConnected) {
      return (
        <button onClick={connectwallet} className="button">
          Connect your wallet
        </button>
      );
    }

    if (loading) {
      return <button className="button">Loading...</button>;
    }

    return (
      <button className="button" onClick={publicmint}>
        Public Mint 🚀
      </button>
    );
  }

  useEffect(() => {
    if(!walletConnected){
      web3ModalRef.current = new Web3Modal({
        network: 'goerli',
        providerOptions: {},
        disableInjectedProvider: false
      })
      connectwallet()
    }
    getTokenIds()
  }, [])
  
  return (
    <div className="main">
    <div>
      <h1 className="title">Welcome to LW3Punks!</h1>
      <div className="description">
        Its an NFT collection on testnet.
      </div>
      <div className="description">
        {tokenIds}/10 have been minted
      </div>
      {renderButton()}
    </div>
    <div>
      <img className="image" src={img} />
    </div>
  </div>

  );
}

export default App;
