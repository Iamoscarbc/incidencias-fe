System.register(["./axios-legacy-3c286fdd.js","./index-legacy-b0f9597a.js","./TimeLine-legacy-ffe48280.js"],(function(e,n){"use strict";var t,a,i,l,o,d,r,c,s,u,f,I,h,_,g,m,p,b,C,y,T,k,x,A,D,R,j,v,w,z,B,F,H;return{setters:[e=>{t=e.a},e=>{a=e.d,i=e.g,l=e.t,o=e.v,d=e.x,r=e.a,c=e.y,s=e.z,u=e.A,f=e.B,I=e.b,h=e.C,_=e.D,g=e.E,m=e.F,p=e.G,b=e.h,C=e.r,y=e.H,T=e._,k=e.j,x=e.o,A=e.k,D=e.w,R=e.l,j=e.n,v=e.J,w=e.K,z=e.L,B=e.M,F=e.N},e=>{H=e.T}],execute:function(){const n=a({components:{Timeline:H,IonPage:i,IonHeader:l,IonToolbar:o,IonTitle:d,IonContent:r,IonCard:c,IonCardTitle:s,IonCardHeader:u,IonCardContent:f,IonIcon:I,IonFabButton:h,IonFab:_,IonRefresher:g,IonRefresherContent:m},computed:{...p("usuarios",["user"])},setup(){const e=b();let n=C([]);const a=async()=>{let e=localStorage.getItem("token");const a=(await t.get("http://206.189.176.12:3002/api/incidences",{headers:{Authorization:"Bearer "+e}})).data;a.success&&(n.value=a.data)};return{incidences:n,redirectDetail:n=>{e.push({name:"DetalleIncidencia",params:{id:n}})},redirectAdd:()=>{e.push({name:"AgregarIncidencia"})},handleRefresh:async e=>{await a(),e.target.complete()},ionViewDidEnter:()=>{a()},add:y}}});e("default",T(n,[["render",function(e,n,t,a,i,l){const o=k("ion-title"),d=k("ion-toolbar"),r=k("ion-header"),c=k("ion-refresher-content"),s=k("ion-refresher"),u=k("ion-card-title"),f=k("ion-card-header"),I=k("Timeline"),h=k("ion-card-content"),_=k("ion-card"),g=k("ion-icon"),m=k("ion-fab-button"),p=k("ion-fab"),b=k("ion-content"),C=k("ion-page");return x(),A(C,null,{default:D((()=>[R(r,null,{default:D((()=>[R(d,null,{default:D((()=>[R(o,null,{default:D((()=>[j("Incidencias")])),_:1})])),_:1})])),_:1}),R(b,{fullscreen:!0},{default:D((()=>[R(s,{slot:"fixed",onIonRefresh:n[0]||(n[0]=n=>e.handleRefresh(n))},{default:D((()=>[R(c)])),_:1}),R(r,{collapse:"condense"},{default:D((()=>[R(d,null,{default:D((()=>[R(o,{size:"large"},{default:D((()=>[j("Incidencias")])),_:1})])),_:1})])),_:1}),(x(!0),v(B,null,w(e.incidences,(n=>(x(),A(_,{onClick:t=>e.redirectDetail(n._id)},{default:D((()=>[R(f,null,{default:D((()=>[R(u,null,{default:D((()=>[j("Incidencia #"+z(n._id.substr(n._id.length-4,4)),1)])),_:2},1024)])),_:2},1024),R(h,null,{default:D((()=>[R(I,{steps:n.timeline},null,8,["steps"])])),_:2},1024)])),_:2},1032,["onClick"])))),256)),e.user&&"653752a46f75ce25da5cb7dd"!=e.user.idProfile._id?(x(),A(p,{key:0,slot:"fixed",vertical:"bottom",horizontal:"end",onClick:n[1]||(n[1]=n=>e.redirectAdd())},{default:D((()=>[R(m,null,{default:D((()=>[R(g,{icon:e.add},null,8,["icon"])])),_:1})])),_:1})):F("",!0)])),_:1})])),_:1})}]]))}}}));
