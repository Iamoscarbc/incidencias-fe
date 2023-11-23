import{a as v}from"./axios-3342bc3c.js";import{d as B,g as A,t as N,v as $,x as P,a as _,y as z,z as S,A as T,B as h,c5 as E,c6 as F,c as O,c7 as D,c8 as H,c9 as L,b as M,I as R,h as Z,i as j,a7 as J,r as I,aZ as K,ca as q,cb as G,_ as Q,j as b,o as m,J as U,l as d,w as n,M as W,K as X,k as V,n as k,L as Y,N as x,m as u}from"./index-40efad69.js";const ee=B({components:{IonPage:A,IonHeader:N,IonToolbar:$,IonTitle:P,IonContent:_,IonCard:z,IonCardTitle:S,IonCardHeader:T,IonCardContent:h,IonButtons:E,IonBackButton:F,IonInput:O,IonSelect:D,IonSelectOption:H,IonTextarea:L,IonIcon:M,IonButton:R},setup(){const e=Z(),o=j(),p=J({get(){return!t.value.firstname||!t.value.lastname||!t.value.phone||!t.value.email||!t.value.docnumber||!t.value.idProfile||!t.value.password||!y.test(t.value.docnumber)||!C.test(t.value.password)},set(){}}),y=/^\d{8}$/,C=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;let f=I(!0),s=I([]),t=I({firstname:"",lastname:"",phone:"",email:"",docnumber:"",idProfile:"",password:"",state:1});const g=async()=>{let l=localStorage.getItem("token");const i=(await v.get("/api/user/"+o.params.id,{headers:{Authorization:"Bearer "+l}})).data;i.success&&(t.value=i.data)},c=async()=>{let l=localStorage.getItem("token");const i=(await v.get("/api/profiles/",{headers:{Authorization:"Bearer "+l}})).data;i.success&&(s.value=i.data)};return K(()=>{f.value=!0,c(),o.params.id&&g(),f.value=!1}),{addCircleOutline:q,closeCircleOutline:G,form:t,loading:f,profiles:s,invalidForm:p,createUser:async()=>{if(!p.value){let l=localStorage.getItem("token"),r=t.value;(await v.post("/api/user",r,{headers:{Authorization:"Bearer "+l}})).data.success&&e.back()}},updateUser:async()=>{if(!p.value){let l=localStorage.getItem("token"),r=t.value;(await v.put("/api/user/"+o.params.id,r,{headers:{Authorization:"Bearer "+l}})).data.success&&e.back()}},validateNumber:async(l,r)=>{console.log("form.value[field]",t.value[l].length),t.value[l].length>r&&(t.value[l]=t.value[l].substr(0,r))}}}});const oe={key:0,class:"ion-padding add-view-incidence"},ae=u("div",{slot:"label"},"Nombres",-1),te=u("div",{slot:"label"},"Apellidos",-1),le=u("div",{slot:"label"},"DNI",-1),ne=u("div",{slot:"label"},"Celular",-1),se=u("div",{slot:"label"},"Email",-1),re=u("div",{slot:"label"},"Password",-1);function ie(e,o,p,y,C,f){const s=b("ion-input"),t=b("ion-select-option"),g=b("ion-select"),c=b("ion-button");return e.loading?x("",!0):(m(),U("div",oe,[d(s,{modelValue:e.form.firstname,"onUpdate:modelValue":o[0]||(o[0]=a=>e.form.firstname=a),"label-placement":"floating",fill:"outline"},{default:n(()=>[ae]),_:1},8,["modelValue"]),d(s,{modelValue:e.form.lastname,"onUpdate:modelValue":o[1]||(o[1]=a=>e.form.lastname=a),"label-placement":"floating",fill:"outline"},{default:n(()=>[te]),_:1},8,["modelValue"]),d(s,{modelValue:e.form.docnumber,"onUpdate:modelValue":o[2]||(o[2]=a=>e.form.docnumber=a),"label-placement":"floating",fill:"outline",type:"number",onIonBlur:o[3]||(o[3]=a=>e.validateNumber("docnumber",8))},{default:n(()=>[le]),_:1},8,["modelValue"]),d(s,{modelValue:e.form.phone,"onUpdate:modelValue":o[4]||(o[4]=a=>e.form.phone=a),"label-placement":"floating",fill:"outline",type:"number",onIonBlur:o[5]||(o[5]=a=>e.validateNumber("phone",9))},{default:n(()=>[ne]),_:1},8,["modelValue"]),d(s,{modelValue:e.form.email,"onUpdate:modelValue":o[6]||(o[6]=a=>e.form.email=a),"label-placement":"floating",fill:"outline"},{default:n(()=>[se]),_:1},8,["modelValue"]),d(s,{modelValue:e.form.password,"onUpdate:modelValue":o[7]||(o[7]=a=>e.form.password=a),"label-placement":"floating",fill:"outline",type:"password"},{default:n(()=>[re]),_:1},8,["modelValue"]),d(g,{modelValue:e.form.idProfile,"onUpdate:modelValue":o[8]||(o[8]=a=>e.form.idProfile=a),label:"Profile","label-placement":"floating",fill:"outline",interface:"action-sheet"},{default:n(()=>[(m(!0),U(W,null,X(e.profiles,a=>(m(),V(t,{value:a._id},{default:n(()=>[k(Y(a.name),1)]),_:2},1032,["value"]))),256))]),_:1},8,["modelValue"]),e.$route.params.id?(m(),V(c,{key:1,expand:"full",onClick:o[10]||(o[10]=a=>e.updateUser()),disabled:e.invalidForm},{default:n(()=>[k("Actualizar Incidencia")]),_:1},8,["disabled"])):(m(),V(c,{key:0,expand:"full",onClick:o[9]||(o[9]=a=>e.createUser()),disabled:e.invalidForm},{default:n(()=>[k("Crear Incidencia")]),_:1},8,["disabled"]))]))}const fe=Q(ee,[["render",ie]]);export{fe as A};