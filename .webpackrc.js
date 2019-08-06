//配置按需加载：当页面比较多时，项目就会变得越来越大，尤其对于单页面应用来说，初次渲染的速度就会很慢，这时候就需要按需加载，只有切换到页面的时候才去加载对应的js文件。
const path = require("path")

export default{
    extraBabelPlugins: [
        ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]
    ],
    //引入静态文件
    alias: {
        Assets: path.resolve(__dirname,"./src/assets")
    }
};