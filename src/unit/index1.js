import Vue from 'vue'
const address = require('./address.json')
const bnbStormAbi = require('./bnbStormAbi.json')

const Web3 = require('web3')


import big from "big.js";
big.NE = -40
big.PE = 40

let web3 = undefined
let connectedChainId = null
let connectedNetwork = ''
let currWalletAddress = undefined
let connectedMainNetwork 

const initWeb3 = async () => {
  let web3Provider
  let ethereum = window.ethereum
  if (ethereum) {
    await connectMetaMask()
    connectWallet()
  } else if (window.web3) {
    web3Provider = window.web3.currentProvider
    if (typeof web3Provider !== 'undefined') {
      web3 = new Web3(web3Provider)
      getNetwork()
      connectWallet()
      console.log('Connected wallet success!')
    } else {
      console.log('Connected wallet failed!')
    }
  }
}

const connectMetaMask = () => {
  return new Promise((resolve, reject) => {
    let web3Provider
    let ethereum = window.ethereum
    if (ethereum) {
      web3Provider = ethereum
      try {
        // user auth
        if (ethereum.request != undefined) {
          ethereum.request({ method: 'eth_requestAccounts' })
        } else {
          ethereum.enable()
        }
        resolve(true)
      } catch (error) {
        // user not auth
        reject(error && error.message ? error.message : error)
      }
    } else {
      reject('No Ethereum')
    }

    if (typeof web3Provider !== 'undefined') {
      web3 = new Web3(web3Provider)
      getNetwork()
      if (ethereum.isMetaMask) {
        currWalletType = 'MetaMask'
      } else {
        currWalletType = 'Ethereum'
      }
    }
  })
}

const getNetwork = () => {
  if (!web3 || !web3.eth) {
    connectedMainNetwork = false
    connectedNetwork = ''
    connectedChainId = null
    return
  }
  web3.eth.net.getId().then(res => {
    connectedChainId = res
    if (res === 1) {
      connectedMainNetwork = true
      connectedNetwork = 'Main'
    } else if (res === 3) {
      connectedNetwork = 'Ropsten'
    } else if (res === 42) {
      connectedNetwork = 'Kovan'
    } else if (res === 4) {
      connectedNetwork = 'Rinkeby'
    } else if (res === 5) {
      connectedNetwork = 'Goerli'
    } else {
      connectedMainNetwork = false
      connectedNetwork = ''
    }
  })
}

// let oklinkInfo=[{
//     chainId: '0x61',
//     chainName: 'BSC',
//     nativeCurrency:
//         {
//             name: 'BNB',
//             symbol: 'BNB',
//             decimals: 18
//         },
//     rpcUrls: ['https://bsc-dataseed1.binance.org/'],
//     blockExplorerUrls: ['https://bscscan.com/'],
// }]
// let oklinkInfo=[{
//     chainId: '0x4',
//     chainName: 'Rinkeby',
//     nativeCurrency:
//         {
//             name: 'ETH',
//             symbol: 'ETH',
//             decimals: 18
//         },
//     rpcUrls: ['https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
//     blockExplorerUrls: ['https://rinkeby.etherscan.io'],
// }]


// window.ethereum.request({method: 'wallet_addEthereumChain', params:oklinkInfo})


const connectWallet = () => {
  return new Promise((resolve, reject) => {
    if (web3 == undefined) {
      currWalletAddress = undefined;
      reject("no wallet")
      return;
    }
    web3.eth.getAccounts().then(accounts => {
      if (accounts.length > 0) {
        currWalletAddress = accounts[0];
      } else {
        currWalletAddress = undefined;
      }
      resolve(currWalletAddress)
    }).catch((err) => {
      currWalletAddress = undefined;
      console.error('web3.eth.getAccounts error :' + err)
      reject(err)
    })
  })
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
  connectMetaMask,
  getConnectedChainId,
  getConnectedNetwork,
  getWeb3,
  toBigNumber,
  initWeb3,
  getContractsAddress,
  getCurrWalletAddress,
  connectWallet,
 

  getUserInfo,
  getMyWithdraw,


  getETHBalance,
  depositETH,
}
