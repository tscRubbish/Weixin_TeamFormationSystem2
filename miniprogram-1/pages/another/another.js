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

   //点赞
   onLikesChange(e) {
    let type = e.currentTarget.dataset.type
    if (type == "good-job-o") {
      wx.request({
        url: config.host + "/api/user/updateLikes",
        method: "POST",
        header: {
          "nju-token": app.globalData.token,
          "nju-long-token": app.globalData.longToken
        },
        data: this.data.userVo,
        success: (res) => {
          this.setData({
            likesType: "good-job",
            ["userVo.likes"]: this.data.userVo.likes + 1
          })
        }
      })
      Toast.success('已点赞');
    } else if (type == "good-job") {
      this.setData({
        ["userVo.likes"]: this.data.userVo.likes - 1,
        likesType: "good-job-o"
      })
      Toast.success("点赞已取消")
    }
  },

  //评价

  onShow() {
    if (this.data.id != 0) {
      var that = this
      wx.request({
        url: config.host + "/api/user/getInfo?id=" + that.data.userVo.id,
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
  },

  onLoad(options) {
    console.log(options);
    this.setData({["userVo.id"]:options.data});
  },
})
