(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{"3WF5":function(t,n,e){var r=e("eUgh"),a=e("ut/Y"),o=e("l9OW"),u=e("Z0cm");t.exports=function(t,n){return(u(t)?r:o)(t,a(n,3))}},BiGR:function(t,n,e){var r=e("nmnc"),a=e("03A+"),o=e("Z0cm"),u=r?r.isConcatSpreadable:void 0;t.exports=function(t){return o(t)||a(t)||!!(u&&t&&t[u])}},"C+Hg":function(t,n,e){"use strict";e.r(n);e("E9XD");var r=e("KQm4"),a=e("zLVn"),o=e("FdF9"),u=e("IMe6"),c=e("wUWr"),i=e.n(c),f=e("Z0cm"),s=e.n(f),l=e("v527"),d=e("/tfy");n.default=function(t){var n=t.data,e=n.header,c=n.footer,f=n.seo,p=n.heroes,v=n.features,g=n.richTexts,h=n.layoutModuleContainers,m=n.moduleContainers,b=n.cards,x=n.ctas,C=n.faqs,O=n.embeds,q=n.logos,w=n.hubspotForms,j=n.fullWidthCtas,F=t.pageContext,A=F.modules,W=F.pathBuild,M=F.themeColor,X=F.isFaqLayout,y=(t.path,Object(a.a)(t,["data","pageContext","path"])),G=o.default.useState(""),k={faq:{idFaqActive:G[0],setIdFaqActive:G[1]}},J=i()([p,v,g,h,m,b,x,C,O,q,w,j],(function t(n){if(n)return s()(n.edges)?t(n.edges):s()(n)?n.map((function(t){return t.node})):n})).reduce((function(t,n){if(!n||!n.contentful_id)return t;var e=A.indexOf(n.contentful_id);return t.splice(e,1,n),t}),Array(A.length-1)),K=[e].concat(Object(r.a)(J),[c]);return o.default.createElement(d.a.Provider,{value:k},o.default.createElement(l.a,Object.assign({},y,{themeColor:M}),f&&Object(u.a)(Object.assign({},f,{pagePath:W})),K.map((function(t){return Object(u.a)(Object.assign({},t,{isFaq:X}))}))))}},JC6p:function(t,n,e){var r=e("cq/+"),a=e("7GkX");t.exports=function(t,n){return t&&r(t,n,a)}},SKAX:function(t,n,e){var r=e("JC6p"),a=e("lQqw")(r);t.exports=a},XGnz:function(t,n,e){var r=e("CH3K"),a=e("BiGR");t.exports=function t(n,e,o,u,c){var i=-1,f=n.length;for(o||(o=a),c||(c=[]);++i<f;){var s=n[i];e>0&&o(s)?e>1?t(s,e-1,o,u,c):r(c,s):u||(c[c.length]=s)}return c}},"cq/+":function(t,n,e){var r=e("mc0g")();t.exports=r},l9OW:function(t,n,e){var r=e("SKAX"),a=e("MMmD");t.exports=function(t,n){var e=-1,o=a(t)?Array(t.length):[];return r(t,(function(t,r,a){o[++e]=n(t,r,a)})),o}},lQqw:function(t,n,e){var r=e("MMmD");t.exports=function(t,n){return function(e,a){if(null==e)return e;if(!r(e))return t(e,a);for(var o=e.length,u=n?o:-1,c=Object(e);(n?u--:++u<o)&&!1!==a(c[u],u,c););return e}}},mc0g:function(t,n){t.exports=function(t){return function(n,e,r){for(var a=-1,o=Object(n),u=r(n),c=u.length;c--;){var i=u[t?c:++a];if(!1===e(o[i],i,o))break}return n}}},wUWr:function(t,n,e){var r=e("XGnz"),a=e("3WF5");t.exports=function(t,n){return r(a(t,n),1/0)}}}]);
//# sourceMappingURL=component---src-templates-contentful-layout-js-7a99fb7ab72f7728a6e3.js.map