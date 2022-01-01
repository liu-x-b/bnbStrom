import Vue from 'vue'
const address = require('./address.json')
const bnbStormAbi = require('./bnbStormAbi.json')

const Web3 = require('web3')


import big from "big.js";
big.NE = -40
big.PE = 40

var  tronWeb = null; 
var  walletAddress = null;
let web3 = undefined
let connectedChainId = null
let connectedNetwork = ''
let currWalletAddress = undefined
let connectedMainNetwork 

const initWeb3 = () => {
    if(window.tronWeb){
      tronWeb =  window.tronWeb; 
      walletAddress = tronWeb.defaultAddress.base58;
    }
}
 
const connectWallet = () => {
    console.log("进来了")
    if(window.tronWeb){
      tronWeb =  window.tronWeb; 
      walletAddress = tronWeb.defaultAddress.base58;
      console.log("当前钱包地址："+ tronWeb.defaultAddress.base58)
    }
}
initWeb3()

const onEthereumEvent = () => {
  let ethereum = window.ethereum;
  if (ethereum && ethereum.isMetaMask) {
    ethereum.on('accountsChanged', (accounts) => {
      // Handle the new accounts, or lack thereof.
      // "accounts" will always be an array, but it can be empty.
      Vue.prototype.$eventHub.$emit('walletChanged', null);
    });

    ethereum.on('chainChanged', (chainId) => {
      // Handle the new chain.
      // Correctly handling chain changes can be complicated.
      // We recommend reloading the page unless you have a very good reason not to.
      // window.location.reload();
      Vue.prototype.$eventHub.$emit('walletChanged', null);
      getNetwork();
    });
  }
}
onEthereumEvent();

let contracts = {
  bnbStormAddress: address.bnbStorm,
  bnbStormContract: web3 ? new web3.eth.Contract(bnbStormAbi, address.bnbStorm) : '', 
}

const commonCallAndHandler = (method, ...params) => {
  return new Promise((resolve, reject) => {
    method(...params).call({ from: currWalletAddress }).then(result => {
      resolve(result);
    }).catch(error => {
      reject(error);
    })
  })
}


const commonSend = (method, ...params) => {
  return new Promise((resolve, reject) => {
    return method(...params).send({ from: currWalletAddress }).then(result => {
      resolve(result);
    }).catch(error => {
      reject(error);
    })
  })
}

const commonSendAndETH = (method,amount, ...params) => {
  return new Promise((resolve, reject) => {
    return method(...params).send({ from: currWalletAddress ,value: amount}).then(result => {
      resolve(result);
    }).catch(error => {
      reject(error);
    })
  })
}

//                     bnbstorm
// 查信息
const getUserInfo = () => { 
  return commonCallAndHandler(contracts.bnbStormContract.methods.userInfo,currWalletAddress);
}

// 领取奖励
const getMyWithdraw = () => { 
  return commonSend(contracts.bnbStormContract.methods.withdraw );
}

// 质押
const depositETH = (day , ref, amount) => { 
  let _amount = big(amount).times(10**18).toString();
  return commonSendAndETH(contracts.bnbStormContract.methods.deposit ,_amount , day , ref);
}



//                     Tool
// 当前文件变量
const getConnectedChainId = () => {
  return connectedChainId
}

const getConnectedNetwork = () => {
  return connectedNetwork
}

const getWeb3 = () => {
  return web3
}

const toBigNumber = () => {
  return web3.utils.toBN
}


const getContractsAddress = () => {
  return address
}

const getCurrWalletAddress = () => {
  return currWalletAddress;
}

const getETHBalance = () => {
  return web3.eth.getBalance(currWalletAddress)
}


export default {
  initWeb3, 
  getConnectedChainId,
  getConnectedNetwork,
  getWeb3,
  toBigNumber, 
  getContractsAddress,
  getCurrWalletAddress,
  connectWallet,
 

  getUserInfo,
  getMyWithdraw,


  getETHBalance,
  depositETH,
}
