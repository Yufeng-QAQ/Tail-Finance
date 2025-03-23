// 项目的入口 从这里开始运行

// React必要的两个核心包
import React from 'react';
import ReactDOM from 'react-dom/client';

// 导入项目的根组件
import router from "./router/router"
import store from './store';
import { RouterProvider } from 'react-router-dom';
import { Provider } from "react-redux"



// 把APP根组件渲染到id为root的dom节点上
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
    </Provider>
    

);

