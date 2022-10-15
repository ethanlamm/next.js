Next.js

一、结构目录

components

​	----存放公共组件

​	----layout.js：框架模板组件

​	----layout.module.css：layout组件对应样式

​	----date.js：日期组件

lib

​	----统一管理api

​	----posts.js：获取文章数据的api接口

pages

​	----存放路由组件

​	----_app.js：App根组件

​	----index.js：Home组件（首页）

​	----404.js：自定义404组件

​	----posts文件夹

​		  ----二级路由路径文件夹

​		  ----[id].js：二级动态路由，匹配 '/posts/1'、 '/posts/2'。。。

posts

​	----存放博客文章的文件夹

public

​	----favicon.ico：网页图标

​	----images文件夹：存放图片

styles

​	----global.css：全局公共样式（一般做样式重置），只能引入_app.js组件中使用

​	----utils.module.css：自定义公共样式，可引入除_app.js组件外的其他组件使用

二、路径问题

1.存放在pages文件夹中的组件，这些组件的文件名，就是找到其页面的路径

index.js组件：'/'

[id].js组件：'/posts/1'、 '/posts/2'。。。（因为其存放在posts文件夹下）

注意：public/images文件夹下的图片：‘/images/profile.jpg’

三、next/link（Link组件）

```js
import Link from 'next/link'
```

- href（必需）：跳转url

```
1.字符串形式
href={`/posts/${id}`}

2.对象形式
■ 匹配 '/about?name=test'
href={{
	pathname:'/about',
	query:{name:'test'}
}}
■ 匹配 '/blog/my-post'
href={{
	pathname: '/blog/[slug]',
	query: { slug: 'my-post' },
}}
```

- replace：默认false
- scroll：跳转后滚动到顶部，默认true

四、next/image（Image组件）

```js
import Image from 'next/image'
```

- src（必需）：图片路径
- width、height（必需）：图片的宽高，默认单位：px（可不写）
- priority：高优先级并预加载，默认false。使用优先级的图像会自动禁用 lazy loading
- alt：文字信息提示

五、next/head（Head组件）

```js
import Head from 'next/head'
```

- 卸载组件时 Head 组件的内容会被清除，因此请确保每个**页面**都定义了 head 中需要的内容
- 在 Head 组件中的script，Next.js有相应的 Script 组件（推荐使用）

```
import Head from 'next/head'
import Script from 'next/script'

<Head>
	<title>My page title</title>
	<meta property="og:title" content="My page title" key="title" />
	<Script src="https://js.stripe.com/v3/" />
</Head>
```

六、Pre-rendering

​	1. Static Generation（静态生成）

- [getStaticProps](https://nextjs.org/docs/basic-features/data-fetching/get-static-props)

```js
export async function getStaticProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}
// context：receive the return from getStaticPaths
```

- [getStaticPaths](https://nextjs.org/docs/basic-features/data-fetching/get-static-paths)：必须和 getStaticProps 一起使用

```js
export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    fallback: false, // can also be true or 'blocking'
  }
}
```

<img src="https://nextjs.org/static/images/learn/dynamic-routes/how-to-dynamic-routes.png" alt="img" style="zoom: 50%;" />



​	2. Server-side Rendering（服务端渲染）

- [getServerSideProps](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props)

```js
export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}
```

七、[Deploying Your Next.js App](https://nextjs.org/learn/basics/deploying-nextjs-app/other-hosting-options)