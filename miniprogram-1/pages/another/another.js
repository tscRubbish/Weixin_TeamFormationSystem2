import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import config from "../../config/config";
var app = getApp();

Page({
  data: {
    tabber: "mine",
    id: 0,
    name: "未登录",
    words: "这个人很懒哦，还没有填写介绍",
    likes: 0,
    likesType: "good-job-o",
    score: 0,
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
    email: "",
    //其他用户的星级评分
    value:0
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
        data: {
          "description": this.data.words,
          "email": this.data.email,
          "id": this.data.id,
          "likes": this.data.likes,
          "password": "string",
          "pic": "string",
          "score": this.data.score,
          "tags": [
            "string"
          ],
          "userType": "Admin",
          "username": this.data.name
        },
        success: (res) => {
          this.setData({
            likes: this.data.likes + 1,
            likesType: "good-job"
          })
        }
      })
      Toast.success('已点赞');
    } else if (type == "good-job") {
      this.setData({
        likes: this.data.likes - 1,
        likesType: "good-job-o"
      })
      Toast.success("点赞已取消")
    }
  },

  //评价
  onScoreChange(e) {
    let type = e.currentTarget.dataset.type
    if (type == "medal-o") {
      wx.request({
        url: config.host + "/api/user/updateScores?score=" + this.data.score,
        method: "POST",
        header: {
          "nju-token": app.globalData.token,
          "nju-long-token": app.globalData.longToken
        },
        data: {
          "description": this.data.words,
          "email": this.data.email,
          "id": this.data.id,
          "likes": this.data.likes,
          "password": "string",
          "pic": "string",
          "score": this.data.score,
          "tags": [
            "string"
          ],
          "userType": "Admin",
          "username": this.data.name
        },
        success: (res) => {
          this.setData({
            score: this.data.score + 1,
            scoreType: "medal"
          })
        }
      })
      Toast.success("评价成功")
    } else if (type == "medal") {
      this.setData({
        score: this.data.score - 1,
        scoreType: "medal-o"
      })
      Toast.success("评价已取消")
    }
  },

  //退出登录
  exit() {
    if (this.data.login == "退出登录") {
      this.setData({
        id: 0,
        name: "未登录",
        login: "点击登录",
        good: 0,
        words:"",
        likes: 0,
        medal: 0
      })
    } else {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },

  onShow() {
    if (this.data.id != 0) {
      wx.request({
        url: config.host + "/api/user/getInfo?id=" + this.data.id,
        header: {
          "nju-token": app.globalData.token,
          "nju-long-token": app.globalData.longToken
        },
        success: (res) => {
          console.log(res);
          var temp = res.data.content;
          this.setData({
            name: temp.username,
            email: temp.email,
            likes: temp.likes,
            score: temp.score,
            words: temp.description
          });
        },
        fail: (res) => {
          console.log(res)
        }
      })
    }
    if (this.data.id <= 0) {
      this.setData({login: "点击登录"})
    } else {
      this.setData({login: "退出登录"})
    }
  },
  //评分
  onChange(event) {
    this.setData({
      value: event.detail,
    });
  },
  onLoad(options) {
    console.log(options);
    this.setData({"id":options.data});
  },
})
