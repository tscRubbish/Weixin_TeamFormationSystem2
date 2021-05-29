// pages/Team_details/Team_details.js
import config from "../../config/config"
const app = getApp();
Page({


  data: {
    active:2,
    Tname:"",
    match_name:"",
    TID:"",
    Timg_path:"",
    notice:"",
    memberID_array:[],
    memberName_array:[],
    teamVo:{},
    token:"",
    longToken:"",
  },


  onLoad(event) {
    console.log(event);
    wx.setNavigationBarTitle({
      title: '队伍信息'
    });
    this.setData({
      Tname:event.Tname,
      match_name:event.match_name,
      TID:event.TID,
      Timg_path:event.Timg_path,
      notice:event.notice,
      memberID_array:event.memberID_array,
      memberName_array:event.memberName_array,
      token:app.globalData.token,
      longToken:app.globalData.longToken
    });
    var that = this;
    wx.request({
      url: config.host + '/api/team/getInfo?id=' + event.TID,
      method: 'GET',
      success(res){
        //console.log(res);
        that.setData({
          teamVo:res.data.content,
        })
      }
    })
  },

  click_notice(event){
    wx.showModal({
      title: '公告',
      content: event.target.dataset.notice,
      showCancel:false,
      confirmText:"我知道了",
    })

  },

  click_member(event){
    console.log(event);
    var that = this;
    wx.showActionSheet({
      itemList: String(event.target.dataset.membername_array).split(","),
      success (res) {
        console.log(res);
        var userID = that.data.memberID_array[res.tapIndex];
        console.log(userID);
        wx.redirectTo({
          url: '../another/another?data=' + userID,
        })
      },
    
    })
  },

  changeTeamInfo(event){
    wx.redirectTo({
      url: '/pages/changeTeamInfo/changeTeamInfo?TID=' + this.data.TID,
    })
  },

  dissolution(){

    var that = this;
    console.log(that.data.teamVo);
    wx.showModal({
      content:"确定要解散队伍吗",
      confirmText:"确定",
      cancelText:"取消",
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定');
          wx.request({
            url: config.host + '/api/team/delete',
            method: 'POST',
            data:that.data.teamVo,
            header:{
              "nju-token":that.data.token,
              "nju-long-token":that.data.longToken,
            },
            success(res){
              console.log(res);
              wx.redirectTo({
                url: '../index/index',
              })
            }

          })

        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      }
    })
  }

  
})