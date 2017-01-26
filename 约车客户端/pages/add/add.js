Page({
  data: {

    date: '2016-09-01',
    time: '12:01',
    array_keshi:['一室','二室','三室','四室'],
    index_keshi: 0,
    array_yongcheleixing:['管理','科研','横向'],
    index_yongcheleixing: 0,
  },
 
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function(e) {
    this.setData({
      time: e.detail.value
    })
  },
  bindPickerKeshiChange: function(e) {
    this.setData({
      index_keshi: e.detail.value
    })
  },
  bindPickerYongcheleixingChange: function(e) {
    this.setData({
      index_yongcheleixing: e.detail.value
    })
  }
})