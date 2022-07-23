# dtracker
<h1 align="center"><img src="https://user-images.githubusercontent.com/6822604/179356367-c781af73-e8ae-4959-9871-75e0476fcea5.png"/></h1>
<h4 align="center">通用前端网络接口拦截库</h4>
<p align="center">
支持Ajax，Fetch，Image，navigator.sendBeacon等请求。常用于接口异常监控，数据上报，数据旁路等场景
</p>
<div align="center">
<a href="https://npmjs.org/package/dtracker" target="_blank"><img src="https://img.shields.io/npm/v/dtracker.svg" alt="NPM Version" /></a>
<a href="https://github.com/ihtml5/dtracker/pulls" target="_blank"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs"/></a>
<a href="https://nodejs.org" target="_blank"><img src="https://img.shields.io/badge/node-%3E%3D%208.0.0-brightgreen.svg" alt="Node Version" /></a>
</div>

## 一、安装

#### Install using npm 
``` 
npm install dtracker --save

```
## 二、如何使用
### 1.自动基于已经上报的数据做上报
 ```javascript
  dtracker.create({
    onProxy: function(data) {
    /*
    data.data object 获取到的上报数据
    data.type object 请求类型 ajax|fetch|image|beacon,
    data.extra object 包含请求地址等其他信息
    1. 传给onProxy函数的data代表通过sdk捕获到的网络请求
    2. 根据上报的网络请求地址,拿到上报的信息
    3. 将上报的信息经过标准化后通过调用doReport回传
    dtracker.doReport({
        baseUrl: 'https://reporteurl.com', 填入数据上报目标地址
        data: transformdata,
        method: 'GET' // 默认get, 也支持post发送
    });
    */
    },
})
 ```
### 2.使用dtracker.doReport在代码中进行手动上报
```javascript
  dtracker.doReport({
    baseUrl: 'https://reporteurl.com', // 填入数据上报目标地址
    data: {
        sOp: 'pageView',
        osType: 'iphone',
    },
    method: 'GET' // 默认get, 也支持post发送
  });
```
## 三、相关文章

1. [揭开JS无埋点技术的神秘面纱](http://unclechen.github.io/2018/06/24/%E6%8F%AD%E5%BC%80JS%E6%97%A0%E5%9F%8B%E7%82%B9%E6%8A%80%E6%9C%AF%E7%9A%84%E7%A5%9E%E7%A7%98%E9%9D%A2%E7%BA%B1/)
2. [前端热力图系统实现](https://nodefe.com/heatmap-system/)
3. [基于IntersectionObserver的曝光统计测试](https://xgfe.github.io/2017/10/18/lulutia/IntersectionObserver/)
4. [Building and testing at Facebook](https://www.facebook.com/notes/facebook-engineering/building-and-testing-at-facebook/10151004157328920/)

## 四、相关项目
1. [optimal-select](https://github.com/Autarc/optimal-select)
