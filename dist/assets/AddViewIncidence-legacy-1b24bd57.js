System.register(["./axios-legacy-3c286fdd.js","./index-legacy-2328b68c.js","./index-legacy-b0f9597a.js"],(function(e,a){"use strict";var t,i,l,n,o,d,r,c,s,m,u,p,g,f,h,A,v,x,b,I,y,C,B,k,w,F,V,z,S,j,T,N,O,U,M,X,R,G,D,L;return{setters:[e=>{t=e.a},e=>{i=e.m},e=>{l=e.d,n=e.g,o=e.t,d=e.v,r=e.x,c=e.a,s=e.y,m=e.z,u=e.A,p=e.B,g=e.c5,f=e.c6,h=e.c,A=e.c7,v=e.c8,x=e.c9,b=e.b,I=e.I,y=e.G,C=e.h,B=e.i,k=e.r,w=e.aZ,F=e.ca,V=e.cb,z=e._,S=e.j,j=e.o,T=e.J,N=e.l,O=e.w,U=e.M,M=e.K,X=e.k,R=e.n,G=e.L,D=e.N,L=e.m}],execute:function(){var a=document.createElement("style");a.textContent=".add-view-incidence{display:flex;flex-direction:column;gap:16px}.add-view-incidence .container-images{display:flex;gap:16px;overflow-x:scroll}.add-view-incidence .container-images .images{position:relative}.add-view-incidence .container-images .images img{height:100px;min-width:100px;max-width:500px}.add-view-incidence .container-images .images ion-button{position:absolute;right:0;top:0;margin:0;width:24px;height:24px;min-height:24px;--padding-top: 2px;--padding-bottom: 2px;--padding-start: 2px;--padding-end: 2px}.area__image{display:flex;justify-content:center;align-items:center;gap:8px;min-width:100px;height:100px;border-radius:8px;border:1px dashed #b3b3b3;box-shadow:0 4px 6px rgba(21,25,47,.16)}\n",document.head.appendChild(a);const q=l({components:{IonPage:n,IonHeader:o,IonToolbar:d,IonTitle:r,IonContent:c,IonCard:s,IonCardTitle:m,IonCardHeader:u,IonCardContent:p,IonButtons:g,IonBackButton:f,IonInput:h,IonSelect:A,IonSelectOption:v,IonTextarea:x,IonIcon:b,IonButton:I},computed:{...y("usuarios",["user"]),invalidForm(){return!this.form.categorie||!this.form.description||!this.form.documentNumber||8!=this.form.documentNumber.length},invalidFormUpdate(){return!this.form.specialist||0==this.form.documents.length}},methods:{openFileManager(){this.$refs.fileManager.click()}},setup(){const e=C(),a=B(),l=k(""),n=k(""),o=k([]),d=k([]),r=k({date:a.params.id?"23/10/2023 23:35:40":l,categorie:null,specialist:null,description:null,documentNumber:null,documents:[],timeline:[]}),c=k([]),s=()=>{const e=i();l.value=e.format("DD/MM/YYYY HH:mm:ss")};w((async()=>{n.value=!0,await m(),await u(),a.params.id?await p(a.params.id):(await s(),setInterval(s,1e3)),n.value=!1}));const m=async()=>{let e=localStorage.getItem("token");const a=(await t.get("http://206.189.176.12:3002/api/userByProfile/653752a46f75ce25da5cb7dd",{headers:{Authorization:"Bearer "+e}})).data;a.success&&(o.value=a.data)},u=async()=>{let e=localStorage.getItem("token");const a=(await t.get("http://206.189.176.12:3002/api/categories",{headers:{Authorization:"Bearer "+e}})).data;a.success&&(d.value=a.data)},p=async e=>{let a=localStorage.getItem("token");const i=(await t.get("http://206.189.176.12:3002/api/incidence/"+e,{headers:{Authorization:"Bearer "+a}})).data;i.success&&(r.value=i.data)};return{listOfSpecialist:o,listOfCategories:d,form:r,addCircleOutline:F,closeCircleOutline:V,urlDocuments:c,loading:n,selectImage:async e=>{for(let a=0;a<e.target.files.length;a++){const t=e.target.files[a];r.value.documents.push(t),c.value.push(URL.createObjectURL(t))}},deleteImage:async(e,a)=>{r.value.documents.splice(a,1),c.value.splice(a,1)},createIncidence:async()=>{let{date:a,categorie:i,description:l,documentNumber:n}=r.value;if(i&&l&&n){let o={date:a,categorie:i,description:l,documentNumber:n},d=localStorage.getItem("token");const r=(await t.post("http://206.189.176.12:3002/api/incidences",o,{headers:{Authorization:"Bearer "+d}})).data;r.success&&e.replace({name:"DetalleIncidencia",params:{id:r.data}})}else console.log("Completa el formulario")},updateIncidence:async()=>{let{specialist:i,documents:l}=r.value;if(i||l){var n=new FormData;for(let e=0;e<l.length;e++){const a=l[e];n.append("file",a)}n.append("specialist",i);let o=localStorage.getItem("token");(await t.put("http://206.189.176.12:3002/api/incidence/"+a.params.id,n,{headers:{Authorization:"Bearer "+o,"Content-Type":"multipart/form-data"}})).data.success&&e.back()}else console.log("Completa el formulario")},finalizeIncidence:async()=>{let i=localStorage.getItem("token");(await t.put("http://206.189.176.12:3002/api/finalize-incidence/"+a.params.id,{},{headers:{Authorization:"Bearer "+i}})).data.success&&e.back()},validateNumber:async(e,a)=>{r.value[e].length>a&&(r.value[e]=r.value[e].substr(0,a))}}}}),E={key:0,class:"ion-padding add-view-incidence"},H=L("div",{slot:"label"},"Fecha y Hora",-1),P=L("div",{slot:"label"},"Usuario Registrador",-1),Y=L("div",{slot:"label"},"DNI Alumno",-1),J=L("div",{slot:"label"},"Incidencia",-1),Q={key:1,class:"container-images"},K={class:"images"},W=["src"],_=["src"],Z={key:2,src:"data:image/png;base64,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"};e("A",z(q,[["render",function(e,a,t,i,l,n){const o=S("ion-input"),d=S("ion-select-option"),r=S("ion-select"),c=S("ion-textarea"),s=S("ion-icon"),m=S("ion-button");return e.loading?D("",!0):(j(),T("div",E,[N(o,{modelValue:e.form.date,"onUpdate:modelValue":a[0]||(a[0]=a=>e.form.date=a),"label-placement":"floating",fill:"outline",disabled:""},{default:O((()=>[H])),_:1},8,["modelValue"]),N(o,{value:e.user.firstname+" "+e.user.lastname,"label-placement":"floating",fill:"outline",disabled:""},{default:O((()=>[P])),_:1},8,["value"]),N(r,{modelValue:e.form.categorie,"onUpdate:modelValue":a[1]||(a[1]=a=>e.form.categorie=a),label:"Categoría","label-placement":"floating",fill:"outline",disabled:!!e.$route.params.id,interface:"action-sheet"},{default:O((()=>[(j(!0),T(U,null,M(e.listOfCategories,(e=>(j(),X(d,{value:e._id},{default:O((()=>[R(G(e.name),1)])),_:2},1032,["value"])))),256))])),_:1},8,["modelValue","disabled"]),e.$route.params.id?(j(),X(r,{key:0,modelValue:e.form.specialist,"onUpdate:modelValue":a[2]||(a[2]=a=>e.form.specialist=a),label:"Especialista","label-placement":"floating",fill:"outline",disabled:0!=e.form.timeline.length&&!!e.form.timeline[2].completed,interface:"action-sheet"},{default:O((()=>[(j(!0),T(U,null,M(e.listOfSpecialist,(e=>(j(),X(d,{value:e._id},{default:O((()=>[R(G(e.firstname)+" "+G(e.lastname),1)])),_:2},1032,["value"])))),256))])),_:1},8,["modelValue","disabled"])):D("",!0),N(o,{modelValue:e.form.documentNumber,"onUpdate:modelValue":a[3]||(a[3]=a=>e.form.documentNumber=a),"label-placement":"floating",fill:"outline",type:"number",disabled:!!e.$route.params.id,onIonBlur:a[4]||(a[4]=a=>e.validateNumber("documentNumber",8))},{default:O((()=>[Y])),_:1},8,["modelValue","disabled"]),N(c,{modelValue:e.form.description,"onUpdate:modelValue":a[5]||(a[5]=a=>e.form.description=a),"label-placement":"floating",fill:"outline","auto-grow":"",disabled:!!e.$route.params.id},{default:O((()=>[J])),_:1},8,["modelValue","disabled"]),e.$route.params.id?(j(),T("div",Q,[0==e.form.timeline.length||e.form.timeline[1].completed||"653752a46f75ce25da5cb7dd"==e.user.idProfile._id?D("",!0):(j(),T("div",{key:0,class:"area__image",onClick:a[7]||(a[7]=a=>e.openFileManager())},[N(s,{icon:e.addCircleOutline,size:"large"},null,8,["icon"]),L("input",{type:"file",accept:".jpg, .jpeg, .pdf",multiple:"",ref:"fileManager",onChange:a[6]||(a[6]=(...a)=>e.selectImage&&e.selectImage(...a)),style:{display:"none"}},null,544)])),(j(!0),T(U,null,M(e.form.documents,((a,t)=>(j(),T("div",K,[0==e.form.timeline.length||e.form.timeline[1].completed?D("",!0):(j(),X(m,{key:0,color:"danger",onClick:i=>e.deleteImage(a,t)},{default:O((()=>[N(s,{icon:e.closeCircleOutline,size:"large"},null,8,["icon"])])),_:2},1032,["onClick"])),"image/jpeg"==a.type?(j(),T(U,{key:1},[0==e.form.timeline.length||e.form.timeline[1].completed?(j(),T("img",{key:1,src:"http://206.189.176.12:3002/api/files/"+e.$route.params.id+"/"+a.name},null,8,_)):(j(),T("img",{key:0,src:e.urlDocuments[t]},null,8,W))],64)):(j(),T("img",Z))])))),256))])):D("",!0),e.$route.params.id?D("",!0):(j(),X(m,{key:2,expand:"full",onClick:a[8]||(a[8]=a=>e.createIncidence()),disabled:e.invalidForm},{default:O((()=>[R("Crear Incidencia")])),_:1},8,["disabled"])),0==e.form.timeline.length||e.form.timeline[2].completed?D("",!0):(j(),X(m,{key:3,expand:"full",onClick:a[9]||(a[9]=a=>e.updateIncidence()),disabled:e.invalidFormUpdate},{default:O((()=>[R("Actualizar Incidencia")])),_:1},8,["disabled"])),"653752a46f75ce25da5cb7dd"==e.user.idProfile._id&&0!=e.form.timeline.length&&e.form.timeline[1].completed&&!e.form.timeline[2].completed?(j(),X(m,{key:4,expand:"full",color:"danger",onClick:a[10]||(a[10]=a=>e.finalizeIncidence())},{default:O((()=>[R("Finalizar Incidencia")])),_:1})):D("",!0)]))}]]))}}}));
