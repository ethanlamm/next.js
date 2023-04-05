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

----------  *以下，均为 app router 情况*  ----------

四、[defining-routes](https://nextjs.org/blog/layouts-rfc#defining-routes)

以 **文件夹** 的形式来定义路由，以 **文件** 的形式来定义页面，并且有新的约定：

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

五、[Layout](https://nextjs.org/blog/layouts-rfc#layouts)

A **layout** is UI that is shared between route segments in a subtree. Layouts **do not affect URL paths** and d**o not re-render** (React state is preserved) when a user navigates between sibling segments.

分两种：

- Root layout：to customize the initial document shell (e.g. `<html>` and `<body>` tags)
- Regular layout：inside a specific folder



`layout.tsx` 不会渲染到 UI 上

```tsx
import React from 'react'

export default function SettingsLayout() {
    return (
        <>
            <div>SettingsLayout</div>
        </>
    )
}
```

如 `settings/layout.tsx` 的结构如上，`/dashboard/settings` 不会渲染  `settings/layout.tsx` 的内容。

一个合法的 `layout.tsx` 须是一个接受 `children` props 的 React 组件，`layout.tsx` 包裹的页面(组件)将在 `children` 的位置渲染出来

官方原话：A layout can be defined by default exporting a React component from a layout.js file. The component should accept a children prop which will be populated with the segments the layout is wrapping

六、[Page](https://nextjs.org/blog/layouts-rfc#pages)

A **page** is UI that is unique to a route segment. You can create a page by adding a `page.js` file inside a folder.

For a route to be valid, it needs to have a page in its leaf segment. If it doesn't, the route will throw an error.

七、[Route Group](https://nextjs.org/blog/layouts-rfc#route-groups)

- 用 `()` 包裹命名一个文件夹：A route group can be created by wrapping a folder’s name in parenthesis: `(folderName)`

- 不影响路由：The naming of route groups are only for organizational purposes since they do not affect the URL path

作用：

1. 抽离出 layout，不受 layout 布局影响

![route group-作用1](https://nextjs.org/_next/image?url=%2Fstatic%2Fblog%2Flayouts-rfc%2Froute-group-opt-out-before.png&w=3840&q=75)

2. 管理（组织）相关路由

![route group-作用2](https://nextjs.org/_next/image?url=%2Fstatic%2Fblog%2Flayouts-rfc%2Froute-group-organisation.png&w=3840&q=75)

3. 创建多 Root layout

![route group-作用3](https://nextjs.org/_next/image?url=%2Fstatic%2Fblog%2Flayouts-rfc%2Froute-group-multiple-root.png&w=3840&q=75)

八、[Loading](https://nextjs.org/blog/layouts-rfc#instant-loading-states)

The new router will use Suspense for instant loading states and default skeletons.

Suspense boundaries will be automatically handled behind-the-scenes with a new file convention called `loading.js`.

```tsx
// loading.js
export default function Loading() {
  return <YourSkeleton />
}

// layout.js
export default function Layout({children}) {
  return (
    <>
      <Sidebar />
      {children}
    </>
  )
}

// Output
<>
  <Sidebar />
  <Suspense fallback={<Loading />}>{children}</Suspense>
</>
```

九、[Error Handling](https://nextjs.org/blog/layouts-rfc#error-handling)

Error boundaries are React components that catch JavaScript errors anywhere **in their child component tree**.

You'll be able to create an Error Boundary that will catch errors within a **subtree** by adding a `error.js` file and default exporting a React Component.

Errors inside a `layout.js` file in the same segment as an `error.js`  **will not be caught** as the automatic error boundary wraps the children of a layout and not the layout itself.

```tsx
// error.js
export default function Error({ error, reset }) {
  return (
    <>
      An error occurred: {error.message}
      <button onClick={() => reset()}>Try again</button>
    </>
  );
}

// layout.js
export default function Layout({children}) {
  return (
    <>
      <Sidebar />
      {children}
    </>
  )
}

// Output
<>
  <Sidebar />
  <ErrorBoundary fallback={<Error />}>{children}</ErrorBoundary>
</>
```

十、[Template](https://nextjs.org/blog/layouts-rfc#templates)

Templates are similar to Layouts in that they wrap each child Layout or Page

Unlike Layouts that persist across routes and maintain state, templates **create a new instance** for each of their children. This means that when a user navigates between route segments that share a template, **a new instance** of the component is mounted

We recommend using Layouts unless you have a specific reason to use a Template.

A template can be defined by exporting a default React component from a `template.js` file. The component should accept a **children** prop which will be populated with nested segments.

```tsx
// template.js
export default function Template({ children }) {
  return <Container>{children}</Container>;
}

// The rendered output of a route segment with a Layout and a Template will be as such:
<Layout>
  {/* Note that the template is given a unique key. */}
  <Template key={routeParam}>{children}</Template>
</Layout>
```

usage:

- Enter/exit animations using CSS or animation libraries
- Features that rely on `useEffect` (e.g logging page views) and `useState` (e.g a per-page feedback form)
- To change the default framework behavior. E.g. suspense boundaries inside Layouts only show the fallback the first time the Layout is loaded and not when switching pages. For templates, the fallback is shown on each navigation.