!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t(e.dtracker={})}(this,function(e){"use strict";const t=Object.prototype.toString,n=e=>"[object Object]"===t.call(e),o=e=>"string"==typeof e,r=e=>"function"==typeof e,i=navigator.userAgent,a=(e=i)=>{const{machineSys:t,engineVer:n}=((e=i)=>{let t="unknown",n="unknown",o="unknown",r="unknown",a="unknown";const s=e.toLowerCase();if(s.indexOf("windows")>-1?a="windows":s.indexOf("linux")>-1?a="linux":s.indexOf("mac")>-1&&(a="mac"),window.opera)r=window.opera.version(),n=window.opera.version(),o="opera";else if(/AppleWebKit\/(\S+)/.test(e))if(r=RegExp.$1,o="webkit",/Chrome\/(\S+)/.test(e))n=RegExp.$1,t="chrome";else if(/Version\/(\S+)/.test(e))n=RegExp.$1,t="safari";else{let e=1;const o=parseFloat(r);n=e=o<100?1:o<312?1.2:o<412?1.3:2,t="safari"}else/KHTML\/(\S+)/.test(e)||/Konqueror\/([^;]+)/.test(e)?(r=RegExp.$1,n=RegExp.$1,o="khtml",t="konq"):/rv:([^\)]+)\) Gecko\/\d{8}/.test(e)?(r=RegExp.$1,o="gecko",/Firefox\/(\S+)/.test(e)&&(n=RegExp.$1,t="firefox")):/MSIE ([^;]+)/.test(e)&&(r=RegExp.$1,n=RegExp.$1,o="ie",t="ie");return{machine:"PC",name:t,version:n,engineVer:r,engine:o,machineSys:a}})(e),o={mac:"mac"===t,version:n,name:t},r={},a={iphone:e.match(/(iphone)\s(os\s)?([\d_]+)/i),ipad:e.match(/(ipad).*\s([\d_]+)/i),ipod:e.match(/(ipod).*\s([\d_]+)/i),android:e.match(/(android)\s([\d\.]+)/i),windows:e.match(/Windows(\s+\w+)?\s+?(\d+\.\d+)/)};a.ipod&&(o.ios=!0,o.ipod=!0,o.version=a.ipod[2].replace(/_/g,"."),o.name="ipod"),a.ipad&&(o.ios=!0,o.ipad=!0,o.version=a.ipad[2].replace(/_/g,"."),o.name="ipad"),a.iphone&&(o.iphone=!0,o.ios=!0,o.version=a.iphone[3].replace(/_/g,"."),o.name="iphone"),a.android&&(o.android=!0,o.version=a.android[2],o.name="android"),a.windows&&(o.windows=!0,o.version=a.windows[2],o.name="windows");const s={WEISHI:e.match(/weishi_(\d+?\.\d+?\.\d+?)/i),YYB:e.match(/\/qqdownloader\/(\d+)(?:\/(appdetail|external|sdk))?/i),mojii:e.match(/mojii/i),IE:e.match(/; msie\b|; trident\b|\bedge\//i),WeChat:e.match(/MicroMessenger\/((\d+)\.(\d+))\.(\d+)/)||e.match(/MicroMessenger\/((\d+)\.(\d+))/),MQQClient:!e.match(/QQReader/)&&e.match(/QQ\/(\d+\.\d+)/i)||e.match(/V1_AND_SQ_([\d\.]+)/),MQQReader:e.match(/QQReader/i),QQvideo:!e.match(/TADChid/)&&e.match(/QQLiveBrowser\/([\d.]+)/),QQHDvideo:e.match(/QQLiveHDBrowser\/([\d.]+)/),TBSSDK:e.match(/MQQBrowser\/(\d+\.\d+)/i)&&e.match(/MSDK\/(\d+\.\d+)/),MQQBrowser:e.match(/MQQBrowser\/(\d+\.\d+)/i),UCBrowser:e.match(/ucbrowser\/(\d+\.\d+)/i),Qzone:e.match(/Qzone\/[\w\d\_]*(\d\.\d)[\.\w\d\_]*/i),Weibo:e.match(/Weibo/i),qqnews:e.match(/qqnews\/(\d+\.\d+\.\d+)/i),QQLiveBroadcast:e.match(/QQLiveBroadcast/i),kuserAgentibao:e.match(/qnreading\/(\d+\.\d+\.\d+)/i),liebao:e.match(/LieBaoFast\/(\d+\.\d+\.\d+)/i),baiduboxapp:e.match(/baiduboxapp\/(\d+\.\d+\.\d+)/i),IEMobile:e.match(/IEMobile(\/|\s+)(\d+\.\d+)/)||e.match(/WPDesktop/),douban:e.match(/com\.douban\.frodo\/(\d+\.\d+\.\d+)/i),MiuiBrowser:e.match(/MiuiBrowser\/(\d+\.\d+)/i),BingPreview:e.match(/BingPreview\/(\d+\.)/i),TADChid:e.match(/TADChid\/(\d+)/i),Chrome:o.ios?e.match(/CriOS\/(\d+\.\d+)/):e.match(/Chrome\/(\d+\.\d+)/),Safari:e.match(/Safari\/(\d+\.\d+)/),sukan:e.match(/synopsis/i)};if(s.MQQReader)r.MQQReader=!0,r.version=1,r.name="MQQReader";else if(s.IEMobile)r.IEMobile=!0,r.version=1,r.name="IEMobile";else for(const e in s)if(s[e]){r[e]=!0,r.version=s[e][1]||0,r.name=e;break}return{browser:r,os:o}};!function(){function e(e){this.value=e}function t(t){var n,o;function r(n,o){try{var a=t[n](o),s=a.value;s instanceof e?Promise.resolve(s.value).then(function(e){r("next",e)},function(e){r("throw",e)}):i(a.done?"return":"normal",a.value)}catch(e){i("throw",e)}}function i(e,t){switch(e){case"return":n.resolve({value:t,done:!0});break;case"throw":n.reject(t);break;default:n.resolve({value:t,done:!1})}(n=n.next)?r(n.key,n.arg):o=null}this._invoke=function(e,t){return new Promise(function(i,a){var s={key:e,arg:t,resolve:i,reject:a,next:null};o?o=o.next=s:(n=o=s,r(e,t))})},"function"!=typeof t.return&&(this.return=void 0)}"function"==typeof Symbol&&Symbol.asyncIterator&&(t.prototype[Symbol.asyncIterator]=function(){return this}),t.prototype.next=function(e){return this._invoke("next",e)},t.prototype.throw=function(e){return this._invoke("throw",e)},t.prototype.return=function(e){return this._invoke("return",e)}}();var s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e};const c=()=>{},d=({name:e,url:t=window.location.href})=>{e=e.replace(/[\[\]]/g,"\\$&");const n=new RegExp(`[?&]${e}(=([^&#]*)|&|#|$)`).exec(t);return n&&n[2]?decodeURIComponent(n[2].replace(/\+/g," ")):""},l=(e,t,n)=>{let o=null;return function(...r){const i=this;clearTimeout(o),o=setTimeout(()=>{e.apply(i,r),"function"==typeof n&&n()},t)}},{browser:p,os:h}=a(),u={browser:p.name,hh_ua:navigator.userAgent,sOsType:h.name,sUrl:window.location.href,sRefer:document.referrer},m=({baseUrl:e="",data:t,method:n="GET"})=>{if("GET"===n){let n=new Image;n.onerror=(()=>{n=null}),n.onload=(()=>{n=null}),n.src=`${e}&${(e=>{const t=[];for(const n in e)t.push(`${encodeURIComponent(n)}=${encodeURIComponent(e[n])}`);return t.join("&")})(s({},u,t))}`}else if("POST"===n)try{let n=null;(n=window.XMLHttpRequest?new window.XMLHttpRequest:new window.ActiveXObject("Microsoft.XMLHTTP")).open("POST",e,!0),n.setRequestHeader("Content-type","application/x-www-form-urlencoded"),n.send(JSON.stringify(s({},u,t)))}catch(e){console.warn("xmlhttp error",e)}},w=(e,t={})=>s({},e,t),f=e=>{try{return document.getElementById(e)||document.getElementsByName(e)[0]||document.querySelector(e)}catch(e){console.warn(`querySelector ${e}`)}},y=(e,t=!1)=>{const n=[];if(!e||!e.tagName)return"";if(e.id)return`#${e.id}`;if(n.push(e.tagName.toLowerCase()),t){const{className:t}=e||{};if("string"==typeof t){const e=t.split(/\s+/);n.push(`.${e.join(".")}`)}}return e.name&&n.push(`[name=${e.name}]`),n.join("")},g=(e,t=!1)=>{if(!(e instanceof HTMLElement))return console.warn("input is not a HTML element!"),"";const n=[];let o=e;for(;o;){let r=y(o,t);if(!r)break;if(n.unshift(r),f(n.join(">"))===e||r.indexOf("body")>=0)break;n.shift();const{children:i}=o.parentNode;if(i.length>1)for(let e=0;e<i.length;e++)if(i[e]===o){r+=`:nth-child(${e+1})`;break}if(n.unshift(r),f(n.join(">"))===e)break;o=o.parentNode}return n.join(">")},v=(e,t=c)=>{document.addEventListener?document.addEventListener(e,t):document.attachEvent&&document.attachEvent(e,t)},b=e=>{const t=[];for(const n in e)t.push(`${encodeURIComponent(n)}=${encodeURIComponent(e[n])}`);return t.join("&")},x=e=>{const t=window.history[e];return function(){const n=new Event(e);return n.arguments=arguments,window.dispatchEvent(n),t.apply(this,arguments)}};class S{constructor(e){this.options=e}initRroxy(e={}){const{options:t={}}=this;window.history.pushState=x("pushState"),window.history.replaceState=x("replaceState"),window.addEventListener("pushState",()=>{e.send(s({sOp:"pageView"},t))}),window.addEventListener("replaceState",()=>{e.send(s({sOp:"pageView"},t))});const n=window.onpopstate;window.onpopstate=function(...o){return e.send(s({sOp:"pageView"},t)),n.apply(this,o)}}}class E{constructor(e){this.options=e}initProxy(e={}){const{options:t={}}=this,n=n=>{e.send(s({selector:g(n.target,!0)},t))};Array.isArray(e.events)?e.events.forEach(e=>v(e,n)):v("click",n)}}class Q{initProxy(e){const{onProxy:t}=e,n=window.Image;window.Image=function(e,o){const i=new n(e,o);return["load","error","abort"].forEach(e=>{i.addEventListener(e,e=>{(e=>{const n=e.target?e.target:e.srcElement;n!==window&&"IMG"===n.nodeName&&r(t)&&t({data:null,type:"image",extra:{url:n.currentSrc||n.src}})})(e)},!0)}),i}}}class k{initProxy(e){const{onProxy:t}=e;if(!window.fetch)return;const n=window.fetch;window.fetch=((...e)=>n.apply(null,...e).then(n=>{try{const i=n.headers?n.headers.get("content-type"):"";if(o(i)&&-1!==i.indexOf("application/json")){n.clone().json().then(n=>{try{r(t)&&t({type:"fetch",data:n,extra:{url:e[0]}})}catch(e){console.warn(e)}}).catch(e=>{console.error("getCgiInfo",e)})}}catch(e){console.error("getCgiInfo",e)}return n}).catch(e=>{console.error("getCgiInfo",e)}))}}class M{initProxy(e){const t=Object.create(null),{onProxy:n}=e;t.send=XMLHttpRequest.prototype.send,t.open=XMLHttpRequest.prototype.open,XMLHttpRequest.prototype.open=function(e,n,o=!0){t.open.apply(this,[e,n,o]),this.dtrackerUrl=n},XMLHttpRequest.prototype.send=function(e){r(n)&&n({type:"ajax",data:e,extra:{url:this.dtrackerUrl}}),t.send.apply(this,[e])}}}class R{getBeaconData(e){try{return n(e)?e:o(e)?JSON.parse(e):{}}catch(e){return console.error(`get BeaconData ${e}`),{}}}initProxy(e){const{onProxy:t}=e,n=this,o=navigator.sendBeacon;r(o)&&(navigator.sendBeacon=((...e)=>{const i=[`${e[0]}&${b(s({},u,n.getBeaconData(e[1])))}`];o.apply(window.navigator,i),r(t)&&t({type:"beacon",data:e[1],extra:{url:e[0]}})}))}}const P=(e=(()=>{}))=>r(e)?(...t)=>{try{e.apply(void 0,t)}catch(e){console.error(`wrapTryCatch ${e}`)}}:e;let $=null;e.version="0.2.0",e.create=(({options:e={},cgi:t={sampling:1,baseUrl:""},baseUrl:o,delay:i=2e3,sampling:d=1,params:p=[],events:h=["click"],onBeforeSend:u=c,onProxy:f=c})=>($||($=new class{constructor({options:e={},baseUrl:t="",sampling:n=1,delay:o=2e3,params:r=[],onBeforeSend:i,debug:a,events:s,settings:c={},onProxy:d}){this.options=e,this.errorList=[],this.baseUrl=t,this.sampling=n,this.params=r,this.delay=o,this.onBeforeSend=i,this.debug=a,this.events=s,this.settings=c,this.onProxy=P(d)}init(){const e=this;try{(new S).initRroxy(e),(new E).initProxy(e),(new Q).initProxy(e),(new k).initProxy(e),(new M).initProxy(e),(new R).initProxy(e)}catch(e){console.warn(`dtracker ${e}`)}}send(e={},t=!1){const o=this,{baseUrl:i}=o,{sampling:d,delay:p=200}=o,{browser:h,os:u}=a(navigator.userAgent);if(Math.random()<d){const a=l(m,p,c),d=o.onBeforeSend;let f=s({url:document.location.href,browser:h.name,ostype:u.name},e);if(r(d))try{const e=d(f);if("boolean"==typeof e&&!e)return;n(e)&&(f=w(f,e))}catch(e){console.warn(e)}a({baseUrl:i,data:s({},e,f),method:t?"POST":"GET"})}}}({options:e,baseUrl:o,params:p,delay:i,sampling:d,cgi:t,events:h,onBeforeSend:u,onProxy:f})),$.init(),$)),e.querySelector=f,e.getSysInfo=a,e.getUrlParam=d,e.doReport=m,e.autoRetain=(e=>{let t="";if(!o(e))return console.warn("name is not string"),t;try{return 0===(t=d({name:e})).length&&(t=(e=>{const t=`${encodeURIComponent(e)}=`,n=document.cookie.split(";");for(let e=0;e<n.length;e++){let o=n[e];for(;" "===o.charAt(0);)o=o.substring(1,o.length);if(0===o.indexOf(t))return decodeURIComponent(o.substring(t.length,o.length))}return null})(e)||""),t}catch(e){return console.error(`Automatically get the value of the corresponding name from the url or cookie ${e}`),t}}),e.parseLink=(e=>{if(!e)return{};const t=document.createElement("a");return t.href=e,{host:t.host,path:t.pathname,hostname:t.hostname,protocol:t.protocol.slice(0,-1)}}),Object.defineProperty(e,"__esModule",{value:!0})});
