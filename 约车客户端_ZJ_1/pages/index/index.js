//index.js
var sha1 = require('../../utils/sha1.js');
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '航天小秘',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindInvateTap: function() {
    wx.navigateTo({
      url: '../invate/index'
    })
  },
  onLoad: function () {
    //console.log('onLoad')
    var that = this
    //调用登录接口
    wx.login({
      success: function(res) {
        wx.getUserInfo({
          success: function (res) {
            //更新数据
            that.setData({
              userInfo:res.userInfo
            });
          }
        });
        if (res.code) {
          var timestamp = Date.parse(new Date());
          timestamp = timestamp / 1000;
          //console.log(app.data.key + timestamp);
          //console.log(sha1.hex_sha1(app.data.key + timestamp));
          //发起网络请求
          wx.request({
            url: 'http://localhost/api/login',
            data: {
              code: res.code,
              t:timestamp,
              s: sha1.hex_sha1(app.data.key + timestamp)
            },
            success: function(res) {
              wx.setStorageSync('token', res.data.token);
              wx.setStorageSync('role', res.data.role);

              var role = res.data.role;
              console.log(role);
              if (role == 'employee') {
                wx.redirectTo({
                  url: '../employee/index'
                })
              }
              else if (role == 'admin') {
                console.log('admin page');
                wx.redirectTo({
                  url: '../admin/index'
                })
              }
              else if (role == 'company') {
                wx.redirectTo({
                  url: '../company/index'
                })
              }
              else {
                that.setData({
                  motto: '您的微信未被授权，点击输入邀请码'
                })
              }
            }
          })
        } else {
          
        }
      }
    })    
    
  }
})
