<template>
<div>
	 <section class="first-screen">
    <video src="../assets/video.mp4" autoplay="" loop="" playsinline="" muted=""></video>
    <!-- header -->

    <header class="header">
      <div class="container-info">
        <div class="container-header">
          <a href="#" class="container-logo">
            <div class="logo">
              <!-- <img src="/Users/lixing/Library/Containers/com.tencent.xinWeChat/Data/Library/Application%20Support/com.tencent.xinWeChat/2.0b4.0.9/b8c55c3a282d0d1bd70cdd3e1a387a5b/Message/MessageTemp/6d201980017f4429903943b6a3e6a556/File/logo%E6%94%B9.svg" alt="bnbstorm"/> -->
              <img src="../assets/logo.png" alt="logo">
            </div>
          </a>
          <div class="header-contacts" >
            <div class="container-btn-contacts" @click="linkPay" >
              <button type="button" class="btn-contact connect">
                <span id="buttonConnectContent" v-if="myAddress == undefined">Connect</span> 
                <span id="buttonConnectContent" v-else>{{myAddress}}</span> 
              </button>
            </div> 

            <ul class="contact-list">
              <li class="item-list telegram">
                <a href="https://t.me/joinchat/y_rx3fjFy0cwZTAx" target="_blank" class="item-link"></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
    <div class="container-first-screen">
      <div class="container-info">
        <div class="container-info-screen">
          <div class="screen-block">
            <div class="text-container">
              <h1 class="main-title">
                Smartest System
                of investing in
                <span>TCH</span>
              </h1>
              <p class="sub-title-main">
                From 3.5% to <span>15% Month</span>
              </p>
              <button type="button" class="pink-btn mobile-block" id="depositRouterButton">
                Deposit
              </button>
            </div>
          </div>
          <div class="screen-block right-screen">
            <div class="container-result">
              <div class="block-result">
                <p class="result" id="totalCurrencyInvested1">{{NumSplicFn(contractMsg._invested,2)}}</p>
                <div class="sub-text-result">
                  <span>Total</span>
                  <span class="pink-text">TCH</span>
                  <span class="bold-text">Invested</span>
                </div>
              </div>
              <div class="block-result">
                <p class="result" id="totalReferralReward1">{{NumSplicFn(contractMsg._withdrawn,2)}}</p>
                <div class="sub-text-result">
                  <span>Total Referral</span>
                  <span class="pink-text">TCH</span>
                  <span class="bold-text">Reward</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- first section -->

  <section class="section-info">
    <div class="calculate-block-container">
      <div class="container-info">
        <div class="header-section">
          <h2 class="title-header" id="investmentSectionTitle">
            Calculate Profit
          </h2>
        </div>

        <div class="container-calculate-info">
          <div class="container-counter">
            <div class="deposit-block deposit">
              <h3 class="title-deposit">
                Deposit Period (days):
              </h3>
              <div class="container-slider" id="slider-container">
                <div
                  class="container-slider-range ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all"
                  id="js-slider">
                  <div class="slider-range-inverse" :style="'width:'+ moveLengthSub +'%;'"></div>
                  <div class="ui-slider-range ui-widget-header ui-corner-all ui-slider-range-min" style="width: 100%;">
                  </div>
                  <span class="ui-slider-handle ui-state-default ui-corner-all" tabindex="0"
                    :style="'left:' + moveLength+'%;'"  v-if="ispc"
            @mousedown="handleDragStartPc"><span class="mark" id="depositPeriodDays">{{day}}</span><span class="dot"><span
                        class="handle-track" style="width: 294px; left: -88.2px;"></span></span></span>
                  <span class="ui-slider-handle ui-state-default ui-corner-all" tabindex="0"
                    :style="'left:' + moveLength+'%;'"  v-else
            @touchstart="handleDragStart" @touchmove="touchmoveFn"><span class="mark" id="depositPeriodDays">{{day}}</span><span class="dot"><span
                        class="handle-track" style="width: 294px; left: -88.2px;"></span></span></span>
                </div>
                <ul id="tickmarks" class="datalist">
                  <li>7</li>
                  <!-- <li>20</li> -->
                  <li>30</li>
                </ul>
              </div>
            </div>
            <div class="container-counter-amount">
              <div class="deposit-block">
                <h3 class="title-deposit amount-title">
                  Deposit Amount:
                </h3>
                <div class="amount-field">
                  <input type="number" id="depositAmount" class="amount-input" v-model="depositAmount" min="0">
                  <button class="amount-field-button" id="maxAmountButton" @click="depositAmount = max">Max</button>
                </div>
              </div>
            </div>
          </div>
          <div class="footer-counter">
            <div class="container-footer-info">
              <ul class="list-info">
                <li class="item-info">
                  <h4 class="title-info">
                    Daily ROI:
                  </h4>
                  <p id="dailyRoi">{{NumSplicFn(3.5+(0.5 *(day -7 )),2)}}%</p>
                </li>
                <li class="item-info">
                  <h4 class="title-info">
                    Total Profit:
                  </h4>
                  <p id="totalProfitPercent">{{NumSplicFn(103.5 + (0.5 *(day -7 )),2)}}%</p>
                </li>
                <li class="item-info">
                  <h4 class="title-info">
                    In <span id="days">{{day}}</span> days
                    you will earn:
                  </h4>
                  <p class="pink-text">
                    <span id="profitCurrencyValue">{{NumSplicFn(depositAmount*(103.5 + (0.5 *(day -7 )))/100,2)}}</span> <span>TCH</span>
                  </p>
                </li>
              </ul>
            </div>
            <button type="button" class="pink-btn invest-btn" id="investButton" v-if="approveWait && approveAmount == 0" @click="tokenApprove">approve</button>
            <button type="button" class="pink-btn invest-btn" id="investButton" v-else-if="approveAmount == 0 && !approveWait" disabled="disabled" style="cursor:wait">approve</button>
            <button type="button" class="pink-btn invest-btn" id="investButton" v-else-if="dipositWait && approveAmount != 0" @click="deposit">Invest</button>
            <button type="button" class="pink-btn invest-btn" id="investButton" v-else disabled="disabled" style="cursor:wait">Invest</button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- second section -->

  <section class="dashboard-section">
    <div class="dashboard-block-container">
      <div class="container-info">
        <div class="header-section">
          <h2 class="title-header">
            Dashboard
          </h2>
        </div>

        <div class="container-dashboard-info">
          <div class="container-info-block">
            <ul class="list-dashboard">
              <li class="item-dashboard">
                <div>
                  <h5 class="title-block-item">
                    Withdrawable (Divs+Refs)
                  </h5>
                  <p class="info-item">
                    <span id="toWithdraw">{{NumSplicFn(userMsg.for_withdraw,2)}}</span>
                    <span class="pink-text">TCH</span>
                  </p>
                </div>
              </li>
              <li class="item-dashboard">
                <div>
                  <h5 class="title-block-item">
                    Total Invested
                  </h5>
                  <p class="info-item">
                    <span id="investedByUser">{{NumSplicFn(userMsg.total_invested,2)}}</span>
                    <span class="pink-text">TCH</span>
                  </p>
                </div>
              </li>
              <li class="item-dashboard">
                <div>
                  <h5 class="title-block-item">
                    Total Withdrawal
                  </h5>
                  <p class="info-item">
                    <span id="withdrawalByUser">{{NumSplicFn(userMsg.total_withdrawn,2)}}</span>
                    <span class="pink-text">TCH</span>
                  </p>
                </div>
              </li>
              <li class="item-dashboard">
                <div>
                  <h5 class="title-block-item">
                    Total Referral Reward
                  </h5>
                  <p class="info-item">
                    <span id="refRewardForUser">{{NumSplicFn(userMsg.total_match_bonus,2)}}</span>
                    <span class="pink-text">TCH</span>
                  </p>
                </div>
              </li>
            </ul>
            <button type="button" class="pink-btn withdraw-btn" v-if="withdrawWait" @click="getWithdraw" id="withdrawButton">Withdraw</button>
            <button type="button" class="pink-btn withdraw-btn" v-else disabled="disabled" style="cursor:wait" id="withdrawButton">Withdraw</button>
            <div class="container-footer-dashboard">
              <h3 class="title-footer-dashboard">
                Your Referral Link:
                <span id="refLink">You will get your ref link after investing</span>
                <button class="btn-copy" id="copyButton" @click="copyRef"></button>
                <span class="title-copy" id="copiedSuccessfully" style="display: none;">Copied successfully !</span>
              </h3>
              <ul class="list-footer">
                <li class="item-footer">
                  <h3 class="title-level">
                    1 LVL
                  </h3>
                  <p class="info-level">
                    <span id="referralsCountAtLevel1">{{userMsg.structure[0]}}</span> referrals
                  </p>
                  <p class="info-level">
                    5% Referral Rewards
                  </p>
                </li>
                <li class="item-footer">
                  <h3 class="title-level second-level">
                    2 LVL
                  </h3>
                  <p class="info-level">
                    <span id="referralsCountAtLevel2">{{userMsg.structure[1]}}</span> referrals
                  </p>
                  <p class="info-level">
                    3% Referral Rewards
                  </p>
                </li>
                <li class="item-footer">
                  <h3 class="title-level three-level">
                    3 LVL
                  </h3>
                  <p class="info-level">
                    <span id="referralsCountAtLevel3">{{userMsg.structure[2]}}</span> referrals
                  </p>
                  <p class="info-level">
                    2% Referral Rewards
                  </p>
                </li>
                <li class="item-footer">
                  <h3 class="title-level fourth-level">
                    4 LVL
                  </h3>
                  <p class="info-level">
                    <span id="referralsCountAtLevel4">{{userMsg.structure[3]}}</span> referrals
                  </p>
                  <p class="info-level">
                    1% Referral Rewards
                  </p>
                </li>
                <li class="item-footer">
                  <h3 class="title-level fifth-level">
                    5 LVL
                  </h3>
                  <p class="info-level">
                    <span id="referralsCountAtLevel5">{{userMsg.structure[4]}}</span> referrals
                  </p>
                  <p class="info-level">
                    0.5% Referral Rewards
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- footer -->

  <footer class="footer">
    <div class="container-info">
      <div class="container-footer-info">
        <div class="mobile-flex">
          <div class="container-logo-footer">
            <span>
              © 2021
            </span>
            <span class="logo-span">TCHStorm</span>
          </div>
          <ul class="contact-list mobile-fade">
            <!-- <li class="item-list discord">
                          <a href="" target="_blank" class="item-link"></a>
                      </li> -->
            <li class="item-list telegram">
              <a href="https://t.me/joinchat/y_rx3fjFy0cwZTAx" target="_blank" class="item-link"></a>
            </li>
          </ul>
        </div>
        <div class="container-footer-btn">
          <button type="button" id="contractLink" class="pink-btn footer-btn-contact">
              <a href="https://tronscan.org/#/contract/TXq7iiVq5syHH4xtyTWWAPUpWeXGvJnV6m/code" target="_blank">Smartcontract</a>
              </button>
          <div class="container-list-contact">
            <button type="button" class="btn-contact faq-btn">
              <span>Faq</span>
            </button>
            <ul class="contact-list mobile-block-list">
              <li class="item-list telegram">
                <a href="https://t.me/joinchat/y_rx3fjFy0cwZTAx" target="_blank" class="item-link"></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>

  <!-- popup windows -->

  <div class="wrapper-dark">
    <div class="container-faq">
      <div class="main-container-center">
        <button type="button" class="close-window"></button>
        <div class="faq-block">
          <div class="window-header">
            <h2 class="title-window">
              FAQ
            </h2>
          </div>
          <div class="container-list-faq">
            <ul class="list-faq">
              <li class="item-faq">
                <div class="header-item-faq">
                  <button type="button" class="close-faq-item"></button>
                  <h3 class="title-faq-item">
                    How to participate in TCHStorm?
                  </h3>
                </div>
                <div class="container-info-faq">
                  <p>
                    TCHStorm operates on the Binance Smart Chain and to interact
                    with the contract you need to install the Metamask browser
                    extension (an identical mobile application is also available
                    for IPhone and Android users).
                  </p>
                </div>
              </li>
              <li class="item-faq">
                <div class="header-item-faq">
                  <button type="button" class="close-faq-item"></button>
                  <h3 class="title-faq-item">
                    How to invest in TCHStorm?
                  </h3>
                </div>
                <div class="container-info-faq">
                  <p>
                    Chose the desired Deposit Period for you investment,
                    enter the amount of TCH you'd like to deposit
                    and click invest. That's it.
                  </p>
                </div>
              </li>
              <li class="item-faq">
                <div class="header-item-faq">
                  <button type="button" class="close-faq-item"></button>
                  <h3 class="title-faq-item">
                    What is the difference between different Deposit Periods?
                  </h3>
                </div>
                <div class="container-info-faq">
                  <p>
                    The Deposit Period can be from 7 to 30 days. Keep in
                    mind that different Deposit Periods have different
                    profitability between 119% and 234%. The longer your
                    Deposit Period - the bigger the reward.
                  </p>
                </div>
              </li>
              <li class="item-faq">
                <div class="header-item-faq">
                  <button type="button" class="close-faq-item"></button>
                  <h3 class="title-faq-item">
                    Can I have multiple deposits?
                  </h3>
                </div>
                <div class="container-info-faq">
                  <p>
                    Yes,sure! The number of your deposits is not limited.
                  </p>
                </div>
              </li>
              <li class="item-faq">
                <div class="header-item-faq">
                  <button type="button" class="close-faq-item"></button>
                  <h3 class="title-faq-item">
                    Do you have a referral program?
                  </h3>
                </div>
                <div class="container-info-faq">
                  <p>
                    Yes, our Referral Program features 5 levels
                    of referral rewards. For the friends that
                    you invite you receive % of their deposits.
                    Check the persentages for each level on our website.
                  </p>
                </div>
              </li>
              <li class="item-faq">
                <div class="header-item-faq">
                  <button type="button" class="close-faq-item"></button>
                  <h3 class="title-faq-item">
                    Where can I follow the latest news?
                  </h3>
                </div>
                <div class="container-info-faq">
                  <p>
                    Follow our social media channels where we publish all the latest updates.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>

    <div class="container-connect">
      <button type="button" class="close-window"></button>
      <div class="container-window">
        <div class="header-window">
          <h2 class="title-window">
            Connect wallet
          </h2>
        </div>
        <ul class="list-connect">
          <li class="item-connect metamask" id="metamaskChoosingButton">
            <p>MetaMask</p>
          </li>
          <li class="item-connect binance" id="binanceWalletChoosingButton">
            <p>Binance Chain</p>
          </li>
        </ul>
        <p class="info-window">
          How to connect your wallet
        </p>
      </div>
    </div>
    <div class="container-news">
      <button type="button" class="close-window"></button>
      <div class="container-window">
        <div class="header-window">

          <br>
          <h1 class="title-window">Milestone</h1>
          <br>
          <p>🍓 Upon reaching 1000 TCH on the contract balance, we will distribute 50 TCH among our investors who have
            invested 1 TCH or more since the launch of the promotion!
          </p>
          <br>
          <p>🍇 As we reach 2000 TCH - 100 TCH will be split</p>
          <br>
          <p>🍑 As we reach 5000 TCH - 400 TCH will be split</p>
          <br>
          <p>🍒 As we reach 10,000 TCH - we will split 1,000 TCH!</p>
          <br>
          <p>💫 How to participate</p>
          <br>
          <p>🟢 Make a Deposit of 1 TCH or more starting from 15:00 GMT on 11/3/21 (Only new deposits count)</p>
          <br>
          <p>🔶 Let's get that prize together!</p>
        </div>

        <p class="info-window">
        </p>
      </div>
    </div>
  </div>

  <!-- warn windows -->

  <div class="warn-container" id="warn">
    <div class="container-info">
      <div class="info-warn">
        <h3 class="title-warn" id="warnTitleContent">
          NEW RULES ON SITE
        </h3>
        <p id="warnMainContent">
          Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non
          numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima
          veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam
        </p>
      </div>
      <button type="button" class="btn-contact warn-btn">
        OK
      </button>
    </div>
  </div>

  <div class="warn-container error-warn" id="warn1">
    <div class="container-info">
      <div class="info-warn">
        <h3 class="title-warn" id="errorTitleContent">
          ERROR!
        </h3>
        <p id="errorMainContent">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
          aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </p>
      </div>
      <button type="button" class="btn-contact warn-btn">
        OK
      </button>
    </div>
  </div>
