Page({
  data: {
    baseOptions: {
      "pageNum": 1,
      "kw": "衣服女",
      "pageSize": 10,
      "userId": 0
    },
    newArr: [],
    val: ""
  },
  errorFn({
    target
  }) {
    let {
      ind
    } = target.dataset
    let {
      newArr
    } = this.data
    newArr[ind].topicPic = "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3910945165,1124858367&fm=26&gp=0.jpg"
    this.setData({
      newArr
    })
  },
  bottomFn() {
    let {
      baseOptions,
      val,
      newArr,
      baseOptions: {
        pageNum
      }
    } = this.data
    wx.showLoading({
      title: '加载中...',
    })
    setTimeout(() => {
      pageNum++
      this.setData({
        baseOptions: {
          ...baseOptions,
          pageNum
        }
      }, () => {
        wx.request({
          url: 'https://jbiz.share1diantong.com/fa053/topic/search/v1',
          method: "POST",
          data: {
            ...baseOptions,
            "kw": val
          },
          success: ({
            data
          }) => {
            this.setData({
              newArr: newArr.concat(data.data.list)
            }, () => {
              wx.hideLoading()
            })
          }
        })
      })
    }, 1000)
  },
  onLoad: function(options) {
    let {
      val
    } = options
    let {
      baseOptions
    } = this.data
    wx.request({
      url: 'https://jbiz.share1diantong.com/fa053/topic/search/v1',
      method: "POST",
      data: {
        ...baseOptions,
        "kw": val
      },
      success: ({
        data
      }) => {
        this.setData({
          val: val,
          newArr: data.data.list
        })
      }
    })
  },
  onReady: function() {

  }
})