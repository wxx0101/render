Page({
  data: {
    bannerdata: {},
    options: {
      "cateTag": "全部", // 全部  || 品牌  || …
      "fixedFlower": 1, //一口花  1 或者 0
      "isNew": 1, //是否全新  1 或者 0
      "isLocal": 1, // 是否同城   1或者0
      "status": 1,
      "bid": 0,
      "orderBy": 0,
      "pageSize": 20, // 页数
      "pageNum": 1 // 分页值
    },
    listdata: [],
    num: 0
  },
  onLoad: function (options) {

  },
  scrollFn() {
    let { listdata, options: { pageNum, pageSize } } = this.data
    wx.showLoading({
      title: '加载中...',
    })
    setTimeout(() => {
      pageNum++;
      this.setData({
        options: {
          ...this.data.options,
          pageNum
        }
      }, () => {
        wx.request({
          url: 'https://jbiz.share1diantong.com/as/index/cate/v1',
          method: "POST",
          data: {
            ...this.data.options
          },
          success: ({ data }) => {
            this.setData({
              listdata: listdata.concat(data.data.recommends)
            },() => {
              wx.hideLoading()
            })
          }
        })
      })
    }, 1000)


  },
  searchFn(){
    wx.navigateTo({
      url: "/pages/search/search"
    })
  },
  onReady: function () {
    wx.request({
      url: 'https://39916353.share1diantong.com/v1/home/index',
      method: "POST",
      success: ({
        data
      }) => {
        this.setData({
          bannerdata: data.data.legaowei.template1.model3
        })
      }
    })

    wx.request({
      url: 'https://jbiz.share1diantong.com/as/index/cate/v1',
      method: "POST",
      data: {
        ...this.data.options
      },
      success: ({ data }) => {
        this.setData({
          listdata: data.data.recommends
        })
      }
    })
  }
})