//app.js
var sha1 = require('utils/sha1.js');
App({
  data: {
    key: 'GKy2riERcMybIbSimP8zWT5TvrIlrgnn'
  },
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  globalData:{
    userInfo:null
  }
})