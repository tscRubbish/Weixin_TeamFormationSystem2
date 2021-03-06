// pages/login/login.js
import request from "../../utils/request"
import config from "../../config/config"
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog'
var app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: '',
    show:false,
    message:"邮箱或密码错误"
  },
  // 表单项内容发生改变的回调
  handleInput(event) {
    console.log(event);
    let type = event.currentTarget.id;
    this.setData({
      [type]: event.detail.value
    })
  },

  async do() {
     wx.request({
        url: config.host + "/api/user/login",
        method: "POST",
        data: {
          username:this.data.username,
          password:this.data.password,
          email:this.data.username
        },
        fail: (res) => {
          console.log(res)
        },
        success: (res) => {
          console.log(res.data)
          if (res.data.message == "邮箱或密码错误") {

            Dialog.alert({title: '提示',
            message: '用户名或密码错误'});
            
          } else if (res.data.content.userVo.id != null) {
            app.globalData.id = res.data.content.userVo.id;
            app.globalData.token = res.data.content.njuToken;
            app.globalData.longToken = res.data.content.njuLongToken;
            wx.navigateTo({ 
              url: '/pages/mine/mine',
            })
          }
          
        },
      })
  },

  login(){ 
    if (this.data.username == "") {
      Dialog.alert({title: '提示',
            message: '用户名为空'});
    } else if (this.data.password == "") {
      Dialog.alert({title: '提示',
      message: '密码为空'});
    } else {
      this.do();
    }
    
  },

  toRegister(event){
   wx.navigateTo({
     url: '../register/register',
   })
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