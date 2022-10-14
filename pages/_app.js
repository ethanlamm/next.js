// App组件 顶级组件

// 全局样式，只能在 _app.js 这一文件中引入！！
import '../styles/global.css';

// pages/_app.js => App组件，顶级组件
// pages/index.js => Home组件
// pages/posts/first-post.js => FirstPost组件
// components/layout.js => Layout组件，框架组件
// 结构：
// App
//  |--Layout
//      |--Home
//  |--FirstPost
//      |--Layout
export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />;
}