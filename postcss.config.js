module.exports = {
  plugins: {
    'postcss-pxtorem': {
      // 转换的基准值，以设计稿为准
      // 375: 37.5
      // 750: 75
      // Vant 组件的样式是以 375 设计稿开发的
      rootValue: 37.5,
      propList: ['*']
    }
  }
}
