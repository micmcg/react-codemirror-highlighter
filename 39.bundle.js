(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{35:function(t,e,n){!function(t){"use strict";var e="this super static final const abstract class extends external factory implements mixin get native set typedef with enum throw rethrow assert break case continue default in return new deferred async await covariant try catch finally do else for if switch while import library export part of show hide is as".split(" "),n="try catch finally do else for if switch while".split(" "),i="true false null".split(" "),r="void bool num int double dynamic var String".split(" ");function o(t){for(var e={},n=0;n<t.length;++n)e[t[n]]=!0;return e}function a(t){(t.interpolationStack||(t.interpolationStack=[])).push(t.tokenize)}function u(t){return(t.interpolationStack||(t.interpolationStack=[])).pop()}function c(t,e,n,i){var r=!1;if(e.eat(t)){if(!e.eat(t))return"string";r=!0}function o(e,n){for(var o=!1;!e.eol();){if(!i&&!o&&"$"==e.peek())return a(n),n.tokenize=l,"string";var u=e.next();if(u==t&&!o&&(!r||e.match(t+t))){n.tokenize=null;break}o=!i&&!o&&"\\"==u}return"string"}return n.tokenize=o,o(e,n)}function l(t,e){return t.eat("$"),t.eat("{")?e.tokenize=null:e.tokenize=f,null}function f(t,e){return t.eatWhile(/[\w_]/),e.tokenize=u(e),"variable"}t.defineMIME("application/dart",{name:"clike",keywords:o(e),blockKeywords:o(n),builtin:o(r),atoms:o(i),hooks:{"@":function(t){return t.eatWhile(/[\w\$_\.]/),"meta"},"'":function(t,e){return c("'",t,e,!1)},'"':function(t,e){return c('"',t,e,!1)},r:function(t,e){var n=t.peek();return("'"==n||'"'==n)&&c(t.next(),t,e,!0)},"}":function(t,e){return function(t){return t.interpolationStack?t.interpolationStack.length:0}(e)>0&&(e.tokenize=u(e),null)},"/":function(t,e){return!!t.eat("*")&&(e.tokenize=function t(e){return function(n,i){for(var r;r=n.next();){if("*"==r&&n.eat("/")){if(1==e){i.tokenize=null;break}return i.tokenize=t(e-1),i.tokenize(n,i)}if("/"==r&&n.eat("*"))return i.tokenize=t(e+1),i.tokenize(n,i)}return"comment"}}(1),e.tokenize(t,e))}}}),t.registerHelper("hintWords","application/dart",e.concat(i).concat(r)),t.defineMode("dart",function(e){return t.getMode(e,"application/dart")},"clike")}(n(1),n(10))}}]);