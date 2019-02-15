# README
##基本信息
这是个课堂系统升级版，class_system应该会废弃掉。目前主要用在PC端。框架：vue
本项目是vue-cli(webpack-simple)生成的，后续引入其他的东西，不断修改webpack.config.js
本项目使用了ELement Ui ,采用了完整加载的方式
本项目对webpakc.config.js采取了优化，至此，webpack配置不会再有大变动了

组件之间传递数据会用公共bus组件，除此之外，父子组件传递数据用了prop,但并不保证每个父子组件都是这么传递数据的。

## 运行步骤：##

git clone

cd  项目目录

git checkout (切换分支)

npm i(npm太慢用 cnpm i)

npm run dev(开发):自动打开浏览器
npm run build(打包):生成build，上线的时候拷贝其中的文件

教师页面入口地址：
/#/teacher/login（第一个/代表网站根目录）
机构页面入口地址：
/#/org/login


# axios