</div>
</template>

<script>
	import { ethers } from "ethers";
	import big from "big.js";
    import { NumSplic } from "../unit/tool";
    import tp from 'tp-js-sdk'

    big.NE = -40
    big.PE = 40
	export default {
		data() {
			return { 
				// 遮罩
                curtain: false, 
                
                address: require('../unit/address.json'),

                ispc : true,
                
				myAddress: undefined,
				// 模式切换
				mode: 0,
                userMsg: {
                    for_withdraw: 0,
                    structure: [0,0,0,0,0],
                    total_invested: 0,
                    total_match_bonus: 0,
                    total_withdrawn: 0
                },
                contractMsg: {
                    _invested: 0, 
                    _withdrawn: 0,
                    _match_bonus: 0, 
                },
                withdrawWait: true,
                
                dipositWait: true,
                approveWait: true,
                moveLength:0,
                moveLengthSub:100,
                day:7,

                isMouseDown: false,
                originX: null,
                lockX: 0,
                originY: 0,
                slider: null,
                sliderMask: null,
                sliderContainer: null,
                block: null,
                depositAmount: 0,
                max: 0,

                approveAmount : 0,
                tronWeb:null,
                walletAddress:null
			};
		},
		methods: { 
            NumSplicFn(number,length) {
                return NumSplic(number,length)
            },
			// 连接钱包
			linkPay() {
                if(window.tronWeb && window.tronWeb.defaultAddress.base58){ 

                  this.tronWeb =  window.tronWeb;
                  
                  this.walletAddress = this.tronWeb.defaultAddress.base58;
                //   console.log(this.walletAddress.length)
                  this.myAddress = this.walletAddress.substr(0, 4) + "..." + this.walletAddress.substr(30, 4); 
                  this.create()
                } else {
                    tp.getWallet({walletTypes: ['tron'], switch: true}).then(console.log)
                }
            },
            
            //查询USDT余额
            async getTokenBalance()  {
                if(this.tronWeb ) { 
                    let contract = await this.tronWeb.contract().at(this.address.token);
                    let balance = await contract.balanceOf(this.walletAddress).call(); 
                    this.max = ethers.utils.formatUnits(balance) -0;
                }
            },
            
            //查询授权
            async getTokenAllowance()  {
                if(this.tronWeb ) { 
                    let contract = await this.tronWeb.contract().at(this.address.token);
                    let approveAmount = await contract.allowance(this.walletAddress,this.address.bnbStorm).call(); 
                    this.approveAmount = ethers.utils.formatUnits(approveAmount) -0;
                    // console.log(this.approveAmount)
                }
            },
            //授权
            async tokenApprove()  {
                if(this.tronWeb ) { 
                    this.approveWait= false
                    let contract = await this.tronWeb.contract().at(this.address.token);
                    let approveAmount = await contract.approve(this.address.bnbStorm,"100000000000000000000000000").send({ from: this.walletAddress }).then(data => {
                        this.approveWait= true
                    }).catch(error => {
                        this.approveWait= true
                    })
                }
            },
            async viewUserInfo() {
                
                if(this.tronWeb ) { 
                    var contract = await this.tronWeb.contract().at(this.address.bnbStorm);
                    var MyMsg = await contract.userInfo(this.walletAddress).call(); 
                    let newStructure = []
                    MyMsg.structure.forEach(element => {
                        newStructure.push(ethers.utils.formatUnits(element,0))
                    });
                    this.userMsg = MyMsg;
                    this.userMsg.for_withdraw = ethers.utils.formatUnits(MyMsg.for_withdraw) -0
                    this.userMsg.total_invested = ethers.utils.formatUnits(MyMsg.total_invested) -0
                    this.userMsg.total_match_bonus = ethers.utils.formatUnits(MyMsg.total_match_bonus)-0
                    this.userMsg.total_withdrawn = ethers.utils.formatUnits(MyMsg.total_withdrawn)-0
                    this.userMsg.structure = newStructure
                }
            },
            async viewContractInfo() {
                
                if(this.tronWeb ) { 
                    var contract = await this.tronWeb.contract().at(this.address.bnbStorm);
                    var contractMsgInfo = await contract.contractInfo().call(); 
                    this.contractMsg._invested = ethers.utils.formatUnits(contractMsgInfo._invested) -0
                    this.contractMsg._withdrawn = ethers.utils.formatUnits(contractMsgInfo._withdrawn) -0
                    this.contractMsg._match_bonus = ethers.utils.formatUnits(contractMsgInfo._match_bonus) -0
                    // console.log(contractMsgInfo)
                }
            },
            // 领取奖励
            async getWithdraw() {
                if(this.tronWeb ) { 
                    this.withdrawWait = false;
                    let contract = await this.tronWeb.contract().at(this.address.bnbStorm);
                    let balance = await contract.withdraw().send({ from: this.walletAddress }).then(data => { 
                        this.withdrawWait = true;
                    }).catch(error => { 
                        this.withdrawWait = true;
                    })
                }
            }, 
            // 质押
            async deposit() {
                
                if(this.tronWeb ) { 

                    let _amount = big(this.depositAmount).times(10**18).toString();
                    this.dipositWait = false;
                    
                    var str = window.location.href
                    let ref = "0x0000000000000000000000000000000000000000"
    
                    if(str.indexOf("ref=") != -1) {
                        str = str.match(/ref=(\S*)/)[1].substring(0,34);
                        ref = str;
                    }  
                    let contract = await this.tronWeb.contract().at(this.address.bnbStorm);
                    let balance = await contract.deposit(this.day,ref,_amount).send({ from: this.walletAddress }).then(data => { 

                        this.dipositWait = true;
                    }).catch(error => { 
                        this.dipositWait = true;
                    })
                }
            },
            copyRef() {  
                var str = window.location.href+"?ref="+this.walletAddress
                this.$copyText(str).then(function (e) {
                    }, function (e) {
                    })
            },
            // pc
            handleDragStartPc(e) {
                if (this.originX == null) {
                    this.lockX = e.clientX || e.touches[0].clientX;
                }
              this.originX = e.clientX || e.touches[0].clientX;
              this.originY = e.clientY || e.touches[0].clientY;

              this.isMouseDown = true;

              document.onmousemove = (ev) => {
                if (!this.isMouseDown) return false; 
                // 获取拖拽移动的距离
                const eventX = ev.clientX || ev.touches[0].clientX;
                const moveX = eventX - this.originX;

                let fatherWidth =  window.document.getElementById("js-slider").offsetWidth
                if(moveX > fatherWidth ) return false;
                let testDay = 7 + Number(Number((eventX - this.lockX) / fatherWidth *23).toFixed(0))
                if(testDay < 7 || testDay > 30) return false;
                if(eventX > (fatherWidth + this.lockX  * 0.95)) return false;
                this.day = testDay
                this.moveLength =  (eventX - this.lockX) / fatherWidth *100
                this.moveLengthSub = 100 -this.moveLength 
              };
              document.onmouseup = (ev) => {
                if (!this.isMouseDown) return false;
                this.isMouseDown = false;
                const eventX = ev.clientX || ev.changedTouches[0].clientX;
                if (eventX === this.originX) return false;
              }; 
            },  


            // move 
            handleDragStart(e) { 
                if (this.originX == null) {
                    this.lockX = e.clientX || e.touches[0].clientX;
                }
              this.originX = e.clientX || e.touches[0].clientX;
              this.originY = e.clientY || e.touches[0].clientY;
              this.isMouseDown = true;
              
                  
              document.onmouseup = (ev) => {
                //   console.log("------------------")
                if (!this.isMouseDown) return false;
                this.isMouseDown = false;
                const eventX = ev.clientX || ev.changedTouches[0].clientX;
                if (eventX === this.originX) return false;
              }; 
            },  
            touchmoveFn (ev)  {
                if (!this.isMouseDown) return false; 
                // 获取拖拽移动的距离
                const eventX = ev.clientX || ev.touches[0].clientX;

                const moveX = eventX - this.originX;  
                let fatherWidth =  window.document.getElementById("js-slider").offsetWidth
                if(moveX > fatherWidth ) return false;
                let testDay = 7 + Number(Number((eventX - this.lockX) / fatherWidth *23).toFixed(0))
                if(testDay < 7 || testDay > 30) return false;
                if(eventX > (fatherWidth + this.lockX  * 0.95)) return false;
                this.day = testDay
                this.moveLength =  (eventX - this.lockX) / fatherWidth *100
                this.moveLengthSub = 100 -this.moveLength 
              },
            create() {  
	        	clearInterval(this.fn);
	        	this.fn = setInterval(this.whileFN, 3000);
                this.viewUserInfo()
                this.getTokenBalance()
                this.getTokenAllowance()
                this.viewContractInfo()
	        },
            whileFN() {
                this.viewUserInfo()
                this.getTokenBalance()
                this.getTokenAllowance()
                this.viewContractInfo()
	        },
	    },  
		mounted() { 
            this.Inval = setInterval(() => { 
                this.linkPay();
                if(this.walletAddress != ""){
                    // console.log(this.walletAddress)
                	window.clearInterval(this.Inval);
                }
            }, 1000); 

            
            let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
            if (flag) {
                this.ispc = false
            } else {
                this.ispc = true
            }
 


		},

		beforeDestroy() {
			// clearInterval(this.timer);
			clearInterval(this.fn);
		},
	};
