(this.webpackJsonpTodoList=this.webpackJsonpTodoList||[]).push([[0],{104:function(e,t,a){},105:function(e,t,a){},129:function(e,t,a){"use strict";a.r(t);var n,r,c=a(0),i=a.n(c),l=a(9),o=a.n(l),u=(a(104),a(105),a(174)),s=a(175),d=a(177),m=a(167),f=a(131),E=a(170),b=a(179),O=a(176),p=a(178),T=a(16),g=a(58),j=a(7),h=a(79),S=a.n(h).a.create({baseURL:"https://social-network.samuraijs.com/api/1.1/",withCredentials:!0,headers:{"API-KEY":"aaa63ed6-139f-4a73-aa64-3185c5225bcd"}}),v=function(){return S.get("todo-lists")},k=function(e){return S.post("todo-lists",{title:e})},I=function(e){return S.delete("todo-lists/".concat(e))},y=function(e){return S.get("todo-lists/".concat(e,"/tasks"))},A=function(e,t){return S.delete("todo-lists/".concat(e,"/tasks/").concat(t))},C=function(e,t){return S.post("todo-lists/".concat(e,"/tasks"),{title:t})},L=function(e,t,a){return S.put("todo-lists/".concat(e,"/tasks/").concat(t),a)},D=function(e){return S.post("auth/login",e)},w=function(){return S.get("auth/me")},P=function(){return S.delete("auth/login")};!function(e){e[e.New=0]="New",e[e.InProgress=1]="InProgress",e[e.Completed=2]="Completed",e[e.Draft=3]="Draft"}(n||(n={})),function(e){e[e.Low=0]="Low",e[e.Middle=1]="Middle",e[e.Hi=2]="Hi",e[e.Urgently=3]="Urgently",e[e.Later=4]="Later"}(r||(r={}));var N=function(e,t){e(H(t)),e(G("failed"))},R=function(e,t){t.messages.length?e(H(t.messages[0])):e(H("\u043d\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043d\u0430\u044f \u043e\u0448\u0438\u0431\u043a\u0430")),e(G("failed"))},F={isLoggedIn:!1},_=function(e){return{type:"login/SET-IS-LOGGED-IN",value:e}},x={status:"idle",error:null,isInitialized:!1},G=function(e){return{type:"APP/SET_STATUS",status:e}},H=function(e){return{type:"APP/SET_ERROR",error:e}},K=a(35),M={},U=function(e){return function(t){t(G("loading")),y(e).then((function(a){t(function(e,t){return{type:"SET-TASKS",tasks:e,todolistId:t}}(a.data.items,e)),t(G("succeeded"))}))}},z=[],V=function(){return{type:"CLEAR_DATA"}},Z=a(171),q=a(130),Y=a(43),B=a(180),J=a(168),$=i.a.memo((function(e){var t=Object(c.useState)(""),a=Object(Y.a)(t,2),n=a[0],r=a[1],l=Object(c.useState)(null),o=Object(Y.a)(l,2),u=o[0],s=o[1],d=function(){""!==n.trim()?(e.addItem(n),r("")):s("Title is required")};return i.a.createElement("div",null,i.a.createElement(B.a,{variant:"outlined",error:!!u,value:n,onChange:function(e){r(e.currentTarget.value)},onKeyPress:function(e){null!==u&&s(null),"Enter"===e.key&&d()},label:"Title",helperText:u,disabled:e.disabled}),i.a.createElement(m.a,{color:"primary",onClick:d,disabled:e.disabled},i.a.createElement(J.a,null)))})),Q=i.a.memo((function(e){var t=Object(c.useState)(!1),a=Object(Y.a)(t,2),n=a[0],r=a[1],l=Object(c.useState)(e.value),o=Object(Y.a)(l,2),u=o[0],s=o[1];return n?i.a.createElement(B.a,{value:u,onChange:function(e){s(e.currentTarget.value)}}):i.a.createElement("span",{onDoubleClick:function(){r(!0),s(e.value)}},e.value)})),W=a(169),X=a(182),ee=i.a.memo((function(e){var t=Object(c.useCallback)((function(){return e.removeTask(e.task.id,e.todolistId)}),[e.task.id,e.todolistId]),a=Object(c.useCallback)((function(t){var a=t.currentTarget.checked;e.changeTaskStatus(e.task.id,a?n.Completed:n.New,e.todolistId)}),[e.task.id,e.todolistId]);return i.a.createElement("div",{key:e.task.id,className:e.task.status===n.Completed?"is-done":""},i.a.createElement(X.a,{checked:e.task.status===n.Completed,color:"primary",onChange:a}),i.a.createElement(Q,{value:e.task.title}),i.a.createElement(m.a,{onClick:t},i.a.createElement(W.a,null)))})),te=i.a.memo((function(e){var t=Object(T.b)();Object(c.useEffect)((function(){t(U(e.id))}),[]);var a=Object(c.useCallback)((function(t){e.addTask(t,e.id)}),[e.addTask,e.id]),r=Object(c.useCallback)((function(){return e.changeFilter("all",e.id)}),[e.id,e.changeFilter]),l=Object(c.useCallback)((function(){return e.changeFilter("active",e.id)}),[e.id,e.changeFilter]),o=Object(c.useCallback)((function(){return e.changeFilter("completed",e.id)}),[e.id,e.changeFilter]),u=e.tasks;return"active"===e.filter&&(u=e.tasks.filter((function(e){return e.status===n.New}))),"completed"===e.filter&&(u=e.tasks.filter((function(e){return e.status===n.Completed}))),i.a.createElement("div",null,i.a.createElement("h3",null,i.a.createElement(Q,{value:e.title}),i.a.createElement(m.a,{onClick:function(){e.removeTodolist(e.id)},disabled:"loading"===e.entityStatus},i.a.createElement(W.a,null))),i.a.createElement($,{addItem:a,disabled:"loading"===e.entityStatus}),i.a.createElement("div",null,u.map((function(t){return i.a.createElement(ee,{key:t.id,task:t,todolistId:e.id,removeTask:e.removeTask,changeTaskStatus:e.changeTaskStatus})}))),i.a.createElement("div",{style:{paddingTop:"10px"}},i.a.createElement(E.a,{variant:"all"===e.filter?"outlined":"text",onClick:r,color:"default"},"All"),i.a.createElement(E.a,{variant:"active"===e.filter?"outlined":"text",onClick:l,color:"primary"},"Active"),i.a.createElement(E.a,{variant:"completed"===e.filter?"outlined":"text",onClick:o,color:"secondary"},"Completed")))})),ae=a(13),ne=function(e){var t=Object(T.c)((function(e){return e.todolists})),a=Object(T.c)((function(e){return e.tasks})),n=Object(T.c)((function(e){return e.auth.isLoggedIn})),r=Object(T.b)();Object(c.useEffect)((function(){n&&r((function(e){e(G("loading")),v().then((function(t){return e({type:"SET-TODOLISTS",todolists:t.data}),e(G("succeeded")),t.data})).then((function(t){t.forEach((function(t){e(U(t.id))}))}))}))}),[]);var l=Object(c.useCallback)((function(e,t){r(function(e,t){return function(a){a(G("loading")),A(e,t).then((function(){a(function(e,t){return{type:"REMOVE-TASK",taskId:e,todolistId:t}}(t,e)),a(G("succeeded"))}))}}(t,e))}),[]),o=Object(c.useCallback)((function(e,t){r(function(e,t){return function(a){a(G("loading")),C(e,t).then((function(e){0===e.data.resultCode?(a(G("succeeded")),a({type:"ADD-TASK",task:e.data.data.item})):R(a,e.data)})).catch((function(e){return N(a,e.message)}))}}(t,e))}),[]),u=Object(c.useCallback)((function(e,t,a){r(function(e,t,a){return function(n,r){var c=r().tasks[e].find((function(e){return e.id===t}));if(c){var i={title:c.title,status:a,description:c.description,priority:c.priority,startDate:c.startDate,deadline:c.deadline};n(G("loading")),L(e,t,i).then((function(){n(function(e,t,a){return{type:"CHANGE-TASK-STATUS",status:t,todolistId:a,taskId:e}}(t,a,e)),n(G("succeeded"))}))}}}(a,e,t))}),[]),s=Object(c.useCallback)((function(e,t){var a={type:"CHANGE-TODOLIST-FILTER",id:t,filter:e};r(a)}),[]),d=Object(c.useCallback)((function(e){r(function(e){return function(t){t(G("loading")),t(function(e,t){return{type:"CHANGE_TODOLIST_ENTITY_STATUS",entityStatus:e,id:t}}("loading",e)),I(e).then((function(a){t(G("succeeded")),0===a.data.resultCode?t(function(e){return{type:"REMOVE-TODOLIST",id:e}}(e)):t(H(a.data.messages[0]))&&t(G("failed"))})).catch((function(e){return N(t,e.message)}))}}(e))}),[]),m=Object(c.useCallback)((function(e,t){var a=function(e,t){return{type:"CHANGE-TODOLIST-TITLE",id:e,title:t}}(e,t);r(a)}),[]),f=Object(c.useCallback)((function(e){r(function(e){return function(t){t(G("loading")),k(e).then((function(e){0===e.data.resultCode?(t(G("succeeded")),t({type:"ADD-TODOLIST",todolist:e.data.data.item})):R(t,e.data)})).catch((function(e){return N(t,e.message)}))}}(e))}),[r]);return n?i.a.createElement(i.a.Fragment,null,i.a.createElement(Z.a,{container:!0,style:{padding:"20px"}},i.a.createElement($,{addItem:f})),i.a.createElement(Z.a,{container:!0,spacing:3},t.map((function(e){var t=a[e.id];return i.a.createElement(Z.a,{item:!0,key:e.id},i.a.createElement(q.a,{style:{padding:"10px"}},i.a.createElement(te,{entityStatus:e.entityStatus,id:e.id,title:e.title,tasks:t,removeTask:l,changeFilter:s,addTask:o,changeTaskStatus:u,filter:e.filter,removeTodolist:d,changeTodolistTitle:m})))})))):i.a.createElement(ae.a,{to:"login"})},re=a(184),ce=a(181);function ie(e){return i.a.createElement(ce.a,Object.assign({elevation:6,variant:"filled"},e))}function le(){var e=Object(T.b)(),t=Object(T.c)((function(e){return e.app.error})),a=function(t,a){"clickaway"!==a&&e(H(null))};return i.a.createElement(re.a,{open:null!==t,autoHideDuration:6e3,onClose:a},i.a.createElement(ie,{onClose:a,severity:"error"},t))}var oe=a(50),ue=a(185),se=a(166),de=a(172),me=a(173),fe=a(88),Ee=function(){var e=Object(T.b)(),t=Object(T.c)((function(e){return e.auth.isLoggedIn})),a=Object(fe.a)({initialValues:{email:"",password:"",rememberMe:!1},validate:function(e){var t={};return e.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.email)||(t.email="Invalid email address"):t.email="Required",e.password?e.password.length<3&&(t.password="Invalid password"):t.password="Required",t},onSubmit:function(t){var n;e((n=t,function(e){e(G("loading")),D(n).then((function(t){0===t.data.resultCode?(e(G("succeeded")),e(_(!0))):R(e,t.data)})).catch((function(t){return N(e,t.message)}))})),a.resetForm()}});return t?i.a.createElement(ae.a,{to:"/"}):i.a.createElement(Z.a,{container:!0,justify:"center"},i.a.createElement(Z.a,{item:!0,xs:4},i.a.createElement("form",{onSubmit:a.handleSubmit},i.a.createElement(ue.a,null,i.a.createElement(se.a,null,i.a.createElement("p",null,"To log in get registered",i.a.createElement("a",{href:"https://social-network.samuraijs.com/",target:"_blank"},"here")),i.a.createElement("p",null,"or use common test account credentials:"),i.a.createElement("p",null,"Email: free@samuraijs.com"),i.a.createElement("p",null,"Password: free")),i.a.createElement(de.a,null,i.a.createElement(B.a,Object.assign({label:"Email",margin:"normal",name:"email"},a.getFieldProps("email"))),a.touched.email&&a.errors.email&&i.a.createElement("div",{style:{color:"red"}},a.errors.email),i.a.createElement(B.a,Object.assign({type:"password",label:"Password",margin:"normal",name:"password"},a.getFieldProps("password"))),a.touched.password&&a.errors.password&&i.a.createElement("div",{style:{color:"red"}},a.errors.password),i.a.createElement(me.a,{label:"Remember me",control:i.a.createElement(X.a,a.getFieldProps("rememberMe"))}),i.a.createElement(E.a,{type:"submit",variant:"contained",color:"primary"},"Login"))))))};var be=function(){var e=Object(T.c)((function(e){return e.app.status})),t=Object(T.c)((function(e){return e.app.isInitialized})),a=Object(T.c)((function(e){return e.auth.isLoggedIn})),n=Object(T.b)();return Object(c.useEffect)((function(){n((function(e){e(G("loading")),w().then((function(t){0===t.data.resultCode?(e(G("succeeded")),e(_(!0))):R(e,t.data)})).catch((function(t){return N(e,t.message)})).finally((function(){e({type:"APP/SET_IS_INITIALIZED",isInitialized:!0})}))}))}),[]),t?i.a.createElement(oe.a,null,i.a.createElement("div",{className:"App"},i.a.createElement(s.a,{position:"static"},"loading"===e&&i.a.createElement(O.a,null),i.a.createElement(d.a,null,i.a.createElement(m.a,{edge:"start",color:"inherit","aria-label":"menu"},i.a.createElement(p.a,null)),i.a.createElement(f.a,{variant:"h6"},"News"),a&&i.a.createElement(E.a,{onClick:function(){n((function(e){e(G("loading")),P().then((function(t){0===t.data.resultCode?(e(G("succeeded")),e(_(!1)),e(V())):R(e,t.data)})).catch((function(t){return N(e,t.message)}))}))},color:"inherit"},"Logout"))),i.a.createElement(b.a,{fixed:!0},i.a.createElement(ae.d,null,i.a.createElement(ae.b,{exact:!0,path:"/",render:function(){return i.a.createElement(ne,null)}}),i.a.createElement(ae.b,{path:"/login",render:function(){return i.a.createElement(Ee,null)}}),i.a.createElement(ae.b,{path:"/404",render:function(){return i.a.createElement("h1",{style:{fontSize:"50px",textAlign:"center"}},"404: PAGE NOT FOUND")}}),i.a.createElement(ae.a,{from:"*",to:"/404"}))),i.a.createElement(le,null))):i.a.createElement("div",{style:{position:"fixed",top:"30%",textAlign:"center",width:"100%"}},i.a.createElement(u.a,null))},Oe=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,186)).then((function(t){var a=t.getCLS,n=t.getFID,r=t.getFCP,c=t.getLCP,i=t.getTTFB;a(e),n(e),r(e),c(e),i(e)}))},pe=a(59),Te=a(87),ge=Object(pe.b)({tasks:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:M,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"REMOVE-TASK":return Object(j.a)(Object(j.a)({},e),{},Object(K.a)({},t.todolistId,e[t.todolistId].filter((function(e){return e.id!=t.taskId}))));case"ADD-TASK":return Object(j.a)(Object(j.a)({},e),{},Object(K.a)({},t.task.todoListId,[t.task].concat(Object(g.a)(e[t.task.todoListId]))));case"CHANGE-TASK-STATUS":return Object(j.a)(Object(j.a)({},e),{},Object(K.a)({},t.todolistId,e[t.todolistId].map((function(e){return e.id===t.taskId?Object(j.a)(Object(j.a)({},e),{},{status:t.status}):e}))));case"ADD-TODOLIST":return Object(j.a)(Object(j.a)({},e),{},Object(K.a)({},t.todolist.id,[]));case"REMOVE-TODOLIST":var a=Object(j.a)({},e);return delete a[t.id],a;case"SET-TODOLISTS":var n=Object(j.a)({},e);return t.todolists.forEach((function(e){n[e.id]=[]})),n;case"SET-TASKS":return Object(j.a)(Object(j.a)({},e),{},Object(K.a)({},t.todolistId,t.tasks));case"CLEAR_DATA":return{};default:return e}},todolists:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:z,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"CHANGE_TODOLIST_ENTITY_STATUS":return e.map((function(e){return e.id===t.id?Object(j.a)(Object(j.a)({},e),{},{entityStatus:t.entityStatus}):e}));case"REMOVE-TODOLIST":return e.filter((function(e){return e.id!==t.id}));case"ADD-TODOLIST":return[Object(j.a)(Object(j.a)({},t.todolist),{},{filter:"all",entityStatus:"idle"})].concat(Object(g.a)(e));case"CHANGE-TODOLIST-TITLE":return e.map((function(e){return e.id===t.id?Object(j.a)(Object(j.a)({},e),{},{title:t.title}):e}));case"CHANGE-TODOLIST-FILTER":return e.map((function(e){return e.id===t.id?Object(j.a)(Object(j.a)({},e),{},{filter:t.filter}):e}));case"SET-TODOLISTS":return t.todolists.map((function(e){return Object(j.a)(Object(j.a)({},e),{},{filter:"all",entityStatus:"idle"})}));case"CLEAR_DATA":return[];default:return e}},app:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:x,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"APP/SET_STATUS":return Object(j.a)(Object(j.a)({},e),{},{status:t.status});case"APP/SET_ERROR":return Object(j.a)(Object(j.a)({},e),{},{error:t.error});case"APP/SET_IS_INITIALIZED":return Object(j.a)(Object(j.a)({},e),{},{isInitialized:t.isInitialized});default:return e}},auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:F,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"login/SET-IS-LOGGED-IN":return Object(j.a)(Object(j.a)({},e),{},{isLoggedIn:t.value});default:return e}}}),je=Object(pe.c)(ge,Object(pe.a)(Te.a));window.store=je,o.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(T.a,{store:je},i.a.createElement(be,null))),document.getElementById("root")),Oe()},99:function(e,t,a){e.exports=a(129)}},[[99,1,2]]]);
//# sourceMappingURL=main.a6fb78fd.chunk.js.map