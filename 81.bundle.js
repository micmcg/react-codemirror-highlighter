(window.webpackJsonp=window.webpackJsonp||[]).push([[81],{169:function(e,t,n){"use strict";function a(e){e.languages["markup-templating"]={},Object.defineProperties(e.languages["markup-templating"],{buildPlaceholders:{value:function(t,n,a,o){t.language===n&&(t.tokenStack=[],t.code=t.code.replace(a,function(e){if("function"==typeof o&&!o(e))return e;for(var a=t.tokenStack.length;-1!==t.code.indexOf("___"+n.toUpperCase()+a+"___");)++a;return t.tokenStack[a]=e,"___"+n.toUpperCase()+a+"___"}),t.grammar=e.languages.markup)}},tokenizePlaceholders:{value:function(t,n){if(t.language===n&&t.tokenStack){t.grammar=e.languages[n];var a=0,o=Object.keys(t.tokenStack),r=function(i){if(!(a>=o.length))for(var c=0;c<i.length;c++){var p=i[c];if("string"==typeof p||p.content&&"string"==typeof p.content){var s=o[a],g=t.tokenStack[s],l="string"==typeof p?p:p.content,u=l.indexOf("___"+n.toUpperCase()+s+"___");if(u>-1){++a;var f,k=l.substring(0,u),_=new e.Token(n,e.tokenize(g,t.grammar,n),"language-"+n,g),m=l.substring(u+("___"+n.toUpperCase()+s+"___").length);if(k||m?(f=[k,_,m].filter(function(e){return!!e}),r(f)):f=_,"string"==typeof p?Array.prototype.splice.apply(i,[c,1].concat(f)):p.content=f,a>=o.length)break}}else p.content&&"string"!=typeof p.content&&r(p.content)}};r(t.tokens)}}}})}e.exports=a,a.displayName="markupTemplating",a.aliases=[]}}]);