</script>

<style lang="scss" scoped>
/* http://meyerweb.com/eric/tools/css/reset/
   v2.0-modified | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
}

/* make sure to set some focus styles for accessibility */
:focus {
    outline: 0;
}

/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
    display: block;
}

body {
    line-height: 1;
    box-sizing: border-box;
}

ol, ul {
    list-style: none;
}

blockquote, q {
    quotes: none;
}

blockquote:before, blockquote:after,
q:before, q:after {
    content: '';
    content: none;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
}

input[type=search]::-webkit-search-cancel-button,
input[type=search]::-webkit-search-decoration,
input[type=search]::-webkit-search-results-button,
input[type=search]::-webkit-search-results-decoration {
    -webkit-appearance: none;
    -moz-appearance: none;
}

input[type=search] {
    -webkit-appearance: none;
    -moz-appearance: none;
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
}

textarea {
    overflow: auto;
    vertical-align: top;
    resize: vertical;
}

/**
 * Correct `inline-block` display not defined in IE 6/7/8/9 and Firefox 3.
 */

audio,
canvas,
video {
    display: inline-block;
    *display: inline;
    *zoom: 1;
    max-width: 100%;
}

/**
 * Prevent modern browsers from displaying `audio` without controls.
 * Remove excess height in iOS 5 devices.
 */

