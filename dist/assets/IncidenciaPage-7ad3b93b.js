import{A as b}from"./AddViewIncidence-4f7b5695.js";import{d as C,g as $,t as g,v as k,x as h,a as B,y as V,z as w,A,B as y,c5 as N,c6 as T,_ as v,j as n,o as a,k as s,w as e,l as o,n as d,L as l,N as u}from"./index-35ea6de4.js";import"./axios-3342bc3c.js";import"./index-a08ccca5.js";const z=C({components:{IonPage:$,IonHeader:g,IonToolbar:k,IonTitle:h,IonContent:B,IonCard:V,IonCardTitle:w,IonCardHeader:A,IonCardContent:y,IonButtons:N,IonBackButton:T,AddViewIncidence:b},setup(){}});function H(t,P,j,D,L,S){const _=n("ion-back-button"),p=n("ion-buttons"),r=n("ion-title"),c=n("ion-toolbar"),i=n("ion-header"),m=n("AddViewIncidence"),f=n("ion-content"),I=n("ion-page");return a(),s(I,null,{default:e(()=>[o(i,null,{default:e(()=>[o(c,null,{default:e(()=>[o(p,{slot:"start"},{default:e(()=>[o(_)]),_:1}),t.$route.params.id?(a(),s(r,{key:0},{default:e(()=>[d("Incidencia #"+l(t.$route.params.id.substr(t.$route.params.id.length-4,4)),1)]),_:1})):u("",!0)]),_:1})]),_:1}),o(f,{fullscreen:!0},{default:e(()=>[o(i,{collapse:"condense"},{default:e(()=>[o(c,null,{default:e(()=>[t.$route.params.id?(a(),s(r,{key:0,size:"large"},{default:e(()=>[d("Incidencia #"+l(t.$route.params.id.substr(t.$route.params.id.length-4,4)),1)]),_:1})):u("",!0)]),_:1})]),_:1}),o(m,{create:!1})]),_:1})]),_:1})}const G=v(z,[["render",H]]);export{G as default};