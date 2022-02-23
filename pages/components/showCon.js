// pages/behaviors/showCon.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showCon:false
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeModalCancel: function name(params) {
      var t = this;
      t.setData({
        showCon: false
      })
    },
  }
})
