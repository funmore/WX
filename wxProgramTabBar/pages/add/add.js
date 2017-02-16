//add.js
const date = new Date()
const years = []
const months = []
const days = []
const hours=[]
const mins=[]

for (let i = 17; i <= 18; i++) {
  years.push(i)
}

for (let i = 1 ; i <= 12; i++) {
   months.push(i)
}

for (let i = 1 ; i <= 31; i++) {
  days.push(i)
}

for (let i = 0 ; i <= 23; i++) {
  hours.push(i)
}

for (let i = 0 ; i <= 59; i++) {
  mins.push(i)
}

Page({
  data: {
    years: years,
    year: 17,
    months: months,
    month: 2,
    days: days,
    day: 2,
    hours:hours,
    hour:00,
    mins:mins,
    min:00,
    value: [18, 1, 1, 0, 0],
  },
  bindChange: function(e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]],
      hour:this.data.hours[val[3]],
      min:this.data.mins[val[4]]
    })
  }
})
