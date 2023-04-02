一、创建 Next.JS(app router)

```sh
$ yarn create next-app
```

选择TS、app目录、@/*；不选择src目录、ESLint

运行项目

```sh
$ yarn dev -- 开发环境
$ yarn start -- 生产环境
```

目录结构：

```
app：Next.JS 新特性增加的目录，新的目录约定
  -- api：api 目录
  -- favicon.ico：图标
  -- layout.tsx：根组件layout模板，可定义结构、Head标签
  -- page.tsx：首页，对应根路径 '/'
  -- global.css：只能在 layout.tsx 中引入使用
  -- page.module.css：只能在 page.tsx 中引入使用
public：静态资源目录
```