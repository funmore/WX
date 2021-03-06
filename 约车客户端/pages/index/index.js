var app=getApp()
Page({
  data:{
    tabs: ['用车申请', '用车审批', '用车调度'],
    stv: {
      windowWidth: 0,
      lineWidth: 0,
      offset: 0,
      tStart: false
    },
    activeTab: 0,
    state:'',
    usetime:0,
    telephone:0,
    type:'',
    manager:'',
    reason: '',   //补全
    passenger:'',
    isweekend:0,
    isreturn:0,
    workers:0,
    applyer:'',
    keshi:0,                                                    
    departIndex:0,
    departLocation:'',
    destIndex:0,
    destLocation:'',
    notes:''
  },
  onLoad:function(options){
   try {
      let {tabs} = this.data; 
      var res = wx.getSystemInfoSync()
      this.windowWidth = res.windowWidth;
      this.data.stv.lineWidth = this.windowWidth / this.data.tabs.length;
      this.data.stv.windowWidth = res.windowWidth;
      this.setData({stv: this.data.stv})
      this.tabsCount = tabs.length;
    } catch (e) {
    }
  },
  handlerStart(e) {
    let {clientX, clientY} = e.touches[0];
    this.startX = clientX;
    this.tapStartX = clientX;
    this.data.stv.tStart = true;
    this.tapStartTime = e.timeStamp;
    this.setData({stv: this.data.stv})
  },
  handlerMove(e) {
    let {clientX, clientY} = e.touches[0];
    let {stv} = this.data;
    let offsetX = this.startX - clientX;
    this.startX = clientX;
    stv.offset += offsetX;
    if(stv.offset <= 0) {
      stv.offset = 0;
    } else if(stv.offset >= stv.windowWidth*(this.tabsCount-1)) {
      stv.offset = stv.windowWidth*(this.tabsCount-1);
    }
    this.setData({stv: stv});
  },
  handlerCancel(e) {

  },
  handlerEnd(e) {
    let {clientX, clientY} = e.changedTouches[0];
    let endTime = e.timeStamp;
    let {tabs, stv, activeTab} = this.data;
    let {offset, windowWidth} = stv;
    //快速滑动
    if(endTime - this.tapStartTime <= 300) {
      //向左
      if(this.tapStartX - clientX > 5) {
        if(activeTab < this.tabsCount -1) {
          this.setData({activeTab: ++activeTab})
        }
      } else {
        if(activeTab > 0) {
          this.setData({activeTab: --activeTab})
        }
      }
      stv.offset = stv.windowWidth*activeTab;
    } else {
      let page = Math.round(offset/windowWidth);
      if (activeTab != page) {
        this.setData({activeTab: page})
      }
      stv.offset = stv.windowWidth*page;
    }
    stv.tStart = false;
    this.setData({stv: this.data.stv})
  },
   _updateSelectedPageData(page){
          var timestamp = Date.parse(new Date());
          timestamp = timestamp / 1000;
          wx.request({
              url: 'test.php', //正吉url
              data: {
                 token:wx.getStorageSync('token'),
                 t:timestamp,
                 s:sha1.hex_sha1(app.data.key+timestamp),

                 p:page
              },
              header: {
                  'content-type': 'application/json'
              },
              method:'GET',
              success: function(res) {
                console.log(res.data)
              }
            })
   },
  _updateSelectedPage(page) {
    let {tabs, stv, activeTab} = this.data;
    activeTab = page;
    this.setData({activeTab: activeTab})
    stv.offset = stv.windowWidth*activeTab;
    this.setData({stv: this.data.stv});
    _updateSelectedPageData(page);
  },
  handlerTabTap(e) {
    this._updateSelectedPage(e.currentTarget.dataset.index);
  }
})