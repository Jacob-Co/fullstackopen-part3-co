(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,n,t){e.exports=t(37)},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(14),c=t.n(o),u=t(2),l=t(3),i=function(e){var n=e.person,t=e.handleDeleteBtn;return r.a.createElement("div",null,n.name," ",n.number+"  ",r.a.createElement("button",{onClick:t,value:n.id},"delete"))},m=function(e){var n=e.persons,t=e.handleDeleteBtn;return r.a.createElement(r.a.Fragment,null,n.map((function(e){return r.a.createElement(i,{key:e.name,person:e,handleDeleteBtn:t})})))},s=t(4),d=t.n(s),f="/api/persons",b=function(){return d.a.get(f).then((function(e){return e.data}))},h=function(e){return d.a.post(f,e).then((function(e){return e.data}))},p=function(e){return d.a.delete("".concat(f,"/").concat(e)).then((function(){return e}))},v=function(e,n){return d.a.put("".concat(f,"/").concat(e),n).then((function(e){return e.data}))},g=function(e){var n=e.notificationObj,t={color:"green",background:"lightgrey",fontSize:"20px",borderStyle:"solid",borderRadius:"5px",padding:"10px",marginBottom:"10px"},a=Object(u.a)(Object(u.a)({},t),{},{color:"red"});if(null===n)return null;var o=n.success?t:a;return r.a.createElement("div",{style:o},n.message)},E=function(e){var n=e.newName,t=e.newNumber,a=e.handleOnNameChange,o=e.handleOnNumberChange,c=e.handleFormSubmit;return r.a.createElement("form",{onSubmit:c},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:n,type:"text",onChange:a})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:t,type:"text",onChange:o})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},O=function(e){var n=e.filter,t=e.handleOnChange;return r.a.createElement("div",null,"filter contacts by name: ",r.a.createElement("input",{value:n,onChange:t}))},w=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],o=n[1],c=Object(a.useState)(""),i=Object(l.a)(c,2),s=i[0],d=i[1],f=Object(a.useState)(""),w=Object(l.a)(f,2),C=w[0],j=w[1],y=Object(a.useState)(""),k=Object(l.a)(y,2),S=k[0],N=k[1],L=Object(a.useState)(null),x=Object(l.a)(L,2),B=x[0],D=x[1];Object(a.useEffect)((function(){b().then((function(e){return o(e)}))}),[]);var F=""===S?t:t.filter((function(e){return e.name.toLowerCase().includes(S.toLowerCase())}));return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(g,{notificationObj:B}),r.a.createElement(O,{filter:S,handleOnChange:function(e){N(e.target.value)}}),r.a.createElement("h3",null,"Add a new Contact"),r.a.createElement(E,{newName:s,newNumber:C,handleFormSubmit:function(e){e.preventDefault();var n,a="".concat(s," is already in the phonebook, ")+"do you want to update the number?";if(n=s,t.find((function(e){return e.name.toLowerCase()===n.toLowerCase()}))){if(""===C)return alert("".concat(s," is already added to phonebook"));window.confirm(a)&&function(){var e=t.find((function(e){return e.name.toLowerCase()===s.toLowerCase()})),n=Object(u.a)(Object(u.a)({},e),{},{number:C,name:s});v(e.id,n).then((function(e){o(t.map((function(n){return n.name.toLowerCase()===e.name.toLowerCase()?e:n}))),D({success:!0,message:"Modifed the number of ".concat(e.name," to ").concat(e.number)}),d(""),j("")})).catch((function(e){D({success:!1,message:"Information of ".concat(s," has already been removed from the server")}),d(""),j("")}))}()}else h({name:s,number:C}).then((function(e){o(t.concat(e)),D({success:!0,message:"Added ".concat(e.name)}),d(""),j("")}));setTimeout((function(){return D(null)}),5e3)},handleOnNameChange:function(e){d(e.target.value)},handleOnNumberChange:function(e){j(e.target.value)}}),r.a.createElement("h3",null,"Contacts"),r.a.createElement(m,{persons:F,handleDeleteBtn:function(e){var n=Number(e.target.value),a=t.find((function(e){return e.id===n})).name;window.confirm("Delete ".concat(a))&&p(n).then((function(e){o(t.filter((function(n){return n.id!==e})))}))}}))};c.a.render(r.a.createElement(w,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.ab43d331.chunk.js.map