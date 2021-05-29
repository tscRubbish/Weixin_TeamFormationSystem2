// pages/changeTeamInfo/changeTeamInfo.js
import config from "../../config/config"
const app = getApp();
Page({

  data: {
    TID:"",
    Tname:"123",
    MaxNum: 4,
    choose_match: "LPL",
    show: false,
    pic:"",
    Tintroduction:"",
    Tpassword:"123321",
    teamVo:{},
    token:"",
    longToken:""
  },

  onLoad(event) {
    //console.log(event);
    var tempToken = app.globalData.token;
    var tempLong = app.globalData.longToken;

    this.setData({
      TID:event.TID,
      token:tempToken,
      longToken:tempLong,
    });
    var that = this;
    wx.request({
      url: config.host + '/api/team/getInfo?id=' + that.data.TID,
      method:'GET',
      success(res){
        console.log(res);
        that.setData({
          teamVo:res.data.content,
          Tname:res.data.content.name,
          MaxNum:res.data.content.maxNum,
          choose_match:res.data.content.contest.name,
          pic:res.data.content.pic,
          Tintroduction:res.data.content.description,
          Tpassword:res.data.content.password,
        });
      }
    });

  },

  changeInfo(){
    var that = this;
    var tempName = 'teamVo.name';
    var tempNum = 'teamVo.maxNum';
    var tempPic = 'teamVo.pic';
    var tempIntrodction = 'teamVo.description';
    var tempPassword = 'teamVo.password'
    that.setData({
      [tempName]:that.data.Tname,
      [tempNum]:that.data.MaxNum,
      [tempPic]:that.data.pic,
      [tempIntrodction]:that.data.Tintroduction,
      [tempPassword]:that.data.Tpassword
    })
    wx.request({
      url: config.host + '/api/team/changeInfo',
      method: 'POST',
      data:that.data.teamVo,
      header:{
        "nju-token":that.data.token,
        "nju-long-token":that.data.longToken
      },
      success(res){
        console.log(res);
        wx.redirectTo({
          url: '../index/index',
        })
      }
    })
  }
})
