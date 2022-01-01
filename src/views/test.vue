<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <button @click="linkWallet">
      连接钱包
    </button>
    <button @click="getBalance">
      获取钱包TRX余额
    </button>
    <button @click="transaction">
      TRX转账交易
    </button>
    <button @click="transactionToken">
      TRX-ERC20转账交易
    </button>
    <button @click="transactionContract">
      合约方法调用
    </button>
    <button @click="getTokenBalance">
      查询USDT余额
    </button>
    <button @click="getOrderInfo">
      查询投资信息
    </button>
    <button @click="withdrawProfit">
      收益取款
    </button>
     <button @click="transactionTokens">
      转账USDT
    </button>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'tron-web-dapp',
      tronWeb:null,
      walletAddress:null
    }
  },
  mounted () {  
    if(window.tronWeb){
      this.tronWeb =  window.tronWeb; 
      this.walletAddress = this.tronWeb.defaultAddress.base58;
    }
  },
  methods: {
    linkWallet(){
      if(window.tronWeb){ 
        this.tronWeb =  window.tronWeb;
        this.walletAddress = this.tronWeb.defaultAddress.base58;
        console.log("当前钱包地址："+this.tronWeb.defaultAddress.base58)
      } 
    },
    // 查询钱包余额
    async getBalance()  {
      //当前连接的钱包地址获取 window.tronWeb.defaultAddress.base58
      var balance = await this.tronWeb.trx.getBalance(this.walletAddress);
      console.log("balance=",balance/Math.pow(10,6))
    },
    //查询USDT余额
    async getTokenBalance()  {
      //当前连接的钱包地址获取 window.tronWeb.defaultAddress.base58
      let contract = await this.tronWeb.contract().at("TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t");
      let balance = await contract.balanceOf(this.walletAddress).call();
      console.log("balance=",balance.toNumber()/Math.pow(10,6))
    },
    //trx转账交易
    async transactionTrx() {
      var tx = await this.tronWeb.transactionBuilder.sendTrx(
        "TN9RRaXkCFtTXRso2GdTZxSxxwufzxLQPP",10 * Math.pow(10,6),this.walletAddress
      );
      var signedTx = await this.tronWeb.trx.sign(tx);
      var broastTx = await this.tronWeb.trx.sendRawTransaction(signedTx);
      console.log(broastTx)
    },
    //trx-token转账交易
    async transactionTokens() {
      let tokenAddress = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
      //先判断是什么代币充值  换算充值数量
      let amount = 10 * Math.pow(10,6)
      let contract = await this.tronWeb.contract().at(tokenAddress);
      let result = await contract.transfer(
        "TECw1G2PYHbAV58SMUyA94sM5pVvqfWiiY",//接收方地址
        this.tronWeb.toHex(amount)//转账数量
      ).send({
        feeLimit: 10000000
      }).then(output => {console.log('- Output:', output, '\n');});
      console.log('result: ', result);

      //转账方式2
      /*const parameter = [{type:'address',value:'TN9RRaXkCFtTXRso2GdTZxSxxwufzxLQPP'},{type:'uint256',value:this.tronWeb.toHex(25 * Math.pow(10,18))}]
      var tx  = await this.tronWeb.transactionBuilder.triggerSmartContract("TURwoLuFy7maq1Vea7wVwRNz3HgmcAsJzb", "transfer(address,uint256)", {},parameter,this.walletAddress);
      var signedTx = await this.tronWeb.trx.sign(tx.transaction);
      var broastTx = await this.tronWeb.trx.sendRawTransaction(signedTx);
      console.log(broastTx)*/

      /*let contract = await this.tronWeb.contract().at("TURwoLuFy7maq1Vea7wVwRNz3HgmcAsJzb");
     let result1 = await contract.decimals().call();
     console.log('result: ', result1);*/
    },
    //第一步授权
    async approve(){
      //投资额度
      let amount = 1000000000 *  Math.pow(10,18);
      console.log(amount)
      let contractTokenAddress = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";

      let contract = await this.tronWeb.contract().at(contractTokenAddress);
      await contract.approve(
        "TDxcZHYJxvVzCbhkvBpkTn8iiLisufGk5Y",
        amount.toString()
      ).send({
        feeLimit: 50000000
      }).then(hash => {
        if(hash){
          console.log(hash)
        }
      });
    },
    //第二步投资
    async registration(){
      //投资额度
      let amount = 100 *  Math.pow(10,18);
      let contract = await this.tronWeb.contract().at("TDxcZHYJxvVzCbhkvBpkTn8iiLisufGk5Y");
      await contract.registration(
        "推荐人地址",
        amount
      ).send({
        feeLimit: 50000000
      }).then(hash => {
      });
    },
    //查询投资信息
    async getOrderInfo(){
      let tronWeb = this.tronWeb;
      let contract = await this.tronWeb.contract().at("TDxcZHYJxvVzCbhkvBpkTn8iiLisufGk5Y");
      contract.userInfos(this.walletAddress).call().then(result => {
        console.log("推荐人地址=",tronWeb.address.fromHex(result.referrerAddress))//推荐人地址
        console.log("投资数量=",result.investmentAmount.toNumber()/Math.pow(10,6))//投资数量
        console.log("收益上限=",result.maxProfitAmount.toNumber()/Math.pow(10,6))//收益上限
        console.log("已领取收益=",result.useProfitAmount.toNumber()/Math.pow(10,6))//已领取收益
        console.log("可领取收益=",result.getProfitAmount.toNumber()/Math.pow(10,6))//可领取收益
        console.log("直推人数=",result.refereesNumber.toNumber())//直推人数
        console.log("间推人数=",result.indirectNumber.toNumber())//间接人数
      });
    },
    //收益取款 注：需要判断 可领取收益 大于0
    async withdrawProfit(){

      //调用方式1
      let contract = await this.tronWeb.contract().at("TDxcZHYJxvVzCbhkvBpkTn8iiLisufGk5Y");
      let result = await contract.userProfitWithdraw().send({
        feeLimit: 50000000
      }).then(output => {console.log('- Output:', output, '\n');});
      console.log('result: ', result)
    },
    //trx转账交易
    async transaction() {
      var tx = await this.tronWeb.transactionBuilder.sendTrx(
        "TN9RRaXkCFtTXRso2GdTZxSxxwufzxLQPP",10 * Math.pow(10,6),this.walletAddress
      );
      var signedTx = await this.tronWeb.trx.sign(tx);
      var broastTx = await this.tronWeb.trx.sendRawTransaction(signedTx);
      console.log(broastTx)
    },
    //trx-token转账交易
    async transactionToken() {
      //说的是先只有usdt充值
      let token = "USDT";
      let tokenAddress = "";
      //usdt 和 fc 代币地址
      let usdtAddress = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
      let fcAddress = "TXkroJUq75qQKZWF3mk9oh6vAJEWfDHLxs";

      //先判断是什么代币充值  换算充值数量
      let amount = 5; //充值 5个代币数量
      if(token == "USDT"){
        amount = amount  * Math.pow(10,18);
        tokenAddress = usdtAddress
      }else if(token == "FC"){
        amount = amount * Math.pow(10,6)
        tokenAddress = fcAddress
      }
      let contract = await this.tronWeb.contract().at(tokenAddress);
      let result = await contract.transfer(
        "TT2J4zrNJYnnWs8QXyJowmcNEx61YHbKXX",
        this.tronWeb.toHex(amount)
      ).send({
        feeLimit: 10000000
      }).then(output => {console.log('- Output:', output, '\n');});
      console.log('result: ', result);

      //转账方式2
      /*const parameter = [{type:'address',value:'TN9RRaXkCFtTXRso2GdTZxSxxwufzxLQPP'},{type:'uint256',value:this.tronWeb.toHex(25 * Math.pow(10,18))}]
      var tx  = await this.tronWeb.transactionBuilder.triggerSmartContract("TURwoLuFy7maq1Vea7wVwRNz3HgmcAsJzb", "transfer(address,uint256)", {},parameter,this.walletAddress);
      var signedTx = await this.tronWeb.trx.sign(tx.transaction);
      var broastTx = await this.tronWeb.trx.sendRawTransaction(signedTx);
      console.log(broastTx)*/

      /*let contract = await this.tronWeb.contract().at("TURwoLuFy7maq1Vea7wVwRNz3HgmcAsJzb");
     let result1 = await contract.decimals().call();
     console.log('result: ', result1);*/
    },
    //调用合约中的方法
    async transactionContract(){

      //调用方式1
      /*let contract = await this.tronWeb.contract().at("TSbJGFA8UyYGTuXBRbYB2GJeh2CY1X5F4d");
      console.log("contract=",contract)
      let result = await contract.registrationExt(
        "TN9RRaXkCFtTXRso2GdTZxSxxwufzxLQPP"
      ).send({
        callValue: this.tronWeb.toHex(25 * Math.pow(10,6)),//发送TRX余额
        feeLimit: 10000000
      }).then(output => {console.log('- Output:', output, '\n');});
      console.log('result: ', result)*/

      //调用方式2
      const parameter = [{type:'address',value:'TN9RRaXkCFtTXRso2GdTZxSxxwufzxLQPP'}];
      var tx  = await this.tronWeb.transactionBuilder.triggerSmartContract(
        "TSbJGFA8UyYGTuXBRbYB2GJeh2CY1X5F4d",
        "registrationExt(address)",
        {},
        parameter,
        this.walletAddress
      );
      var signedTx = await this.tronWeb.trx.sign(tx.transaction);
      var broastTx = await this.tronWeb.trx.sendRawTransaction(signedTx);
      console.log(broastTx)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