audio:not([controls]) {
    display: none;
    height: 0;
}

/**
 * Address styling not present in IE 7/8/9, Firefox 3, and Safari 4.
 * Known issue: no IE 6 support.
 */

[hidden] {
    display: none;
}

/**
 * 1. Correct text resizing oddly in IE 6/7 when body `font-size` is set using
 *    `em` units.
 * 2. Prevent iOS text size adjust after orientation change, without disabling
 *    user zoom.
 */

html {
    font-size: 100%; /* 1 */
    -webkit-text-size-adjust: 100%; /* 2 */
    -ms-text-size-adjust: 100%; /* 2 */
}

/**
 * Address `outline` inconsistency between Chrome and other browsers.
 */

a:focus {
    outline: thin dotted;
}

/**
 * Improve readability when focused and also mouse hovered in all browsers.
 */

a:active,
a:hover {
    outline: 0;
}

/**
 * 1. Remove border when inside `a` element in IE 6/7/8/9 and Firefox 3.
 * 2. Improve image quality when scaled in IE 7.
 */

img {
    border: 0; /* 1 */
    -ms-interpolation-mode: bicubic; /* 2 */
}

/**
 * Address margin not present in IE 6/7/8/9, Safari 5, and Opera 11.
 */

figure {
    margin: 0;
}

/**
 * Correct margin displayed oddly in IE 6/7.
 */

form {
    margin: 0;
}

/**
 * Define consistent border, margin, and padding.
 */

fieldset {
    border: 1px solid #c0c0c0;
    margin: 0 2px;
    padding: 0.35em 0.625em 0.75em;
}

/**
 * 1. Correct color not being inherited in IE 6/7/8/9.
 * 2. Correct text not wrapping in Firefox 3.
 * 3. Correct alignment displayed oddly in IE 6/7.
 */

legend {
    border: 0; /* 1 */
    padding: 0;
    white-space: normal; /* 2 */
    *margin-left: -7px; /* 3 */
}

/**
 * 1. Correct font size not being inherited in all browsers.
 * 2. Address margins set differently in IE 6/7, Firefox 3+, Safari 5,
 *    and Chrome.
 * 3. Improve appearance and consistency in all browsers.
 */

button,
input,
select,
textarea {
    font-size: 100%; /* 1 */
    margin: 0; /* 2 */
    vertical-align: baseline; /* 3 */
    *vertical-align: middle; /* 3 */
    padding: 0;
    margin: 0;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
}

/**
 * Address Firefox 3+ setting `line-height` on `input` using `!important` in
 * the UA stylesheet.
 */

button,
input {
    line-height: normal;
}

/**
 * Address inconsistent `text-transform` inheritance for `button` and `select`.
 * All other form control elements do not inherit `text-transform` values.
 * Correct `button` style inheritance in Chrome, Safari 5+, and IE 6+.
 * Correct `select` style inheritance in Firefox 4+ and Opera.
 */

button,
select {
    text-transform: none;
}

/**
 * 1. Avoid the WebKit bug in Android 4.0.* where (2) destroys native `audio`
 *    and `video` controls.
 * 2. Correct inability to style clickable `input` types in iOS.
 * 3. Improve usability and consistency of cursor style between image-type
 *    `input` and others.
 * 4. Remove inner spacing in IE 7 without affecting normal text inputs.
 *    Known issue: inner spacing remains in IE 6.
 */

button,
html input[type="button"], /* 1 */
input[type="reset"],
input[type="submit"] {
    -webkit-appearance: button; /* 2 */
    cursor: pointer; /* 3 */
    *overflow: visible;  /* 4 */
}

/**
 * Re-set default cursor for disabled elements.
 */

button[disabled],
html input[disabled] {
    cursor: default;
}

/**
 * 1. Address box sizing set to content-box in IE 8/9.
 * 2. Remove excess padding in IE 8/9.
 * 3. Remove excess padding in IE 7.
 *    Known issue: excess padding remains in IE 6.
 */

input[type="checkbox"],
input[type="radio"] {
    box-sizing: border-box; /* 1 */
    padding: 0; /* 2 */
    *height: 13px; /* 3 */
    *width: 13px; /* 3 */
}

/**
 * 1. Address `appearance` set to `searchfield` in Safari 5 and Chrome.
 * 2. Address `box-sizing` set to `border-box` in Safari 5 and Chrome
 *    (include `-moz` to future-proof).
 */

input[type="search"] {
    -webkit-appearance: textfield; /* 1 */
    -moz-box-sizing: content-box;
    -webkit-box-sizing: content-box; /* 2 */
    box-sizing: content-box;
}

/**
 * Remove inner padding and search cancel button in Safari 5 and Chrome
 * on OS X.
 */

input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
}

/**
 * Remove inner padding and border in Firefox 3+.
 */

button::-moz-focus-inner,
input::-moz-focus-inner {
    border: 0;
    padding: 0;
}

/**
 * 1. Remove default vertical scrollbar in IE 6/7/8/9.
 * 2. Improve readability and alignment in all browsers.
 */

textarea {
    overflow: auto; /* 1 */
    vertical-align: top; /* 2 */
}

/**
 * Remove most spacing between table cells.
 */

table {
    border-collapse: collapse;
    border-spacing: 0;
}

html,
button,
input,
select,
textarea {
    color: #222;
}


::-moz-selection {
    background: #b3d4fc;
    text-shadow: none;
}

