System.register(["./index-legacy-056b2097.js"],(function(t,e){"use strict";var n,r,c;return{setters:[t=>{n=t.cc,r=t.cd,c=t.ce}],execute:function(){
/*!
       * (C) Ionic http://ionicframework.com - MIT License
       */
t("createSwipeBackGesture",((t,e,i,s,o)=>{const a=t.ownerDocument.defaultView;let u=n(t);const d=t=>u?-t.deltaX:t.deltaX;return r({el:t,gestureName:"goback-swipe",gesturePriority:101,threshold:10,canStart:r=>(u=n(t),(t=>{const{startX:e}=t;return u?e>=a.innerWidth-50:e<=50})(r)&&e()),onStart:i,onMove:t=>{const e=d(t)/a.innerWidth;s(e)},onEnd:t=>{const e=d(t),n=a.innerWidth,r=e/n,i=(t=>u?-t.velocityX:t.velocityX)(t),s=i>=0&&(i>.2||e>n/2),l=(s?1-r:r)*n;let h=0;if(l>5){const t=l/Math.abs(i);h=Math.min(t,540)}o(s,r<=0?.01:c(0,r,.9999),h)}})}))}}}));
