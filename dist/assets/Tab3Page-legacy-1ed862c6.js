System.register(["./axios-legacy-3c286fdd.js","./index-legacy-b0f9597a.js","./TimeLine-legacy-ffe48280.js"],(function(e,t){"use strict";var n,o,a,l,i,r,s,d,u,c,f,p,m,g,I,h,_,C,v,y,b,x,k,A,E,U,w,D,R,z,B,T,S,j,F,O,H,L;return{setters:[e=>{n=e.a},e=>{o=e.d,a=e.g,l=e.t,i=e.v,r=e.x,s=e.a,d=e.y,u=e.z,c=e.A,f=e.B,p=e.b,m=e.C,g=e.D,I=e.e,h=e.c0,_=e.c1,C=e.c2,v=e.c3,y=e.E,b=e.F,x=e.h,k=e.r,A=e.H,E=e.c4,U=e._,w=e.j,D=e.o,R=e.k,z=e.w,B=e.l,T=e.n,S=e.J,j=e.K,F=e.m,O=e.L,H=e.M},e=>{L=e.T}],execute:function(){var t=document.createElement("style");t.textContent="ion-item[data-v-7982ddff]::part(native){background:#121212}\n",document.head.appendChild(t);const J=o({components:{Timeline:L,IonPage:a,IonHeader:l,IonToolbar:i,IonTitle:r,IonContent:s,IonCard:d,IonCardTitle:u,IonCardHeader:c,IonCardContent:f,IonIcon:p,IonFabButton:m,IonFab:g,IonItem:I,IonItemOption:h,IonItemOptions:_,IonItemSliding:C,IonAlert:v,IonRefresher:y,IonRefresherContent:b},setup(){const e=x();let t=k(!1),o=k(null),a=k([]);const l=async()=>{let e=localStorage.getItem("token");const t=(await n.get("http://206.189.176.12:3002/api/users",{headers:{Authorization:"Bearer "+e}})).data;t.success&&(a.value=t.data)};return{add:A,personCircle:E,isOpen:t,idForDelete:o,alertButtons:[{text:"Sí",role:!0},{text:"No",role:!1}],users:a,getUsers:l,ionViewDidEnter:()=>{l()},redirectAddUser:()=>{e.push({name:"AgregarUsuario"})},redirectEditUser:t=>{e.push({name:"EditarUsuario",params:{id:t}})},openDeleteAlert:async e=>{t.value=!0,o.value=e},logResult:async e=>{if(t.value=!1,e.detail.role){let e=localStorage.getItem("token");(await n.delete("http://206.189.176.12:3002/api/user/"+o.value,{headers:{Authorization:"Bearer "+e}})).data.success&&await l()}o.value=null},handleRefresh:async e=>{await l(),e.target.complete()}}}});e("default",U(J,[["render",function(e,t,n,o,a,l){const i=w("ion-title"),r=w("ion-toolbar"),s=w("ion-header"),d=w("ion-refresher-content"),u=w("ion-refresher"),c=w("ion-icon"),f=w("ion-card-title"),p=w("ion-card-header"),m=w("ion-card"),g=w("ion-item"),I=w("ion-item-option"),h=w("ion-item-options"),_=w("ion-item-sliding"),C=w("ion-fab-button"),v=w("ion-fab"),y=w("ion-alert"),b=w("ion-content"),x=w("ion-page");return D(),R(x,null,{default:z((()=>[B(s,null,{default:z((()=>[B(r,null,{default:z((()=>[B(i,null,{default:z((()=>[T("Usuarios")])),_:1})])),_:1})])),_:1}),B(b,{fullscreen:!0},{default:z((()=>[B(u,{slot:"fixed",onIonRefresh:t[0]||(t[0]=t=>e.handleRefresh(t))},{default:z((()=>[B(d)])),_:1}),B(s,{collapse:"condense"},{default:z((()=>[B(r,null,{default:z((()=>[B(i,{size:"large"},{default:z((()=>[T("Usuarios")])),_:1})])),_:1})])),_:1}),(D(!0),S(H,null,j(e.users,(t=>(D(),R(_,null,{default:z((()=>[B(g,{lines:"none"},{default:z((()=>[B(m,{style:{width:"100%",margin:"10px 0"}},{default:z((()=>[B(p,null,{default:z((()=>[B(f,{style:{display:"flex","align-items":"center",gap:"8px"}},{default:z((()=>[B(c,{icon:e.personCircle,size:"large"},null,8,["icon"]),F("span",null,O(t.firstname)+" "+O(t.lastname),1)])),_:2},1024)])),_:2},1024)])),_:2},1024)])),_:2},1024),B(h,null,{default:z((()=>[B(I,{onClick:n=>e.redirectEditUser(t._id)},{default:z((()=>[T("Editar")])),_:2},1032,["onClick"]),B(I,{color:"danger",onClick:n=>e.openDeleteAlert(t._id)},{default:z((()=>[T("Eliminar")])),_:2},1032,["onClick"])])),_:2},1024)])),_:2},1024)))),256)),B(v,{slot:"fixed",vertical:"bottom",horizontal:"end",onClick:t[1]||(t[1]=t=>e.redirectAddUser())},{default:z((()=>[B(C,null,{default:z((()=>[B(c,{icon:e.add},null,8,["icon"])])),_:1})])),_:1}),B(y,{"is-open":e.isOpen,header:"¿Estás seguro de eliminar este usuario?",buttons:e.alertButtons,onDidDismiss:t[2]||(t[2]=t=>e.logResult(t))},null,8,["is-open","buttons"])])),_:1})])),_:1})}],["__scopeId","data-v-7982ddff"]]))}}}));
