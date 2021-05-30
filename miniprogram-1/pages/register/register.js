// pages/register/register.js
var app = getApp()
import config from "../../config/config"
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog'

Page({

  /**
   * 页面的初始数据
   */
  data: {
      username:'',
      email:'',
      password:'',
      userType:'Admin',
      show:'',
      message:''
  },
  handleInput(event) {
    console.log(event);
    let type = event.currentTarget.id;
    this.setData({
      [type]: event.detail.value
    })
  },

  register() {
    if (this.data.username == "") {
      Dialog.alert({title: '提示',
      message: '用户名为空'});
    } else if (this.data.email == "") {
      Dialog.alert({title: '提示',
      message: '邮箱为空'});
    } else if (this.data.password == "") {
      Dialog.alert({title: '提示',
      message: '密码为空'});
    } else {
        wx.request({
        url: config.host + '/api/user/register',
        method: "POST",
        header: {
          "nju-token": app.globalData.token,
          "nju-long-token": app.globalData.longToken
        },
        data: {
          "description": "",
          "email": this.data.email,
          "id": 0,
          "likes": 0,
          "password": this.data.password,
          "pic": "string",
          "score": 0,
          "tags": [
            "string"
          ],
          "userType": this.data.userType,
          "username": this.data.username
        },
        success: (res) => {
          console.log(res)
          if (res.data.message == "邮箱重复") {
            Dialog.alert({title: '提示',
              message: '邮箱重复'});
          } else if (res.data.message == "用户名重复") {
            Dialog.alert({title: '提示',
            message: '用户名重复'});
          } else if (res.data.message == "注册失败") {
            Dialog.alert({title: '提示',
            message: '注册失败'});
          }else {
            wx.request({
              url: config.host + "/api/user/login",
              method: "POST",
              header: {
                "nju-token": app.globalData.token,
                "nju-long-token": app.globalData.longToken
              },
              data: {
                "description": "",
                "email": this.data.email,
                "id": 0,
                "likes": 0,
                "password": this.data.password,
                "pic": "string",
                "score": 0,
                "tags": [
                  "string"
                ],
                "userType": this.data.userType,
                "username": this.data.username
              },
              success: (res) => {
                console.log(res);
                app.globalData.id = res.data.content.userVo.id;
                app.globalData.token = res.data.content.njuToken;
                app.globalData.longToken = res.data.content.njuLongToken;
                wx.navigateTo({
                  url: '../mine/mine',
                })
              }
            })
          
          }
        }
      })
    }
   
  },

  onClose(event){
    this.setData({show : false});
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})