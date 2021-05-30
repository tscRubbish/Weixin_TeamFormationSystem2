// index.js
import config from '../../config/config'
import request from '../../utils/request'
// 获取应用实例
const app = getApp()

Page({
  data: {
    userVo:{},
    teamVo:{},
    memberVo:{
      'teamVo':{},
      'userVo':{},
    },
    id: 2,
    choose_match:"点我选择",
    choose_matchID:2,
    // TODO 这里需要获得可以选择的比赛以及其ID，先随便写一个替代用
    new_introduction:"",
    new_Tpassword:"",
    show:false,
    matchs:["微信小程序开发大赛","LPL"],
    new_Tname:"",
    new_MaxNum:1,
    tabber:"team_index",
    tab_active:0,
    join_TID:"",
    join_Tpassword:"",
    match_array:[],
    token: "",
    longToken: "",
    //搜寻队员界面数据
    keyword:'',
      page:1,
      hasResult:false,
      userList:[],
  },
  onTabberChange(event) {
    this.setData({tabber: event.detail})
    wx.redirectTo({url: `/pages/${event.detail}/${event.detail}`})
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: '组队'
    });

    var that = this;

    that.data.token = app.globalData.token ;
    that.data.longToken = app.globalData.longToken;
    that.data.id = app.globalData.id;
    wx.request({
      url: config.host + '/api/user/getInfo?id=' + that.data.id,
      method: 'GET',
      success(res){
        that.setData({
          userVo: res.data.content,
        });
        console.log(that.data.userVo);
        wx.request({
          url: config.host + '/api/team/getTeamList',
          method: 'POST',
          data:that.data.userVo,
          header:{
            'nju-token':that.data.token,
            'nju-long-token':that.data.longToken
          },
          success(res2){
            console.log(res2);
            that.setData({
              match_array: res2.data.content,
            });
            if (that.data.match_array)
            for (var i = 0; i < that.data.match_array.length; i++){
              var memberList = that.data.match_array[i].members;
              var memberIDList = new Array();
              var memberNameList = new Array();
              var Num_now = memberList.length + 1;
              memberIDList.push(that.data.match_array[i].captain.id);
              memberNameList.push(that.data.match_array[i].captain.username);
              for (var j = 0; j < memberList.length; j++){
                memberIDList.push(memberList[j].id);
                memberNameList.push(memberList[j].username);
              }
              var temp = "match_array[" + i + "].memberIDList";
              var temp2 = "match_array[" + i + "].memberNameList";
              var temp3 = "match_array[" + i + "].Num_now";
              that.setData({
                [temp]:memberIDList,
                [temp2]:memberNameList,
                [temp3]:Num_now,
              })
            }
            console.log(that.data.match_array);
          }
        })
      }
    })
  },

  handleInput(event) {
    console.log(event);
    let type = event.currentTarget.id;
    this.setData({
      [type]: event.detail
    })
    console.log(this.data.keyword)
  },
  async search(event){
    let that=this;
      request('/api/user/search',{word:this.data.keyword,page:this.data.page},{},'GET',function(result){
        console.log(result.data.content);
        that.setData({userList:result.data.content});
        if (that.data.userList==undefined|| that.data.userList.length==0) that.setData({hasResult:false});
        else that.setData({hasResult:true});
        console.log(that.data.userList);
        console.log(that.data.hasResult);
      });
  },
  prePage(event){
    if (this.data.page>1) {
      this.setData({page:this.data.page-1});
      this.search(event);
    }
  },
  nextPage(event){ 
    if (this.data.hasResult){ 
      this.setData({page:this.data.page+1});
      this.search(event);
      }
  },
  toUser(event){
    let user=event.currentTarget.dataset.item;
      if (user.id==undefined) user=event.currentTarget.dataset.item.contestVo;
    wx.navigateTo({
      url: '/pages/another/another?data='+JSON.stringify(user.id),
    });
  },
  onChange(event) {
    // event.detail 的值为当前选中项的索引
    this.setData({ active: event.detail });
  },

  tab_onChange(event){
      // wx.showToast({
      //   title: `切换到标签 ${event.detail.name}`,
      //   icon: 'none',
      // });
  },


  match_Change(event) {
    this.setData({
      choose_match:event.detail.value
    })
  },
  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },
  
  join_team(event){
    var that = this;
    wx.request({
      url: config.host + '/api/team/getInfo?id=' + that.data.join_TID,
      method: 'GET',
      success(res){
        that.setData({
          teamVo:res.data.content,
        });
        var temp = 'memberVo.teamVo';
        var temp2 = 'memberVo.userVo';
        var temp3 = 'memberVo.teamVo.password';
        that.setData({
          [temp]:that.data.teamVo,
          [temp2]:that.data.userVo,
          [temp3]:that.data.join_Tpassword,
        })

        console.log(that.data.memberVo);
        wx.request({
          url: config.host + '/api/team/takepart?password=' + that.data.join_Tpassword,
          method:'POST',
          data:that.data.memberVo,
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
      }

    })

    
  },

  createTeam(){
    var that = this;
    wx.request({
      url: config.host + '/api/team/create',
      method: 'POST',
      data:{
        "captainId":that.data.id,
        "contestId":that.data.choose_matchID,
        "description":"",
        "maxNum":that.data.new_MaxNum,
        "name":that.data.new_Tname,
        "password":that.data.new_Tpassword,
      },
      header:{
        "nju-token":that.data.token,
        "nju-long-token":that.data.longToken,
      },
      success(res){
        console.log(res);
        wx.navigateTo({
          url: '../index/index',
        })
      }

    })
  }

})
