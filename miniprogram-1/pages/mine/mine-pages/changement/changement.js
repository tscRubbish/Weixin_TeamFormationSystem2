import config from "../../../../config/config"
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
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
    showImage: false,
    showIntro: false,
  },

  //编辑头像
  showImage() {
    this.setData({ showImage: true });
  },

  onImageClose() {
    this.setData({ showImage: false });
  },

  //改变介绍
  onIntroChange(e) {
    this.setData({
      ["userVo.description"]:e.detail
    })
    console.log(this.data.words)
  },

  //保存
  save() {
        wx.request({
          url: config.host + "/api/user/changeInfo",
          method: "POST",
          header: {
            "nju-token": app.globalData.token,
            "nju-long-token": app.globalData.longToken
          },
          data: this.data.userVo,
          success: (res) => {
            console.log(res);
          }
        })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "编辑个人信息"
    });
    this.setData({
      ["userVo.id"]: options.id
    })
    var that = this
    wx.request({
      url: config.host + "/api/user/getInfo?id=" + this.data.userVo.id,
      header: {
        "nju-token": app.globalData.token,
        "nju-long-token": app.globalData.longToken
      },
      success: (res) => {
        console.log(res);
        that.setData({
          userVo: res.data.content
        })
      }
    })
  },
})