::selection {
    background: #b3d4fc;
    text-shadow: none;
}

img {
    vertical-align: middle;
}

fieldset {
    border: 0;
    margin: 0;
    padding: 0;
}

textarea {
    resize: vertical;
}

.chromeframe {
    margin: 0.2em 0;
    background: #ccc;
    color: #000;
    padding: 0.2em 0;
}
h1,
h2,
h3,
h4,
input {
    font-family: "Montserrat";
    color: #182035;
    font-weight: bold;
}

p,
a,
span,
label,
h5,
h6 {
    font-family: "Montserrat";
    text-decoration: none;
    color: #182035;
    font-weight: normal;
}

a:focus,
a:active {
    outline: none;
}

.body {
    background-image: url("../assets/main_bg.jpg");
    background-repeat: no-repeat;
    background-color: #222;
    background-size: cover;
    max-width: 100%;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
}

/*--------------header---------------*/

.header {
    background: rgba(0, 0, 0, 0.7);
    padding: 16px 0 19px;
    min-height: 46px;
    position: static;
    top: 0;
}

.container-info {
    max-width: 1170px;
    width: 100%;
    margin: 0 auto;
}
video{
    object-fit: cover;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
}
.container-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.header .container-info,
.header {
    display: flex;
    align-items: center;
}

.btn-contact {
    border: 1px solid #c12088;
    box-sizing: border-box;
    border-radius: 30px;
    width: 130px;
    height: 45px;
    padding: 12px 30px;
    background: transparent;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
}

.btn-contact:hover {
    background: rgba(193, 32, 136, 0.2);
    transition: 0.3s;
}

.btn-contact span {
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: normal;
    color: #ffffff;
    text-align: center;
    display: block;
}

.connect {
    margin-right: 20px;
}

.connect span {
    position: relative;
    padding-right: 16px;
}

.connect span:before {
    content: "";
    position: absolute;
    right: 0;
    width: 8px;
    height: 8px;
    background: url("../assets/plus.svg") no-repeat;
    background-size: cover;
    top: 50%;
    transform: translateY(-50%);
}

.item-link {
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-sizing: border-box;
    border-radius: 100%;
    width: 45px;
    height: 45px;
    display: block;
}

.item-link:hover {
    border: 1px solid rgba(255, 255, 255, 0.7);
    opacity: 0.7;
}

.contact-list {
    display: flex;
}

.item-list {
    margin-right: 4px;
}

.item-list:last-child {
    margin-right: 0;
}

.discord .item-link {
    background: url("https://fxhippo.oss-cn-beijing.aliyuncs.com/assets/bnbstorm/discord.svg") no-repeat;
    background-size: 16px 16px;
    background-position: center;
}

.twitter .item-link {
    background: url("https://fxhippo.oss-cn-beijing.aliyuncs.com/assets/bnbstorm/twitter.svg") no-repeat;
    background-size: 16px 13px;
    background-position: center;
}

.telegram .item-link {
    background: url("../assets/telegram.svg") no-repeat;
    background-size: 16px 13px;
    background-position: center;
}

.header-contacts {
    display: flex;
    align-items: center;
}

.container-btn-contacts {
    margin: 0 57px;
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: flex-end;
}

/*----------first-screen------------*/

.main-title,
.main-title span {
    font-style: normal;
    font-weight: bold;
    font-size: 50px;
    line-height: normal;
    color: #ffffff;
    max-width: 505px;
}

.main-title span {
    color: #c12088;
}

.sub-title-main,
.sub-title-main span {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: normal;
    color: #ffffff;
}

.sub-title-main span {
    font-weight: bold;
}

.sub-title-main {
    margin: 20px 0 49px;
}

