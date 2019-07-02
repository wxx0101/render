
Page({
  data: {
    hotdata: [],
    val: "",
    dataList: [],
    currentInd: 0,
    newArr: []
  },
  onLoad: function (options) {
    // console.log(options)
  },
  InputFn({ detail }) {
    let { value } = detail
    this.setData({
      val: value
    })
  },
  listFn({target}){
    let {ind} = target.dataset
    let {val} = this.data
    this.setData({
      currentInd: ind,
      val: "",
      dataList: []
    })
    wx.navigateTo({
      url: `/pages/searchlist/searchlist?val=${val}`,
    })
  },
  searchFn() {
    let { val } = this.data
    wx.request({
      url: 'https://jbiz.share1diantong.com/fa053/search/associateKw',
      data: {
        "kw": val
      },
      method: 'POST',
      success: ({ data }) => {
        this.setData({
          dataList: data.data.output.kwRes
        })
      },
    })
  },
  onReady: function () {
    wx.request({
      url: 'https://jbiz.share1diantong.com/fa053/search/recommendKw',
      data: {},
      method: 'POST',
      success: ({ data }) => {
        this.setData({
          hotdata: data.data
        })
      }
    })
  }
})