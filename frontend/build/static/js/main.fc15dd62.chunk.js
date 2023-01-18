(this["webpackJsonpidsn-viewer"]=this["webpackJsonpidsn-viewer"]||[]).push([[0],{129:function(e,t,a){e.exports=a(180)},134:function(e,t,a){},135:function(e,t,a){},171:function(e,t,a){},174:function(e,t,a){},175:function(e,t,a){},180:function(e,t,a){"use strict";a.r(t);var n=a(13),l=a.n(n);a(134),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var c,r,i,o,s,u=a(0),m=a.n(u),b=a(48),f=a(16),v=function(e){return m.a.createElement("div",{className:"container"},m.a.createElement("h1",null,"Clinical Data Viewer"),m.a.createElement("p",null,"The clinical data viewer aspires to provide a solution for integrative data analysis. It is not only meant to be an analyzing tool but also an idea generator, where complex data is easy accessible and presented in a well-arranged environment. Furthermore, it is not bound to specific sources of data. These are able to be combined and compared but the user may also upload his desired data. The main concept of the viewer is a patient-based representation, which enables a cross-filtering over different variables and a longitudinal distribution for appropriate data."))},d=a(5),p=a(18),g=a(9),h=a(12),E=(a(135),a(76)),O=(a(150),Object(E.WidthProvider)(E.Responsive)),j=function(e){return m.a.createElement(O,{className:"grid",rowHeight:e.rowHeight,cols:e.breakpointCols,layouts:e.layouts,draggableHandle:".grid--draggable",onBreakpointChange:e.onBreakpointChange,onLayoutChange:e.onLayoutChange,margin:[24,24]},e.children)},C=a(104),y=a.n(C),N=function(e){return m.a.createElement(y.a,{data:e.data,layout:Object(g.a)(Object(g.a)({},e.layout),{},{autosize:!0}),config:{modeBarButtonsToRemove:["lasso2d"]},useResizeHandler:!0,onSelected:function(t){var a=t.points.map((function(e){return e.x})).filter((function(e,t,a){return a.indexOf(e)===t}));e.onSelected(e.identifier,t.range,a)}})},w=function(e,t){localStorage&&localStorage.setItem(e,t)},k=function(e){return localStorage?localStorage.getItem(e):null},S=w,_=function(e,t){w(e,JSON.stringify(t))},z=k,P=function(e){var t=k(e);return t?JSON.parse(t):t},M=function(){return Math.floor(Math.random()*Math.pow(16777215,2)).toString(16)},H=function(e){},T=a(105),V=a.n(T).a.create({withCredentials:!0}),x=function(e){var t,a=JSON.parse(e);return Object(g.a)(Object(g.a)({},a),{},{data:null===(t=a.data)||void 0===t?void 0:t.map((function(e){return Object(g.a)(Object(g.a)({},e),{},{type:"scatter"===e.type?"scattergl":e.type})}))})},D=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t={usertoken:c,plot_ids:e};return V.post("".concat(B,"/init"),t).then((function(e){return e.data}))};!function(e){e.none="none",e.legend="legend"}(r||(r={})),function(e){e.none="none",e.regression="regression"}(i||(i={})),function(e){e.stack="stack"}(o||(o={})),function(e){e.norm="norm"}(s||(s={}));var B=Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).REACT_APP_API_URL;c=function(){var e=z("token");return e||(e=M(),S("token",e),D()),e}();var I,L=D,X=function(){var e={usertoken:c};return V.post("".concat(B,"/reset-session"),e).then((function(e){return e.data}))},F=function(e){var t={usertoken:c,controls:{plot:e.identifier,type:e.type,attX:e.attX,attY:e.attY,attC:e.attC,Dt:e.dt,visit:e.visit,followup:e.followup,tolerance:e.tolerance,bins:e.bins,norm:e.norm?[s.norm]:[],stack:e.stack?[o.stack]:[],fit:[e.fit],legend:[e.legend]}};return V.post("".concat(B,"/getdata"),t).then((function(e){return x(e.data.figure)}))},Y=function(e){var t={usertoken:c,concept:e.concept,filter_table:e.constraints.map((function(e){return{attribute:e.attribute,lower:e.lower,upper:e.upper,list:e.items.length>0?e.items:null}}))};return V.post("".concat(B,"/update-filter"),t).then((function(e){var t={};return Object.keys(e.data.plots).forEach((function(a){t[a]=x(e.data.plots[a].figure)})),t}))},R=function(e){var t={usertoken:c,name:e};return V.post("".concat(B,"/subgroup-define"),t).then((function(e){return null}))},W=function(e){var t={usertoken:c,name:e};return V.post("".concat(B,"/subgroup-delete"),t).then((function(e){return null}))},A=function(){return V.get("".concat(B,"/get-all-attributes"))},U=(a(171),a(250)),K=a(253),J=a(231),q=a(242),G=a(254),$=a(233),Q=a(237),Z=a(236),ee=a(232),te=a(234),ae=a(235),ne=a(225),le=a(230),ce=a(229),re=a(182),ie=a(44),oe=a.n(ie),se=a(77),ue=a.n(se);!function(e){e[e.patient=1]="patient",e[e.visit=2]="visit"}(I||(I={}));var me,be,fe,ve,de,pe,ge,he,Ee,Oe=I.patient,je=[{label:"Patient",value:I.patient},{label:"Visit",value:I.visit}],Ce=function(e){m.a.useEffect((function(){d()}),[e]);var t=Object(u.useState)([]),a=Object(h.a)(t,2),n=a[0],l=a[1],c=Object(u.useState)(""),r=Object(h.a)(c,2),i=r[0],o=r[1],s=Object(u.useState)(),b=Object(h.a)(s,2),f=b[0],v=b[1],d=function(){l(e.filter.constraints.map((function(e){return{attribute:e.attribute,lower:e.lower?e.lower.toFixed(1):"",upper:e.upper?e.upper.toFixed(1):"",items:e.items.join(", ")}})))},E=function(e,t){var a=Object(g.a)(Object(g.a)({attribute:"",lower:"",upper:"",items:""},n.find((function(t){return t.attribute===e}))),t);l([].concat(Object(p.a)(n.filter((function(t){return t.attribute!==e}))),[a]))},O=function(){e.onFilterChanged({constraints:n.map((function(e){return{attribute:e.attribute,lower:e.lower?+e.lower:null,upper:e.upper?+e.upper:null,items:e.items.length>0?e.items.split(", "):[]}}))}),v(null)};return m.a.createElement(ne.a,{className:"filter"},m.a.createElement(ce.a,{subheader:"Filter",action:m.a.createElement(re.a,{size:"small","aria-label":"close",onClick:function(){e.onClose()},className:"grid__item--close"},m.a.createElement(oe.a,null))}),m.a.createElement(le.a,{className:"filter__content"},m.a.createElement("div",{className:"form__title"},"Filter Settings"),m.a.createElement(K.a,{row:!0,value:e.filter.concept,onChange:function(t){e.onFilterChanged({concept:+t.target.value})}},je.map((function(e){return m.a.createElement(J.a,{key:e.value,value:e.value,control:m.a.createElement(U.a,{color:"primary"}),label:e.label})}))),!!n.length&&m.a.createElement(ee.a,null,m.a.createElement($.a,{size:"small"},m.a.createElement(te.a,null,m.a.createElement(ae.a,null,m.a.createElement(Z.a,null,"Attribute"),m.a.createElement(Z.a,null,"Lower"),m.a.createElement(Z.a,null,"Upper"),m.a.createElement(Z.a,null,"Items"),m.a.createElement(Z.a,null))),m.a.createElement(Q.a,null,n.map((function(t){return m.a.createElement(ae.a,{key:t.attribute},m.a.createElement(Z.a,null,e.getTooltip(t.attribute)),m.a.createElement(Z.a,null,m.a.createElement(G.a,{value:t.lower,disabled:!!t.items,onChange:function(e){E(t.attribute,{lower:e.target.value})},onBlur:function(){return O()},onKeyUp:function(e){"Enter"===e.key&&O()}})),m.a.createElement(Z.a,null,m.a.createElement(G.a,{value:t.upper,disabled:!!t.items,onChange:function(e){E(t.attribute,{upper:e.target.value})},onBlur:function(){return O()},onKeyUp:function(e){"Enter"===e.key&&O()}})),m.a.createElement(Z.a,null,m.a.createElement(G.a,{value:t.items,disabled:!t.items,onChange:function(e){E(t.attribute,{items:e.target.value})},onBlur:function(){return O()},onKeyUp:function(e){"Enter"===e.key&&O()}})),m.a.createElement(Z.a,null,m.a.createElement(re.a,{size:"small","aria-label":"remove",onClick:function(){var a;a=t.attribute,e.onFilterChanged({constraints:e.filter.constraints.filter((function(e){return e.attribute!==a}))}),v(null)}},m.a.createElement(ue.a,null))))}))))),m.a.createElement(q.a,{variant:"contained",color:"primary",size:"small",onClick:function(){e.onFilterChanged({constraints:[]}),v(null)}},"Reset filters"),m.a.createElement("div",{className:"form__title"},"Subgroup Definitions"),m.a.createElement("div",{className:"input-group"},m.a.createElement(G.a,{value:i,label:"Name",onChange:function(e){o(e.target.value)},InputLabelProps:{shrink:!0},onKeyUp:function(t){"Enter"===t.key&&(e.onSubgroupDefine({name:i,constraints:e.filter.constraints}),o(""))}}),m.a.createElement(q.a,{variant:"contained",color:"primary",size:"small",onClick:function(){var t={name:i,constraints:e.filter.constraints};e.onSubgroupDefine(t),o(""),v(t)}},"Define")),!!e.subgroups.length&&m.a.createElement(K.a,{onChange:function(t){var a=e.subgroups.find((function(e){return e.name===t.target.value}));v(a),e.onSubgroupActivate(t.target.value)},className:"subgroups"},e.subgroups.map((function(t){return m.a.createElement(J.a,{key:t.name,value:t.name,control:m.a.createElement(U.a,{color:"primary",checked:t===f}),label:m.a.createElement("div",{className:"subgroup__label"},m.a.createElement("span",null,t.name),m.a.createElement(re.a,{size:"small","aria-label":"remove",onClick:function(){e.onSubgroupDelete(t.name)}},m.a.createElement(ue.a,null)))})})))))},ye=(a(174),a(255)),Ne=a(256),we=a(247),ke=a(243),Se=a(257),_e=a(54),ze=a(240),Pe=a(248),Me=a(249);!function(e){e[e.Scatter=1]="Scatter",e[e.Histogram=2]="Histogram",e[e.Bar=3]="Bar",e[e.Timeline=4]="Timeline"}(pe||(pe={})),function(e){e.date="date",e.int="int",e.float="float",e.code="code",e.subgroups="SUBGROUPS",e.patients="PATIENTS"}(ge||(ge={})),function(e){e[e.attX=0]="attX",e[e.attY=1]="attY",e[e.attC=2]="attC",e[e.dt=3]="dt",e[e.visit=4]="visit",e[e.followup=5]="followup",e[e.tolerance=6]="tolerance",e[e.fit=7]="fit",e[e.norm=8]="norm",e[e.stack=9]="stack",e[e.legend=10]="legend",e[e.bins=11]="bins"}(he||(he={})),function(e){e.all="ALL",e.baseline="BASELINE",e.follow="FOLLOW"}(Ee||(Ee={}));var He=[{label:"Scatter",value:pe.Scatter},{label:"Histogram",value:pe.Histogram},{label:"Bar",value:pe.Bar},{label:"Timeline",value:pe.Timeline}],Te=[{label:"All visits",value:Ee.all},{label:"First visit",value:Ee.baseline},{label:"Follow-up visits",value:Ee.follow}],Ve=(de={},Object(d.a)(de,pe.Scatter,(me={},Object(d.a)(me,he.attX,{visible:!0,datatypes:[ge.float,ge.int]}),Object(d.a)(me,he.attY,{visible:!0,datatypes:[ge.float,ge.int]}),Object(d.a)(me,he.attC,{visible:!0,datatypes:[ge.subgroups,ge.patients,ge.float,ge.int,ge.code]}),Object(d.a)(me,he.dt,{visible:!0}),Object(d.a)(me,he.visit,{visible:!0}),Object(d.a)(me,he.followup,{visible:!0}),Object(d.a)(me,he.tolerance,{visible:!0}),Object(d.a)(me,he.fit,{visible:!0}),Object(d.a)(me,he.norm,{visible:!1}),Object(d.a)(me,he.stack,{visible:!1}),Object(d.a)(me,he.legend,{visible:!0}),Object(d.a)(me,he.bins,{visible:!1}),me)),Object(d.a)(de,pe.Histogram,(be={},Object(d.a)(be,he.attX,{visible:!0,datatypes:[ge.float,ge.int]}),Object(d.a)(be,he.attY,{visible:!1,datatypes:[]}),Object(d.a)(be,he.attC,{visible:!0,datatypes:[ge.subgroups,ge.patients,ge.code]}),Object(d.a)(be,he.dt,{visible:!0}),Object(d.a)(be,he.visit,{visible:!0}),Object(d.a)(be,he.followup,{visible:!0}),Object(d.a)(be,he.tolerance,{visible:!0}),Object(d.a)(be,he.fit,{visible:!1}),Object(d.a)(be,he.norm,{visible:!0}),Object(d.a)(be,he.stack,{visible:!0}),Object(d.a)(be,he.legend,{visible:!0}),Object(d.a)(be,he.bins,{visible:!0}),be)),Object(d.a)(de,pe.Bar,(fe={},Object(d.a)(fe,he.attX,{visible:!0,datatypes:[ge.subgroups,ge.patients,ge.code]}),Object(d.a)(fe,he.attY,{visible:!1,datatypes:[]}),Object(d.a)(fe,he.attC,{visible:!0,datatypes:[ge.subgroups,ge.patients,ge.code]}),Object(d.a)(fe,he.dt,{visible:!0}),Object(d.a)(fe,he.visit,{visible:!0}),Object(d.a)(fe,he.followup,{visible:!0}),Object(d.a)(fe,he.tolerance,{visible:!0}),Object(d.a)(fe,he.fit,{visible:!1}),Object(d.a)(fe,he.norm,{visible:!0}),Object(d.a)(fe,he.stack,{visible:!0}),Object(d.a)(fe,he.legend,{visible:!0}),Object(d.a)(fe,he.bins,{visible:!1}),fe)),Object(d.a)(de,pe.Timeline,(ve={},Object(d.a)(ve,he.attX,{visible:!0,datatypes:[ge.date]}),Object(d.a)(ve,he.attY,{visible:!0,datatypes:[ge.float,ge.int]}),Object(d.a)(ve,he.attC,{visible:!0,datatypes:[ge.float,ge.int]}),Object(d.a)(ve,he.dt,{visible:!0}),Object(d.a)(ve,he.visit,{visible:!0}),Object(d.a)(ve,he.followup,{visible:!0}),Object(d.a)(ve,he.tolerance,{visible:!0}),Object(d.a)(ve,he.fit,{visible:!0}),Object(d.a)(ve,he.norm,{visible:!1}),Object(d.a)(ve,he.stack,{visible:!1}),Object(d.a)(ve,he.legend,{visible:!0}),Object(d.a)(ve,he.bins,{visible:!1}),ve)),de),xe=pe.Scatter,De=function(e){m.a.useEffect((function(){d()}),[e]);var t=function(t){return e.filter(t)},a={diagramType:xe,diagramControlParameter:Ve[xe],attXData:t(Ve[xe][he.attX].datatypes||[]),attYData:t(Ve[xe][he.attY].datatypes||[]),attCData:t(Ve[xe][he.attC].datatypes||[])},n=Object(u.useState)(a),l=Object(h.a)(n,2),c=l[0],o=l[1],s=Object(u.useState)(null),b=Object(h.a)(s,2),f=b[0],v=b[1],d=function(){e.controls&&e.controls.type!==c.diagramType&&p(e.controls.type)},p=function(e){o({diagramType:e,diagramControlParameter:Ve[e],attXData:t(Ve[e][he.attX].datatypes||[]),attYData:t(Ve[e][he.attY].datatypes||[]),attCData:t(Ve[e][he.attC].datatypes||[])})};return m.a.createElement(ne.a,{className:"configuration"},m.a.createElement(ce.a,{subheader:"Plot Configurations",action:m.a.createElement(re.a,{size:"small","aria-label":"close",onClick:function(){e.onClose()},className:"grid__item--close"},m.a.createElement(oe.a,null))}),m.a.createElement(le.a,{className:"configuration__content"},e.controls?m.a.createElement(m.a.Fragment,null,m.a.createElement("div",{className:"form__title"},"Graph Data"),m.a.createElement(ze.a,{variant:"outlined",fullWidth:!0},m.a.createElement(ye.a,null,"Plot type"),m.a.createElement(we.a,{value:e.controls.type,onChange:function(t){e.onControlsChanged(e.controls.identifier,{type:t.target.value})},label:"Plot type"},He.map((function(e){return m.a.createElement(Ne.a,{key:e.value,value:e.value},e.label)})))),c.diagramControlParameter[he.attX].visible&&m.a.createElement(ze.a,{variant:"outlined",fullWidth:!0},m.a.createElement(Pe.a,{options:c.attXData.sort((function(e,t){return-t.topic.localeCompare(e.topic)})),groupBy:function(e){return e.topic},getOptionLabel:function(e){return e.attributeTooltip},value:c.attXData.find((function(t){return t.attribute===e.controls.attX}))||null,onChange:function(t,a){e.onControlsChanged(e.controls.identifier,{attX:(null===a||void 0===a?void 0:a.attribute)||""})},renderInput:function(e){return m.a.createElement(G.a,Object.assign({},e,{label:"X-coordinate item",variant:"outlined"}))}})),c.diagramControlParameter[he.attY].visible&&m.a.createElement(ze.a,{variant:"outlined",fullWidth:!0},m.a.createElement(Pe.a,{options:c.attYData.sort((function(e,t){return-t.topic.localeCompare(e.topic)})),groupBy:function(e){return e.topic},getOptionLabel:function(e){return e.attributeTooltip},value:c.attYData.find((function(t){return t.attribute===e.controls.attY}))||null,onChange:function(t,a){e.onControlsChanged(e.controls.identifier,{attY:(null===a||void 0===a?void 0:a.attribute)||""})},renderInput:function(e){return m.a.createElement(G.a,Object.assign({},e,{label:"Y-coordinate item",variant:"outlined"}))}})),c.diagramControlParameter[he.attC].visible&&m.a.createElement(ze.a,{variant:"outlined",fullWidth:!0},m.a.createElement(Pe.a,{options:c.attCData.sort((function(e,t){return-t.topic.localeCompare(e.topic)})),groupBy:function(e){return e.topic},getOptionLabel:function(e){return e.attributeTooltip},value:c.attCData.find((function(t){return t.attribute===e.controls.attC}))||null,onChange:function(t,a){e.onControlsChanged(e.controls.identifier,{attC:(null===a||void 0===a?void 0:a.attribute)||""})},renderInput:function(e){return m.a.createElement(G.a,Object.assign({},e,{label:"Third item",variant:"outlined"}))}})),c.diagramControlParameter[he.dt].visible&&m.a.createElement(G.a,{variant:"outlined",fullWidth:!0,type:"number",label:"Time span of a visit (Days)",value:e.controls.dt||0,onChange:function(t){e.onControlsChanged(e.controls.identifier,{dt:+t.target.value})},InputProps:{inputProps:{min:0}}}),c.diagramControlParameter[he.visit].visible&&m.a.createElement(ze.a,{variant:"outlined",fullWidth:!0},m.a.createElement(ye.a,null,"Visit"),m.a.createElement(we.a,{label:"Visit",value:e.controls.visit,onChange:function(t){var a=t.target.value,n=Ee.all;switch(a){case"BASELINE":n=Ee.baseline;break;case"FOLLOW":n=Ee.follow}e.onControlsChanged(e.controls.identifier,{visit:n})}},Te.map((function(e){return m.a.createElement(Ne.a,{key:e.value,value:e.value},e.label)})))),e.controls.visit===Ee.follow&&m.a.createElement("div",{className:"followup"},c.diagramControlParameter[he.followup].visible&&m.a.createElement(G.a,{type:"number",variant:"outlined",label:"Months from first visit",value:e.controls.followup||0,onChange:function(t){e.onControlsChanged(e.controls.identifier,{followup:+t.target.value})},InputProps:{inputProps:{min:0}},className:"followup__months"}),c.diagramControlParameter[he.tolerance].visible&&m.a.createElement(G.a,{type:"number",variant:"outlined",label:"+/-",value:e.controls.tolerance||0,onChange:function(t){e.onControlsChanged(e.controls.identifier,{tolerance:+t.target.value})},className:"followup__tolerance"})),m.a.createElement("div",{className:"form__title"},"Display Options"),c.diagramControlParameter[he.fit].visible&&m.a.createElement(ze.a,{variant:"outlined",fullWidth:!0},m.a.createElement(ye.a,null,"Fit"),m.a.createElement(we.a,{value:e.controls.fit,onChange:function(t){e.onControlsChanged(e.controls.identifier,{fit:t.target.value||i.none})},label:"fit"},m.a.createElement(Ne.a,{value:i.none},"none"),m.a.createElement(Ne.a,{value:i.regression},"regression"))),m.a.createElement("div",{className:"switches"},c.diagramControlParameter[he.norm].visible&&m.a.createElement(J.a,{control:m.a.createElement(ke.a,{checked:e.controls.norm,onChange:function(t){e.onControlsChanged(e.controls.identifier,{norm:t.target.checked})},color:"primary"}),label:"Normalize"}),c.diagramControlParameter[he.stack].visible&&m.a.createElement(J.a,{control:m.a.createElement(ke.a,{checked:e.controls.stack,onChange:function(t){e.onControlsChanged(e.controls.identifier,{stack:t.target.checked})},color:"primary"}),label:"Stack"})),c.diagramControlParameter[he.legend].visible&&m.a.createElement(ze.a,{variant:"outlined",fullWidth:!0},m.a.createElement(ye.a,null,"Legend"),m.a.createElement(we.a,{value:e.controls.legend,onChange:function(t){e.onControlsChanged(e.controls.identifier,{legend:t.target.value||r.none})},label:"Legend"},m.a.createElement(Ne.a,{value:r.none},"no"),m.a.createElement(Ne.a,{value:r.legend},"yes"))),c.diagramControlParameter[he.bins].visible&&m.a.createElement("div",{className:"slider"},m.a.createElement(_e.a,{id:"viewer-configuration-bin-acuteness-label"},"Bin acuteness"),m.a.createElement(Se.a,{value:null!==f?f:e.controls.bins||0,onChange:function(e,t){v(t)},onChangeCommitted:function(t,a){v(null);var n=a;n!==e.controls.bins&&e.onControlsChanged(e.controls.identifier,{bins:n})},"aria-labelledby":"viewer-configuration-bin-acuteness-label"}))):m.a.createElement(Me.a,{severity:"info"},"No plot selected")))},Be=a(244),Ie=(a(175),a(108)),Le=a.n(Ie),Xe=a(109),Fe=a.n(Xe),Ye=a(110),Re=a.n(Ye),We=a(111),Ae=a.n(We),Ue=a(112),Ke=a.n(Ue),Je=a(107),qe=a.n(Je),Ge=a(252),$e={identifier:"",type:xe,attX:"",attY:"",attC:"",dt:0,visit:Ee.all,followup:0,tolerance:0,norm:!1,stack:!1,fit:i.none,legend:r.legend,bins:0},Qe=function(e){var t,a,n,l,c,r,i,o=Object(u.useState)([]),s=Object(h.a)(o,2),b=s[0],f=s[1],v=Object(u.useState)(),E=Object(h.a)(v,2),O=E[0],C=E[1],y=Object(u.useState)(""),w=Object(h.a)(y,2),k=w[0],S=w[1];Object(u.useEffect)((function(){A().then((function(e){console.log(e),f(e.data.allAttributes)}))}),[]);var z={controlsVisible:!1,filtersVisible:!0,activePlot:""},T=Object(u.useState)(z),V=Object(h.a)(T,2),x=V[0],D=V[1],B=Object(u.useState)(null!==(t=P("grid.layouts"))&&void 0!==t?t:{}),I=Object(h.a)(B,2),U=I[0],K=I[1];Object(u.useEffect)((function(){_("grid.layouts",U),Ue()}),[U,x]),Object(u.useEffect)((function(){_("grid.layouts",U),Ue()}),[U]);var J=Object(u.useState)((null!==(a=P("grid.items"))&&void 0!==a?a:[]).map((function(e){var t;return Object(g.a)(Object(g.a)({},e),{},{y:null!==(t=e.y)&&void 0!==t?t:1/0})}))),G=Object(h.a)(J,2),$=G[0],Q=G[1];Object(u.useEffect)((function(){_("grid.items",$)}),[$]);var Z={breakpoint:"",cols:12},ee=Object(u.useState)(Z),te=Object(h.a)(ee,2),ae=te[0],ce=te[1];Object(u.useEffect)((function(){Ue()}),[ae]);var ie={concept:Oe,constraints:[]},se=Object(u.useState)(null!==(n=P("filter"))&&void 0!==n?n:ie),ue=Object(h.a)(se,2),me=ue[0],be=ue[1];Object(u.useEffect)((function(){_("filter",me)}),[me]);var fe=Object(u.useState)(null!==(l=P("subgroups"))&&void 0!==l?l:[]),ve=Object(h.a)(fe,2),de=ve[0],ge=ve[1];Object(u.useEffect)((function(){_("subgroups",de)}),[de]);var he=Object(u.useState)(null!==(c=P("controls"))&&void 0!==c?c:{}),Ee=Object(h.a)(he,2),je=Ee[0],ye=Ee[1];Object(u.useEffect)((function(){_("controls",je)}),[je]);var Ne=Object(u.useState)(null!==(r=P("plots"))&&void 0!==r?r:{}),we=Object(h.a)(Ne,2),ke=we[0],Se=we[1];Object(u.useEffect)((function(){_("plots",ke)}),[ke]);var _e=Object(u.useState)({}),ze=Object(h.a)(_e,2),Pe=ze[0],He=ze[1],Te=function(){D(Object(g.a)(Object(g.a)({},x),{},{controlsVisible:!x.controlsVisible}))},Ve=function(){D(Object(g.a)(Object(g.a)({},x),{},{filtersVisible:!x.filtersVisible}))},xe=function(e,t,a){if(t){Ze();var n=Object(g.a)(Object(g.a)({},me),{},{constraints:Object(p.a)(me.constraints)});if([pe.Scatter,pe.Histogram,pe.Timeline].includes(je[e].controls.type)){var l={attribute:je[e].controls.attX,lower:t.x[0],upper:t.x[1],items:[]},c=n.constraints.findIndex((function(t){return t.attribute===je[e].controls.attX}));c>-1?n.constraints[c]=l:n.constraints.push(l)}if([pe.Scatter,pe.Timeline].includes(je[e].controls.type)){var r={attribute:je[e].controls.attY,lower:t.y[0],upper:t.y[1],items:[]},i=n.constraints.findIndex((function(t){return t.attribute===je[e].controls.attY}));i>-1?n.constraints[i]=r:n.constraints.push(r)}if([pe.Bar].includes(je[e].controls.type)){var o={attribute:je[e].controls.attX,lower:null,upper:null,items:a},s=n.constraints.findIndex((function(t){return t.attribute===je[e].controls.attX}));s>-1?n.constraints[s]=o:n.constraints.push(o)}be(n),H("new filters:",n),Y(n).then((function(e){We(e)})).catch(Xe)}},Ie=function(e){Ze();var t=Object(g.a)(Object(g.a)({},me),e);be(t),H("new filters:",t),Y(t).then((function(e){We(e)})).catch(Xe)},Xe=function(e){console.log(e);try{S("".concat(e.toJSON().name,": ").concat(e.toJSON().message))}catch(a){S("ERROR: unknown")}C(!0);var t={};Object.keys(je).forEach((function(e){t[e]=!1})),He(t)},Ye=function(e,t){Se(Object(g.a)(Object(g.a)({},ke),{},Object(d.a)({},e,Object(g.a)(Object(g.a)({},ke[e]),{},{data:t.data||[],layout:t.layout||{}})))),H(e,"done"),He(Object(g.a)(Object(g.a)({},Pe),{},Object(d.a)({},e,!1)))},We=function(e){var t=Object.keys(e),a=Object(g.a)({},ke),n=Object(g.a)({},Pe);t.forEach((function(t){a[t]={data:e[t].data||[],layout:e[t].layout||{}},n[t]=!1})),Se(a),He(n)},Ue=function(){window.dispatchEvent(new Event("resize"))},Je=function(e){return{i:e,x:5*$.length%ae.cols,y:1/0,w:5,h:4}},Qe=function(e){return{controls:Object(g.a)(Object(g.a)({},$e),{},{identifier:e})}},Ze=function(e){if(e)He(Object(g.a)(Object(g.a)({},Pe),{},Object(d.a)({},e,!0)));else{var t={};Object.keys(je).forEach((function(e){t[e]=!0})),He(t)}},et=function(e){var t,a;return m.a.createElement(ne.a,{key:e.i,"data-grid":e,className:"grid__item ".concat(x.activePlot===e.i?" grid__item--active":""),onClick:function(){var t;t=e.i,D(Object(g.a)(Object(g.a)({},x),{},{activePlot:t,controlsVisible:!0}))}},m.a.createElement("div",{className:"grid__item-header grid--draggable"},m.a.createElement(re.a,{size:"small","aria-label":"edit"},m.a.createElement(qe.a,null)),m.a.createElement(re.a,{size:"small","aria-label":"close",onClick:function(){!function(e){var t=Object(g.a)({},ke);delete t[e],L(Object.keys(t)).then((function(){Q($.filter((function(t){return t.i!==e}))),Se(t);var a=Object(g.a)({},je);delete a[e],ye(a),x.activePlot===e&&D(Object(g.a)(Object(g.a)({},x),{},{activePlot:"",controlsVisible:!1}))})).catch(Xe)}(e.i)},className:"grid__item--close"},m.a.createElement(oe.a,null))),m.a.createElement("div",{className:"grid__item-loader"},Pe[e.i]&&m.a.createElement(Be.a,null)),m.a.createElement(le.a,{className:"grid__item-content"},m.a.createElement(N,{identifier:e.i,data:null===(t=ke[e.i])||void 0===t?void 0:t.data,layout:null===(a=ke[e.i])||void 0===a?void 0:a.layout,onSelected:xe})))};return b&&b.length?m.a.createElement("div",{className:"container"},m.a.createElement("div",{className:"toolbar"},m.a.createElement("div",{className:"toolbar__left"},m.a.createElement(q.a,{onClick:function(){var e=M(),t=[].concat(Object(p.a)(Object.keys(ke)),[e]);L(t).then((function(){var t,a;Q([].concat(Object(p.a)($),[Je(e)])),ye(Object(g.a)(Object(g.a)({},je),Object(d.a)({},e,Qe(e)))),Se(Object(g.a)(Object(g.a)({},ke),Object(d.a)({},e,{data:[],layout:{}}))),D(Object(g.a)(Object(g.a)({},x),{},{activePlot:e,controlsVisible:!0})),null===(t=document.querySelector(".scrollContainer"))||void 0===t||t.scrollTo({top:null===(a=document.querySelector(".scrollContainer"))||void 0===a?void 0:a.scrollHeight,behavior:"smooth"})})).catch(Xe)},variant:"contained",color:"primary",startIcon:m.a.createElement(Le.a,null),title:"Add new diagram"},"Add"),m.a.createElement(q.a,{onClick:Ue,variant:"contained",color:"primary",startIcon:m.a.createElement(Fe.a,null),title:"Force resize"},"Resize"),m.a.createElement(q.a,{onClick:function(){X().then((function(){D(z),ce(Z),_("grid.layouts",{}),K({}),_("grid.items",[]),Q([]),_("filter",ie),be(ie),_("controls",{}),ye({}),_("plots",{}),Se({}),_("subgroups",[]),ge([])})).catch(Xe)},variant:"contained",color:"primary",startIcon:m.a.createElement(Re.a,null),title:"Reset session"},"Reset session")),m.a.createElement("div",{className:"toolbar__right"},m.a.createElement(q.a,{onClick:Te,variant:"contained",color:"primary",startIcon:m.a.createElement(Ae.a,null),title:"Toggle configuration panel"},"Configuration"),m.a.createElement(q.a,{onClick:Ve,variant:"contained",color:"primary",startIcon:m.a.createElement(Ke.a,null),title:"Toggle filter panel"},"Filter"))),m.a.createElement("div",{className:"row"},x.filtersVisible&&m.a.createElement(Ce,{filter:me,subgroups:de,onFilterChanged:Ie,onSubgroupDefine:function(e){R(e.name).then((function(){ge([].concat(Object(p.a)(de.filter((function(t){return t.name!==e.name}))),[e]))})).catch(Xe)},onSubgroupDelete:function(e){W(e).then((function(t){ge(Object(p.a)(de.filter((function(t){return t.name!==e}))))}))},onSubgroupActivate:function(e){var t=de.find((function(t){return t.name===e}));Ie(Object(g.a)(Object(g.a)({},me),{},{constraints:null===t||void 0===t?void 0:t.constraints}))},onClose:Ve,getTooltip:function(e){return b?b.filter((function(t){return t.attribute===e}))[0].attributeTooltip:""}}),m.a.createElement("div",{className:"scrollContainer"},m.a.createElement(j,{breakpointCols:{lg:12,md:10,sm:6,xs:4,xxs:2},rowHeight:100,layouts:U,onBreakpointChange:function(e,t){ce({breakpoint:e,cols:t})},onLayoutChange:function(e,t){K(t)}},$.map((function(e){return et(e)})))),x.controlsVisible&&m.a.createElement(De,{controls:null===(i=je[x.activePlot])||void 0===i?void 0:i.controls,onControlsChanged:function(e,t){Ze(e);var a=Object(g.a)(Object(g.a)({},je[e].controls),t),n=Object(g.a)(Object(g.a)({},je),Object(d.a)({},e,Object(g.a)(Object(g.a)({},ke[e]),{},{controls:a})));ye(n),H("new controls:",a),F(n[e].controls).then((function(t){Ye(e,t)})).catch(Xe)},onClose:Te,filter:function(e){return b.filter((function(t){return-1!==Object.values(e).findIndex((function(e){return t.datatype===e}))}))}})),m.a.createElement(Ge.a,{open:O,autoHideDuration:1e4,onClose:function(){C(!1)},anchorOrigin:{vertical:"top",horizontal:"right"}},m.a.createElement(Me.a,{variant:"filled",severity:"error",onClose:function(){C(!1)}},k))):null},Ze=function(e){return m.a.createElement("div",{className:"container"},m.a.createElement(Me.a,{severity:"error",variant:"filled"},"Page not found. Please start again from here:"," ",m.a.createElement(b.b,{style:{color:"#fff"},exact:!0,to:"".concat("","/")},"Home")))};function et(){return(et=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}function tt(e,t){if(null==e)return{};var a,n,l=function(e,t){if(null==e)return{};var a,n,l={},c=Object.keys(e);for(n=0;n<c.length;n++)a=c[n],t.indexOf(a)>=0||(l[a]=e[a]);return l}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)a=c[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(l[a]=e[a])}return l}var at=m.a.createElement("style",{type:"text/css"},"\n\t.st0{enable-background:new    ;}\n\t.st1{fill:#424241;}\n\t.st2{fill:#004F9F;}\n"),nt=m.a.createElement("title",null,"UKB-Logo"),lt=m.a.createElement("g",{className:"st0"},m.a.createElement("path",{className:"st1",d:"M341.5,167.4l-16-20v20h-4v-54.7h4v34.6l15.3-17.2h4.8l-15.5,16.9l16.8,20.3H341.5z"}),m.a.createElement("path",{className:"st1",d:"M356.4,167.4v-54.7h4v54.7H356.4z"}),m.a.createElement("path",{className:"st1",d:"M377.4,120.9c-1.6,0-3-1.3-3-3c0-1.6,1.3-3,3-3c1.6,0,3,1.3,3,3C380.4,119.6,379.1,120.9,377.4,120.9z  M375.4,167.4v-37.3h4v37.3H375.4z"}),m.a.createElement("path",{className:"st1",d:"M418.9,167.4v-24.2c0-6.6-1.8-10.4-8-10.4c-7.4,0-12.5,7-12.5,16.9v17.8h-4v-37.3h4.1c0,2.8-0.2,6.6-0.7,9 l0.2,0.1c2.1-5.8,7-9.7,13.6-9.7c8.6,0,11.2,5.3,11.2,12v25.9H418.9z"}),m.a.createElement("path",{className:"st1",d:"M439.9,120.9c-1.6,0-3-1.3-3-3c0-1.6,1.3-3,3-3s3,1.3,3,3C442.9,119.6,441.5,120.9,439.9,120.9z M437.8,167.4 v-37.3h4v37.3H437.8z"}),m.a.createElement("path",{className:"st1",d:"M476.8,167.4l-16-20v20h-4v-54.7h4v34.6l15.3-17.2h4.8l-15.5,16.9l16.8,20.3H476.8z"}),m.a.createElement("path",{className:"st1",d:"M515,167.4c0-2.8,0.2-6.6,0.7-9l-0.2-0.1c-2.1,5.8-7,9.7-13.6,9.7c-8.6,0-11.2-5.3-11.2-12v-25.9h4v24.2 c0,6.6,1.8,10.4,8,10.4c7.4,0,12.5-7,12.5-16.9v-17.8h4v37.3H515z"}),m.a.createElement("path",{className:"st1",d:"M582,167.4v-24.2c0-6.3-1.5-10.4-7.6-10.4c-6.4,0-12.3,6.3-12.3,17v17.6h-4v-24.3c0-5.6-1.1-10.3-7.6-10.3 c-6.9,0-12.3,7-12.3,17v17.6h-4v-37.3h4.1c0,2.8-0.2,6.6-0.7,9l0.2,0.1c2.1-5.8,7.1-9.7,13.5-9.7c9.2,0,10.6,7,10.4,9.5 c1.3-3.5,5.2-9.5,13.3-9.5c6.9,0,10.9,3.6,10.9,12v25.9H582z"})),ct=m.a.createElement("g",{className:"st0"},m.a.createElement("path",{className:"st1",d:"M613.6,168c-5.2,0-8.8-0.4-12.8-1.5v-53.8h6.7v18.1c0,2.2-0.2,5.1-0.7,7l0.2,0.1c2-5.2,6.7-8.3,12.3-8.3 c8.8,0,13.7,6.1,13.7,17.5C633,160.1,625.6,168,613.6,168z M617.7,135c-6.7,0-10.2,7.9-10.2,14.3v12.4c2,0.6,4,0.9,6.6,0.9 c7,0,11.8-4.3,11.8-15C626,139.6,623.4,135,617.7,135z"}),m.a.createElement("path",{className:"st1",d:"M656,168.1c-10.2,0-16.7-5.8-16.7-19c0-10.9,6.9-19.6,18.1-19.6c9.5,0,16.7,5.2,16.7,18.7 C674.1,159.4,667,168.1,656,168.1z M656.8,135.1c-5.4,0-10.6,4.1-10.6,13.3c0,9,3.7,13.9,10.6,13.9c5.5,0,10.3-4.3,10.3-13.9 C667.1,140.1,663.7,135.1,656.8,135.1z"}),m.a.createElement("path",{className:"st1",d:"M707.2,167.4v-24c0-5.2-1.4-8.4-6.4-8.4c-6.1,0-10.6,6.3-10.6,14.5v17.8h-6.7v-37.3h6.5c0,2.2-0.2,5.6-0.6,7.9 h0.2c2.2-5.1,6.7-8.5,13.1-8.5c8.5,0,11.2,5.3,11.2,11.9v26H707.2z"}),m.a.createElement("path",{className:"st1",d:"M750.3,167.4v-24c0-5.2-1.4-8.4-6.4-8.4c-6.1,0-10.6,6.3-10.6,14.5v17.8h-6.7v-37.3h6.5c0,2.2-0.2,5.6-0.6,7.9 h0.2c2.2-5.1,6.7-8.5,13.1-8.5c8.5,0,11.2,5.3,11.2,11.9v26H750.3z"})),rt=m.a.createElement("g",{className:"st0"},m.a.createElement("path",{className:"st1",d:"M345.9,91.5c0-2.8,0.2-6.6,0.7-9l-0.1-0.1c-2.1,5.8-7,9.7-13.6,9.7c-8.6,0-11.2-5.3-11.2-12V54.3h4v24.2 c0,6.6,1.8,10.4,8,10.4c7.4,0,12.5-7,12.5-16.9V54.3h4v37.3H345.9z"}),m.a.createElement("path",{className:"st1",d:"M389.6,91.5V67.3c0-6.6-1.8-10.4-8-10.4c-7.4,0-12.5,7-12.5,16.9v17.8h-4V54.3h4.1c0,2.8-0.2,6.6-0.7,9 l0.1,0.1c2.1-5.8,7-9.7,13.6-9.7c8.6,0,11.2,5.3,11.2,12v25.9H389.6z"}),m.a.createElement("path",{className:"st1",d:"M410.5,45.1c-1.6,0-3-1.3-3-3c0-1.6,1.3-3,3-3c1.7,0,3,1.3,3,3C413.5,43.7,412.2,45.1,410.5,45.1z M408.5,91.5 V54.3h4v37.3H408.5z"})),it=m.a.createElement("g",{className:"st0"},m.a.createElement("path",{className:"st1",d:"M439.4,91.5h-4.2L421,54.3h4.6l9.8,27.4c0.8,2.2,1.3,3.9,1.9,5.9h0.1c0.6-1.9,1.3-3.8,1.9-5.7l10.1-27.7h4.4 L439.4,91.5z"})),ot=m.a.createElement("g",{className:"st0"},m.a.createElement("path",{className:"st1",d:"M487.5,71.5h-25.6c-0.5,12,4.3,17.2,13.2,17.2c3.7,0,7.4-0.8,10.5-2.2l0.9,3.4c-3.4,1.4-7.6,2.2-12.3,2.2 c-10.8,0-16.6-6.1-16.6-19.1c0-11.1,5.9-19.3,15.9-19.3c10,0,14.1,7,14.1,14.8C487.5,68.9,487.5,70.2,487.5,71.5z M473.1,56.9 c-5.8,0-10,4.1-11.1,11.4h21.1C483.3,61.3,479.5,56.9,473.1,56.9z"}),m.a.createElement("path",{className:"st1",d:"M515.9,57.7c-8.8-1.3-12.9,5.7-12.9,19.1v14.8h-4V54.3h4.1c0,2.7-0.3,6.7-1,10.1l0.1,0.1 c1.3-5.7,5.3-11.8,13.7-10.7L515.9,57.7z"}),m.a.createElement("path",{className:"st1",d:"M531,92.1c-2.8,0-6.1-0.3-8.3-1l0.7-4c2.4,0.9,5.7,1.4,8.5,1.4c5.8,0,10.1-2.8,10.1-7.3 c0-10.1-19.5-3.7-19.5-17.2c0-6.1,4.9-10.5,13.9-10.5c2.4,0,5.3,0.4,7.6,0.9l-0.6,3.5c-2.3-0.8-5-1.2-7.6-1.2 c-6.1,0-9.1,2.6-9.1,6.7c0,10.2,19.5,3.9,19.5,17C546,86.9,540.5,92.1,531,92.1z"}),m.a.createElement("path",{className:"st1",d:"M560,45.1c-1.6,0-3-1.3-3-3c0-1.6,1.3-3,3-3c1.7,0,3,1.3,3,3C563,43.7,561.7,45.1,560,45.1z M558,91.5V54.3h4 v37.3H558z"}),m.a.createElement("path",{className:"st1",d:"M587.5,92.1c-7.1,0-9.1-3.4-9.1-10.7V57.4h-8.8v-3.1h8.8V41.5l4-1.1v13.9h11.8v3.1h-11.8v21.7 c0,7.5,1.3,9.4,6.1,9.4c2,0,3.8-0.3,5.3-0.7l0.6,3.5C592.4,91.8,589.7,92.1,587.5,92.1z"})),st=m.a.createElement("g",{className:"st0"},m.a.createElement("path",{className:"st1",d:"M624.4,91.5c0-3.1,0.1-6.2,0.5-8.5l-0.2-0.1c-1.8,5-6.7,9.1-13.4,9.1c-5.6,0-10-3.5-10-9.5 c0-7.2,7.8-12.6,23.2-12.6v-2.1c0-7.3-2.2-10.9-9.1-10.9c-3.6,0-8.1,1.3-11.2,2.8l-1-3.4c3.5-1.6,8.1-2.8,12.8-2.8 c9.4,0,12.4,5.2,12.4,13v13c0,4,0.1,8.4,0.1,11.8H624.4z M624.4,73.3c-14.8,0-19,4.3-19,8.6c0,4,2.7,6.9,6.8,6.9 c7.3,0,12.2-7.4,12.2-14.6V73.3z M608.9,45c-1.6,0-2.9-1.3-2.9-2.9c0-1.6,1.3-2.9,2.9-2.9s2.9,1.3,2.9,2.9 C611.9,43.7,610.6,45,608.9,45z M622.6,45c-1.6,0-2.9-1.3-2.9-2.9c0-1.6,1.3-2.9,2.9-2.9c1.7,0,2.9,1.3,2.9,2.9 C625.5,43.7,624.2,45,622.6,45z"})),ut=m.a.createElement("g",{className:"st0"},m.a.createElement("path",{className:"st1",d:"M652.9,92.1c-7.1,0-9.1-3.4-9.1-10.7V57.4h-8.8v-3.1h8.8V41.5l4-1.1v13.9h11.8v3.1h-11.8v21.7 c0,7.5,1.3,9.4,6.1,9.4c1.9,0,3.8-0.3,5.3-0.7l0.6,3.5C657.9,91.8,655.2,92.1,652.9,92.1z"}),m.a.createElement("path",{className:"st1",d:"M675.4,92.1c-2.8,0-6.1-0.3-8.3-1l0.7-4c2.4,0.9,5.7,1.4,8.5,1.4c5.8,0,10.1-2.8,10.1-7.3 c0-10.1-19.5-3.7-19.5-17.2c0-6.1,4.9-10.5,13.9-10.5c2.4,0,5.3,0.4,7.6,0.9l-0.6,3.5c-2.3-0.8-5-1.2-7.6-1.2 c-6.1,0-9.1,2.6-9.1,6.7c0,10.2,19.5,3.9,19.5,17C690.5,86.9,685,92.1,675.4,92.1z"})),mt=m.a.createElement("g",null,m.a.createElement("path",{className:"st2",d:"M74.6,106.1c0,29.9-15.5,51.3-38.1,51.3c-18.9,0-24.4-11.6-24.4-31.7V52H0v78.7c0,20.3,8,36.5,34.2,36.5 c20.3,0,34-11.1,40.4-28.9v29.3h12.1V0H74.6V106.1z"})),bt=m.a.createElement("g",null,m.a.createElement("polygon",{className:"st1",points:"99.4,106.6 145.9,54.2 160.5,54.2 113.3,105.7 164.3,167.5 147.9,167.5  "})),ft=m.a.createElement("g",null,m.a.createElement("path",{className:"st1",d:"M236.9,51.2c-18.5,0-32.4,11.3-39,30.5c0,0,0-14.5,0-20.7V-0.1h-12.1v163.7c11.2,2.7,21,3.9,35.8,3.9 c34.2,0,57.2-21.4,57.2-62.7C278.8,69,263.3,51.2,236.9,51.2 M223,156.9c-9.6,0-17.6-0.9-25.1-3.4v-42.9 c0-20.5,11.8-50.6,37.6-50.6c21,0,30.6,17.1,30.6,44.7C266.1,141.4,249.2,156.9,223,156.9"})),vt=function(e){var t=e.svgRef,a=e.title,n=tt(e,["svgRef","title"]);return m.a.createElement("svg",et({id:"Ebene_1",x:"0px",y:"0px",viewBox:"0 0 757.1 167.6",style:{enableBackground:"new 0 0 757.1 167.6"},xmlSpace:"preserve",ref:t},n),at,void 0===a?nt:a?m.a.createElement("title",null,a):null,lt,ct,rt,it,ot,st,ut,mt,bt,ft,m.a.createElement("text",{transform:"matrix(1 0 0 1 215 -165)",style:{fontFamily:"'MyriadPro-Regular'",fontSize:12}},"Lorem ipsum"))},dt=m.a.forwardRef((function(e,t){return m.a.createElement(vt,et({svgRef:t},e))})),pt=(a.p,m.a.createElement(b.a,null,m.a.createElement("nav",{className:"navigation"},m.a.createElement(b.b,{exact:!0,className:"navigation__item",activeClassName:"navigation__item--active",to:"".concat("","/")},"Home"),m.a.createElement(b.b,{className:"navigation__item",activeClassName:"navigation__item--active",to:"".concat("","/viewer")},"Viewer"),m.a.createElement(dt,{className:"navigation__logo"})),m.a.createElement(f.c,null,m.a.createElement(f.a,{exact:!0,path:"".concat("","/"),component:v}),m.a.createElement(f.a,{exact:!0,path:"".concat("","/viewer"),component:Qe}),m.a.createElement(f.a,{component:Ze})))),gt=a(246),ht=a(245),Et=a(113),Ot=Object(Et.a)({palette:{primary:{main:"#0484BF"},background:{default:"#f0f0f2"}}});a(177),a(178),a(179);l.a.render(m.a.createElement(ht.a,{theme:Ot},m.a.createElement(gt.a,null),pt),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[129,1,2]]]);
//# sourceMappingURL=main.fc15dd62.chunk.js.map