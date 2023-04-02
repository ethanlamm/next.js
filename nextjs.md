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

二、[how-routing-currently-works](https://nextjs.org/blog/layouts-rfc#how-routing-currently-works)  page directory

三、[app directory](https://nextjs.org/blog/layouts-rfc#introducing-the-app-directory)

To ensure these new improvements can be incrementally adopted and avoid breaking changes, we are proposing a new directory called `app`. This directory is for using the new features.

---当前项目仅记录 app router 的情况---

四、路由

以 **文件夹** 的形式来定义路由，以 **文件** 的形式来定义页面，并且有新的协定：

- `layout.tsx`：代表当前路径页面的 layout 模板（在`page.tsx`的外层）
- `page.tsx`：代表当前路径的 UI 页面
- `loading.tsx`：代表当前路径 loading 加载页面



路径的对应方式

![路径对应](https://nextjs.org/_next/image?url=%2Fstatic%2Fblog%2Flayouts-rfc%2Froute-segments.png&w=3840&q=75)

```
app
  -- layout.tsx：不影响路径
  -- page.tsx => `/`
  dashboard
    -- layout.tsx：不影响路径
    -- page.tsx => `/dashboard`
    settings
      -- layout.tsx：不影响路径
      -- page.tsx => `/dashboard/settigs`
```

