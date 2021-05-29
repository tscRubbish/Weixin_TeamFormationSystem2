import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import config from "../../config/config";
var app = getApp();

Page({
  data: {
    userVo: {
      description: "",
      email: "",
      id: 0,
      likes: 0,
      password: "",
      pic: "",
      score: 0,
      tags: [
        ""
      ],
      userType: "",
      username: "未登录"
    },
    tabber: "mine",
    likesType: "good-job-o",
    scoreType: "medal-o",
    showShare: false,
    shareOptions: [
      { name: '微信', icon: 'wechat', openType: 'share' },
      { name: '微博', icon: 'weibo' },
      { name: '复制链接', icon: 'link' },
      { name: '分享海报', icon: 'poster' },
      { name: '二维码', icon: 'qrcode' },
    ],
    login: "退出登录",
  },
  
  //分享
  onShareOpen() {this.setData({showShare: true})},
  onShareClose() {this.setData({showShare: false})},

  //底部选项
  onTabberChange(event) {
    this.setData({tabber: event.detail})
    wx.redirectTo({url: `/pages/${event.detail}/${event.detail}`})
  },



  //评价
  

  //退出登录
  exit() {
    if (this.data.login == "退出登录") {
      this.setData({
        userVo: {
          "description": "",
          "email": "",
          "id": 0,
          "likes": 0,
          "password": "",
          "pic": "",
          "score": 0,
          "tags": [
            ""
          ],
          "userType": "",
          "username": "未登录"
        },
        login: "点击登录"
      })
      app.globalData.id = 0
    } else {
      wx.redirectTo({
        url: '/pages/login/login',
      })
    }
  },

  onShow() {
    this.setData({
      ["userVo.id"]: app.globalData.id
    })
    if (this.data.userVo.id != 0) {
      wx.request({
        url: config.host + "/api/user/getInfo?id=" + app.globalData.id,
        header: {
          "nju-token": app.globalData.token,
          "nju-long-token": app.globalData.longToken
        },
        success: (res) => {
          console.log(res);
          var temp = res.data.content;
          this.setData({
            userVo: temp,
          });
        },
        fail: (res) => {
          console.log(res)
        }
      })
    }
    if (this.data.userVo.id <= 0) {
      this.setData({login: "点击登录"})
    } else {
      this.setData({login: "退出登录"})
    }
  },

  onLoad() {
    
  },
})