.pink-btn {
    background: linear-gradient(270deg, #c12088 0%, #7f0793 96.85%);
    box-shadow: 0px 5px 25px rgba(193, 32, 136, 0.6), inset 0px -1px 0px rgba(0, 0, 0, 0.32);
    border-radius: 30px;
    width: 270px;
    height: 55px;
    border: none;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: normal;
    color: #ffffff;
}

.pink-btn:hover {
    background: linear-gradient(270deg, #e226a0 0%, #9509ac 96.85%);
}

.screen-block {
    min-height: 552px;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: 80px;
}

.screen-block > div,
.right-screen > div {
    padding-right: 15px;
    padding-left: 15px;
    flex-grow: 1;
    flex-shrink: 1;
}
.block-result {
    background: #ffffff;
    border-radius: 60px;
    padding: 16px 25px;
    width: fit-content;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
}

.block-result:last-child {
    margin-bottom: 0;
}

.result {
    margin-right: 18px;
    font-style: normal;
    font-weight: bold;
    font-size: 30px;
    line-height: normal;
}

.sub-text-result {
    font-size: 14px;
    width: fit-content;
    // max-width: 95px;
}

.pink-text {
    font-weight: bold;
    color: #c12088;
}

.bold-text {
    font-weight: bold;
}

.container-info-screen {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}
.container-first-screen {
    max-width: 100%;
    width: 100%;
}

.first-screen {
    padding-bottom: 82px;
}

.container-result {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

/*--------------calculate block--------*/

.header-section {
    margin-bottom: 62px;
    text-align: center;
}

.title-header {
    font-style: normal;
    font-weight: bold;
    font-size: 36px;
    line-height: normal;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #ffffff;
}

.container-calculate-info {
    padding: 37px 67px 36px 68px;
    background: #ffffff;
    border-radius: 30px;
    min-height: 200px;
    max-width: 836px;
    margin: 0 auto;
}

.container-slider {
    position: relative;
    max-width: 600px;
}

.datalist {
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
}

.ui-slider .slider-range-inverse {
    width: 100%;
    height: 13px;
    background: rgba(25, 32, 54, 0.1);
    border-radius: 50px;
    position: relative;
}

.ui-slider {
    background: linear-gradient(266.03deg, #c12088 24.24%, #7f0793 68.14%);
    border-radius: 30px;
    height: 12px;
    position: absolute;
    left: 0;
    top: -22px;
    bottom: -20px;
    right: 0;
    border: 1px solid #e8e9eb;
}

.ui-state-default,
.ui-widget-content .ui-state-default {
    position: absolute;
    right: -6px;
    top: 50%;
    transform: translateY(-50%);
    border: 6px solid #ffffff;
    box-sizing: border-box;
    border-radius: 30px;
    width: 22px;
    height: 22px;
    cursor: pointer;
}

.ui-slider .ui-slider-handle:before {
    content: "";
    position: absolute;
    left: -6px;
    right: -6px;
    top: -6px;
    bottom: -6px;
    width: 21px;
    height: 21px;
    border: 1px solid #bbbbbb;
    border-radius: 100%;
}

.mark {
    position: absolute;
    background: #ffffff;
    width: 50px;
    height: 30px;
    border-radius: 10px;
    filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25));
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    color: #000000;
    top: -45px;
    left: 50%;
    transform: translateX(-50%);
}

.mark:after {
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -13px;
    border: 8px solid transparent;
    border-top: 8px solid white;
}

.datalist li {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 15px;
    color: #182035;
    opacity: 0.5;
}

.title-deposit {
    margin-bottom: 75px;
    font-weight: bold;
    font-size: 16px;
}

.ui-slider .slider-range-inverse {
    background: #e8e9eb;
    position: absolute;
    right: 0;
}

.ui-slider .ui-slider-range {
    background: transparent;
}
.deposit-block{
        width: 202px;
}
.amount-field {
    background: #f2f3f4;
    border: 1px solid #c12088;
    box-sizing: border-box;
    border-radius: 10px;
width: 100%;
    height: 50px;
    /* padding: 14px 23px 14px 20px; */
    position: relative;
    -webkit-user-select: text;
    cursor: auto;
    -webkit-appearance: textfield;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    font-family: "Montserrat";
    display: flex;
    align-items: center;
}
.amount-field input{
    padding: 14px 55px 14px 20px;
    width: 100%;

}
.amount-field-button {
    /* content: "Max"; */
    z-index: 5;
    position: absolute;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: normal;
    color: #c12088;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
}

.amount-title {
    margin-bottom: 28px;
}

.container-counter {
    display: flex;
    justify-content: space-between;
    padding-bottom: 35px;
    position: relative;
}

.container-counter::after {
    content: "";
    position: absolute;
    height: 1px;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 100%;
    background: linear-gradient(266.61deg, #ffffff -1.47%, #c12088 46.7%, #ffffff 99.87%);
}

.deposit {
    width: 80%;
}

.amount-input {
    /* max-width: 116px; */
    background: transparent;
    border: none;
}

.list-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.item-info {
    display: flex;
    align-items: center;
    margin-right: 10px;
}

.footer-counter {
    margin-top: 35px;
    display: flex;
    flex-direction: column;
}

.invest-btn {
    margin: 0 auto;
    margin-top: 46px;
    width: 300px;
}

.title-info {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: normal;
    margin-right: 8px;
}

.item-info p {
    font-weight: bold;
    font-size: 20px;
}

.item-info p.pink-text span {
    color: #c12088;
    font-weight: bold;
}

/*------------------dashboard-section------------*/

.dashboard-section {
    margin-top: 111px;
    padding-bottom: 98px;
}

.container-dashboard-info {
    background: #ffffff;
    border-radius: 30px;
    min-height: 200px;
    max-width: 890px;
    margin: 0 auto;
    padding: 42px 43px 39px 38px;
}

.item-dashboard > div {
    background: #ffffff;
    border-radius: 9px;
    padding: 14px 21px 18px;
    width: 158px;
    height: 53px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.item-dashboard {
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    background-image: linear-gradient(266.03deg, #c12088 24.24%, #7f0793 68.14%);
    border-image: -moz-linear-gradient(266.03deg, #c12088 24.24%, #7f0793 68.14%);
    background: -webkit-linear-gradient(left, #c12088 0%, #7f0793 100%);
    box-sizing: border-box;
    padding: 1px;
    width: fit-content;
    width: -moz-fit-content;
}

.list-dashboard {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 63px;
    position: relative;
}

.title-block-item {
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    margin-bottom: 5px;
    line-height: 15px;
}

.info-item span {
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
}

.list-dashboard::after {
    content: "";
    position: absolute;
    height: 1px;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 100%;
    background: linear-gradient(266.61deg, #ffffff -1.47%, #c12088 46.7%, #ffffff 99.87%);
}

.withdraw-btn {
    width: 210px;
    height: 45px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    top: -23px;
}

.container-footer-dashboard {
    padding-top: 8px;
}

.title-footer-dashboard {
    font-weight: normal;
    font-size: 14px;
    text-align: center;
    margin-bottom: 37px;
    position: relative;
    line-height: 24px;
}

.title-footer-dashboard span {
    font-weight: bold;
    margin-left: 5px;
}

.list-footer {
    display: flex;
    justify-content: space-between;
}

.item-footer {
    background: #f2f3f4;
    box-shadow: inset 0px -1px 0px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    width: fit-content;
}

.title-level {
    color: #000000;
    opacity: 0.7;
    font-weight: bold;
    font-size: 12px;
    margin-bottom: 4px;
}

.second-level {
    font-size: 14px;
}

.three-level {
    opacity: 0.8;
    font-size: 16px;
}

.item-footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 14px 10px 8px;
    max-width: 142px;
    width: 100%;
    /* height: 42px; */
    justify-content: space-between;
}

.fourth-level {
    opacity: 0.9;
    font-size: 18px;
}

.fifth-level {
    opacity: 1;
    font-size: 20px;
}

.info-level {
    font-weight: normal;
    font-size: 10px;
}

/*------------------footer--------------*/

.container-logo-footer {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.container-logo-footer span {
    font-weight: normal;
    font-size: 12px;
    color: #ffffff;
    line-height: normal;
}

.container-logo-footer .logo-span {
    font-weight: bold;
}

.footer {
    min-height: 46px;
    position: relative;
    padding: 23px 0 31px;
}

.footer:before {
    content: "";
    position: absolute;
    height: 1px;
    left: 0;
    right: 0;
    top: 0;
    border-radius: 100%;
    background: linear-gradient(266.61deg, #010727 -1.47%, #c12088 46.7%, #04010b 100%);
}

.footer-btn-contact {
    width: 192px;
    height: 45px;
    font-size: 14px;
}

.container-footer-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.container-footer-btn {
    display: flex;
    align-items: center;
    width: 60%;
    justify-content: space-between;
}

.footer .contact-list {
    margin-left: 30px;
}

.container-list-contact {
    display: flex;
    align-items: center;
}

/*-----------popup windows-------*/

.main-container-center {
    background: #ffffff;
    border-radius: 30px;
    height: auto;
    min-height: 500px;
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    max-width: 970px;
    width: 100%;
    margin: 0 auto;
}

.faq-block {
    padding: 17px 25px 36px 69px;
}

.wrapper-dark {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 10000;
    display: none;
    transition: 0.3s;
}
.container-faq {
    display: none;
    transition: 0.3s;
}

.active-faq {
    display: block;
    transition: 0.3s;
}

.title-window {
    font-weight: bold;
    font-size: 36px;
    line-height: normal;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #000000;
    text-align: center;
}

.window-header {
    margin: 0 auto;
}

.title-faq-item {
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: normal;
    /* text-transform: uppercase; */
    color: #000000;
}

.item-faq {
    padding: 30px 0 30px 0;
    position: relative;
}

.header-item-faq {
    position: relative;
    padding-right: 43px;
}

.container-info-faq {
    padding-top: 30px;
    display: none;
}

.container-info-faq p {
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: normal;
    color: #303030;
    margin-bottom: 15px;
    padding-right: 50px;
}

.container-info-faq p:last-child {
    margin-bottom: 0;
}

.item-faq::after {
    content: "";
    position: absolute;
    height: 1px;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 100%;
    background: linear-gradient(266.61deg, #ffffff -1.47%, #c12088 100%, #ffffff 100%);
}

.item-faq:last-child::after {
    display: none;
}

.close-faq-item {
    box-sizing: border-box;
    border-radius: 30px;
    width: 43px;
    height: 43px;
    background: url("https://fxhippo.oss-cn-beijing.aliyuncs.com/assets/bnbstorm/btn_arrow.svg") no-repeat;
    border: none;
    background-size: contain;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    transition: 0.3s;
}

.active-btn-faq {
    transform: translateY(-50%) rotate(180deg);
    transition: 0.3s;
}

.close-window {
    position: absolute;
    width: 43px;
    height: 43px;
    background: url("https://fxhippo.oss-cn-beijing.aliyuncs.com/assets/bnbstorm/X.svg") no-repeat;
    background-size: contain;
    box-sizing: border-box;
    border-radius: 100%;
    border: none;
    top: -50px;
    right: -50px;
}

.close-window:hover {
    opacity: 0.5;
}

.container-connect {
    background: #ffffff;
    border-radius: 30px;
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    min-height: 307px;
    max-width: 570px;
    width: 100%;
    margin: 0 auto;
    display: none;
    transition: 0.3s;
}

.active-connect {
    display: block;
    transition: 0.3s;
}
.container-news {
    background: #ffffff;
    border-radius: 30px;
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    min-height: 307px;
    max-width: 570px;
    width: 100%;
    margin: 0 auto;
    display: none;
    transition: 0.3s;
}

.active-news {
    display: block;
    transition: 0.3s;
}

.container-window {
    padding: 20px 20px 58px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.item-connect {
    padding: 17px 25px;
    border-radius: 20px;
    margin-bottom: 20px;
    position: relative;
    cursor: pointer;
    background: linear-gradient(266.03deg, #c12088 24.24%, #7f0793 68.14%);
    box-shadow: inset 0px -1px 0px rgba(0, 0, 0, 0.32);
    max-width: 172px;
    width: 100%;
    padding-right: 42px;
}

.list-connect {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin: 50px 0 0;
}

.item-connect p {
    font-weight: bold;
    font-size: 14px;
    line-height: normal;
    color: #ffffff;
}
.pink-btn a {
    font-weight: bold;
    font-size: 14px;
    line-height: normal;
    color: #ffffff;
}

.info-window {
    position: relative;
    padding-left: 24px;
    font-size: 10px;
}

.info-window:before {
    content: "";
    position: absolute;
    left: 0;
    width: 16px;
    height: 16px;
    border-radius: 100%;
    background: url("https://fxhippo.oss-cn-beijing.aliyuncs.com/assets/bnbstorm/asc_img.svg") no-repeat;
    top: 50%;
    transform: translateY(-50%);
}

.metamask:before,
.binance:before {
    content: "";
    position: absolute;
    right: 8px;
    width: 34px;
    height: 34px;
    border-radius: 100%;
    background-color: #ffffff;
    background-image: url("https://fxhippo.oss-cn-beijing.aliyuncs.com/assets/bnbstorm/fox.png");
    background-repeat: no-repeat;
    background-position: center;
    top: 50%;
    transform: translateY(-50%);
}

.binance:before {
    background-image: url("https://fxhippo.oss-cn-beijing.aliyuncs.com/assets/bnbstorm/binance.png");
    background-repeat: no-repeat;
    background-position: center;
}

/*--------------warn messages-----------*/

.warn-btn {
    color: #000003;
    font-size: 12px;
}

.warn-container {
    background: #ffffff;
    padding: 14px 0 7px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    min-height: 59px;
    z-index: 10;
}

.error-warn {
    background: #c12088;
}

.title-warn {
    font-weight: bold;
    font-size: 18px;
    line-height: normal;
    text-transform: uppercase;
    color: #000000;
}

.warn-container .container-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.info-warn p {
    max-width: 972px;
    width: 100%;
    font-size: 12px;
    color: #303030;
}

.info-warn {
    max-width: 80%;
}

.error-warn .title-warn,
.error-warn .info-warn p,
.error-warn .warn-btn {
    color: #ffffff;
}

.error-warn .warn-btn {
    border: 1px solid #ffffff;
}

.error-warn .warn-btn:hover {
    background: rgba(255, 255, 255, 0.3);
}

.active-bg {
    display: block;
}

.mobile-open,
.mobile-fade,
.warn-container {
    display: none;
}

#warn.hidden {
    display: none;
}
#warn.fade-in {
    display: flex;
    transition: 0.3s;
}

button {
    position: relative;
    overflow: hidden;
}
button .spinner {
    position: absolute;
    top: 0;
    left: 50%;
    width: 32px;
    height: 100%;
    background-image: url("https://fxhippo.oss-cn-beijing.aliyuncs.com/assets/bnbstorm/spinner.svg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: auto;
    transform: translate(-50%, 0%);
    animation: spinner 1.5s linear 0s infinite;
    /* filter: brightness(50) grayscale(10) ; */
    /* animation: name duration timing-function delay iteration-count direction fill-mode; */
    /* animation: openedMobileMenu 0.4s linear 0s 1 reverse backwards; */
}
@keyframes spinner {
    from {
        transform: rotate(0) translate(-50%, 0%) scaleX(0.1);
    }
    25% {
        filter: none;
    }
    50% {
        transform: rotate(0) translate(-50%, 0%) scaleX(1);
    }
    75% {
        filter: brightness(50) grayscale(10);
    }
    to {
        transform: rotate(0) translate(-50%, 0%) scaleX(0.1);
    }
}

.btn-copy{
    width: 24px;
    height: 24px;
    position: relative;
}
.btn-copy::after{
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("https://fxhippo.oss-cn-beijing.aliyuncs.com/assets/bnbstorm/copy.png");
    background-position: top center;
    filter: grayscale(1) opacity(.3);
    background-repeat: no-repeat;
}
.btn-copy:hover::after{
    filter: none;
    transition: .2s;
}
.btn-copy:active::after{
    filter: brightness(.9);
}
span.title-copy{
    position: absolute;
    color: #c12088;
    text-align: center;
    width: 100%;
    left: 0;
    bottom: 0;
    transform: translate(0, 80%);
    font-weight: 500;
}
@media screen and (max-width: 1475px) {
    .title-window {
        font-size: 30px;
    }

    .faq-block {
        padding: 17px 25px 25px 25px;
    }

    .close-faq-item {
        width: 30px;
        height: 30px;
    }

    .title-faq-item {
        font-size: 16px;
    }

    .item-faq {
        padding: 16px 0 16px 0;
    }

    .close-window {
        width: 30px;
        height: 30px;
        right: 0;
    }

    .info-warn {
        margin-left: 15px;
    }

    .warn-btn {
        margin-right: 15px;
    }
}

@media screen and (max-width: 1200px) {
    .container-logo,
    .container-logo-footer {
        margin-left: 15px;
    }

    .header-contacts,
    .container-list-contact {
        margin-right: 15px;
    }
}
@media screen and (min-width: 981px) {
    .container-first-screen .screen-block {
        align-items: center;
        flex-direction: row;
    }
    .container-first-screen .screen-block{
        min-height:50vh;
        padding-bottom: 150px;   width: auto;
    }
    .container-first-screen .screen-block:first-child{
        flex-grow: 1.5;
     
    }
    .first-screen,
    .section-info {
        position: relative;
    }
    .first-screen video {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: -2;
    }
    .first-screen::after,
    .section-info::after {
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
    }
    .first-screen::after {
        background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1));
    }
    .section-info::after{
        background-image: linear-gradient(180deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
    }
}
@media screen and (max-width: 980px) {
    .main-title,
    .main-title span {
        font-size: 36px;
    }

    .first-screen {
        background: url("../assets/top_img.png") no-repeat;
        background-size: 100% 100%;
    }
    .first-screen video {
        display: none;
    }

    .sub-title-main,
    .sub-title-main span {
        font-size: 14px;
    }

    .pink-btn {
        width: 200px;
        height: 50px;
        font-size: 16px;
    }

    .sub-title-main {
        margin: 15px 0 40px;
    }

    .screen-block {
        min-height: 375px;
    }

    .result {
        font-size: 24px;
        margin-right: 15px;
    }

    .sub-text-result {
        font-size: 12px;
    }

    .block-result {
        padding: 13px 18px;
    }

    .first-screen {
        padding-bottom: 28px;
    }

    .section-info {
        padding-top: 100px;
    }

    .title-header {
        font-size: 30px;
    }

    .header-section {
        margin-bottom: 50px;
    }

    .container-calculate-info {
        margin: 0 15px;
    }

    .container-calculate-info {
        padding: 37px 25px 36px 25px;
        max-width: 856px;
    }

    .invest-btn {
        width: 225px;
        height: 40px;
    }

    .container-dashboard-info {
        margin: 0 15px;
        padding: 42px 25px 39px 25px;
        max-width: 857px;
    }

    .main-container-center {
        max-width: 100%;
        width: 95%;
    }

    .withdraw-btn {
        width: 210px;
        height: 45px;
    }
    .container-list-faq {
        max-height: 550px;
        overflow-y: auto;
        padding-right: 15px;
    }
}

@media screen and (max-width: 980px) and (orientation: landscape) {
    .container-list-faq {
        max-height: 213px;
        overflow-y: auto;
        padding-right: 15px;
    }

    .main-container-center {
        min-height: auto;
    }

    .container-window {
        padding: 20px;
        min-height: 286px;
    }
}

@media screen and (max-width: 920px) {
    .item-dashboard > div {
        padding: 14px 15px 14px;
        width: 152px;
        height: 46px;
    }

    .item-footer {
        max-width: 140px;
        margin-right: 15px;
    }

    .item-footer:last-child {
        margin-right: 0;
    }

    .footer-btn-contact {
        width: 150px;
        height: 35px;
        font-size: 13px;
    }
}

@media screen and (max-width: 890px) {
    .btn-contact {
        width: 100px;
        height: 30px;
        padding: 12px 30px;
    }

    .connect {
        margin-right: 10px;
    }

    .btn-contact span {
        font-size: 10px;
    }

    .item-link {
        width: 28px;
        height: 28px;
    }

    .discord .item-link {
        background-size: 10px 10px;
    }

    .twitter .item-link,
    .telegram .item-link {
        background-size: 10px 8px;
    }

    .header {
        padding: 12px 0 14px;
        min-height: 34px;
    }

    .container-slider {
        max-width: 500px;
    }

    .title-info {
        font-size: 12px;
    }

    .item-info p {
        font-size: 18px;
    }

    .list-info {
        width: 100%;
    }

    .item-dashboard > div {
        width: 140px;
    }

    .item-dashboard {
        margin-right: 15px;
    }

    .item-dashboard:last-child {
        margin-right: 0;
    }

    .warn-container {
        padding: 10px 0 6px;
        min-height: 50px;
    }

    .title-warn {
        font-size: 16px;
    }

    .info-warn p {
        font-size: 10px;
    }
}

@media screen and (max-width: 810px) {
    .item-dashboard > div {
        width: 110px;
    }

    .info-level {
        text-align: center;
    }

    .container-slider {
        max-width: 395px;
    }
}

@media screen and (max-width: 685px) {
    .container-slider {
        max-width: 365px;
    }

    .list-dashboard,
    .list-footer {
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }

    .item-dashboard,
    .item-footer {
        margin: 10px;
    }

    .container-dashboard-info {
        padding: 25px;
    }
}

@media screen and (max-width: 655px) {
    .container-info-screen {
        flex-direction: column;
        align-items: flex-start;
    }

    .screen-block {
        min-height: auto;
        width: 100%;
        padding-top: 8px;
    }

    .container-result {
        align-items: flex-start;
    }

    .mobile-block {
        display: none;
    }

    .mobile-open {
        margin: 0 auto;
        display: block;
        margin-top: 79px;
        width: 289px;
        height: 50px;
    }

    .container-info-screen {
        padding-top: 30px;
    }

    .container-counter {
        flex-direction: column;
    }
    .deposit-block{
        width: 100%;
    }
    .title-deposit {
        margin-bottom: 74px;
    }

    .deposit {
        width: 100%;
        min-height: 105px;
        margin-bottom: 25px;
    }

    .container-slider {
        max-width: 100%;
    }

    .container-counter-amount .title-deposit {
        margin-bottom: 28px;
    }

    .amount-field {
        width: 100%;
    }

    .container-footer-info {
        flex-direction: column;
    }

    .mobile-block-list {
        display: none;
    }

    .mobile-fade {
        display: flex;
        margin-right: 15px;
    }

    .mobile-flex {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }

    .container-footer-btn {
        width: 100%;
        margin-top: 17px;
    }

    .footer-btn-contact {
        margin-left: 15px;
    }
}

@media screen and (max-width: 650px) and (orientation: landscape) {
    .list-connect {
        margin: 18px 0 0;
    }

    .container-connect {
        min-height: 239px;
    }

    .container-window {
        padding: 15px;
        min-height: 204px;
    }

    .title-window {
        font-size: 20px;
    }

    .container-list-faq {
        max-height: 171px;
    }
}

@media screen and (max-width: 586px) {
    .container-header {
        flex-direction: column;
    }

    .container-logo {
        margin-bottom: 15px;
        max-width: 200px;
        width: 100%;
        margin-left: 0;
    }

    .logo,
    .logo img {
        width: 100%;
    }

    .warn-container .container-info {
        flex-direction: column;
    }

    .warn-btn {
        align-self: flex-end;
    }

    .info-warn {
        max-width: 100%;
        margin-bottom: 10px;
    }

    .title-warn {
        margin-bottom: 5px;
    }

    .warn-container {
        padding: 10px 0 10px;
        min-height: 84px;
    }

    .info-warn {
        margin-left: 15px;
        margin-right: 15px;
    }
}

@media screen and (max-width: 565px) {
    .item-dashboard:last-child {
        margin-right: 15px;
    }

    .list-info {
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }

    .item-info {
        justify-content: space-between;
        width: 48%;
        margin-top: 15px;
    }

    .item-info:first-child {
        margin-right: 15px;
    }

    .item-info:last-child {
        width: 100%;
    }

    .invest-btn {
        width: 270px;
        margin-top: 26px;
    }

    .title-header {
        font-size: 18px;
    }

    .header-section {
        margin-bottom: 30px;
    }

    .footer-counter {
        margin-top: 20px;
    }

    .item-dashboard,
    .item-footer {
        margin: 7px;
    }

    .item-dashboard:last-child {
        margin-right: 7px;
    }

    .item-dashboard > div {
        padding: 10px 10px 20px 10px;
    }

    .item-footer {
        max-width: 110px;
    }

    .title-footer-dashboard {
        margin-bottom: 20px;
    }

    .container-btn-contacts {
        margin: 0 10px;
    }

    .withdraw-btn {
        width: 180px;
        height: 40px;
    }

    .main-title,
    .main-title span {
        font-size: 30px;
    }

    .item-info {
        width: auto;
    }

    .list-info {
        justify-content: space-between;
    }

    .container-window {
        padding: 20px;
    }

    .title-window {
        font-size: 20px;
    }

    .list-connect {
        margin: 25px 0 0;
    }

    .container-connect {
        min-height: 246px;
        width: 90%;
    }

    .title-window {
        font-size: 30px;
    }

    .container-info-faq p {
        font-size: 10px;
    }

    .container-list-faq {
        max-height: 482px;
        overflow-y: auto;
        padding-right: 15px;
    }

    .faq-block {
        padding: 17px 10px 25px 20px;
    }
}

@media screen and (max-width: 376px) {
    .container-list-faq {
        max-height: 422px;
    }
    .contact-list .item-link {
        width: 42px;
        height: 42px;
        background-size: calc(100% - 24px);
        margin: 5px;
    }

    .btn-contact {
        width: 100%;
        height: 42px;
        margin: 0 auto 8px;
        min-width: fit-content;
    }
    .pink-btn {
        height: 42px;
    }
    .pink-btn,
    .container-list-contact {
        width: calc(100% - 30px);
    }
    .sub-title-main {
        margin: 15px 0 25px;
        max-width: 95%;
    }

    .sub-title-main,
    .sub-title-main span {
        font-size: 12px;
    }

    .main-title,
    .main-title span {
        font-size: 24px;
    }

    .title-window {
        font-size: 20px;
    }

    .item-connect {
        margin-bottom: 10px;
    }

    .item-dashboard > div {
        padding: 10px;
        width: 108px;
    }

    .container-connect {
        min-height: 230px;
    }

    .item-dashboard,
    .item-footer {
        margin: 4px;
    }

    .title-faq-item {
        font-size: 14px;
    }

    .connect {
        margin-right: 5px;
    }

    .item-info p {
        font-size: 16px;
    }

    .container-dashboard-info {
        padding: 20px;
    }

    .title-footer-dashboard {
        font-size: 12px;
        line-height: normal;
    }

    .item-faq {
        padding: 10px 0 10px 0;
    }

    .container-list-faq {
        max-height: 384px;
    }

    .main-container-center {
        min-height: 200px;
    }
    .container-footer-info > div {
        flex-direction: column;
        align-items: center;
    }
    .container-info-screen {
        justify-content: flex-start;
    }
    .item-dashboard,
    .item-footer {
        flex-grow: 1;
        flex-shrink: 1;
        max-width: 100%;
        width: 100%;
    }
    .header-contacts {
        flex-direction: column;
    }
    .item-dashboard > div {
        width: calc(100% - 20px);
    }
    .footer .contact-list,
    .footer .container-logo,
    .container-logo-footer > span,
    .footer .container-list-contact,
    .footer .container-logo-footer,
    .footer .footer-btn-contact {
        margin: 8px auto;
    }
    .withdraw-btn,
    .mobile-open {
        max-width: calc(100% - 40px);
        margin-left: auto;
        margin-right: auto;
    }
    .invest-btn {
        width: 100%;
    }
    .block-result {
        width: 100%;
        flex-direction: column;
        align-items: center;
        align-content: center;
        justify-content: center;
        text-align: center;
        padding-left: 0;
        padding-right: 0;
        margin-left: auto;
        margin-right: auto;
        padding-top: 7px;
        padding-bottom: 7px;
    }
    .block-result > p {
        margin: 0 auto 6px;
    }
    .sub-text-result {
        max-width: 100%;
    }
    .mobile-open {
        margin-top: 32px;
    }
    .header-contacts,
    .container-list-contact {
        margin-right: 0;
    }
    .container-btn-contacts .btn-contact{
        margin-left: 7px;
        margin-right: 7px;
    }
    .footer-btn-contact {
        font-size: 14px;
    }
}
</style>