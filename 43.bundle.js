(window.webpackJsonp=window.webpackJsonp||[]).push([[43],{41:function(t,e,a){!function(t){"use strict";t.defineMode("ebnf",function(e){var a={slash:0,parenthesis:1},c={comment:0,_string:1,characterClass:2},n=null;return e.bracesMode&&(n=t.getMode(e,e.bracesMode)),{startState:function(){return{stringType:null,commentType:null,braced:0,lhs:!0,localState:null,stack:[],inDefinition:!1}},token:function(e,r){if(e){switch(0===r.stack.length&&('"'==e.peek()||"'"==e.peek()?(r.stringType=e.peek(),e.next(),r.stack.unshift(c._string)):e.match(/^\/\*/)?(r.stack.unshift(c.comment),r.commentType=a.slash):e.match(/^\(\*/)&&(r.stack.unshift(c.comment),r.commentType=a.parenthesis)),r.stack[0]){case c._string:for(;r.stack[0]===c._string&&!e.eol();)e.peek()===r.stringType?(e.next(),r.stack.shift()):"\\"===e.peek()?(e.next(),e.next()):e.match(/^.[^\\\"\']*/);return r.lhs?"property string":"string";case c.comment:for(;r.stack[0]===c.comment&&!e.eol();)r.commentType===a.slash&&e.match(/\*\//)?(r.stack.shift(),r.commentType=null):r.commentType===a.parenthesis&&e.match(/\*\)/)?(r.stack.shift(),r.commentType=null):e.match(/^.[^\*]*/);return"comment";case c.characterClass:for(;r.stack[0]===c.characterClass&&!e.eol();)e.match(/^[^\]\\]+/)||e.match(/^\\./)||r.stack.shift();return"operator"}var s=e.peek();if(null!==n&&(r.braced||"{"===s)){null===r.localState&&(r.localState=t.startState(n));var i=n.token(e,r.localState),m=e.current();if(!i)for(var o=0;o<m.length;o++)"{"===m[o]?(0===r.braced&&(i="matchingbracket"),r.braced++):"}"===m[o]&&(r.braced--,0===r.braced&&(i="matchingbracket"));return i}switch(s){case"[":return e.next(),r.stack.unshift(c.characterClass),"bracket";case":":case"|":case";":return e.next(),"operator";case"%":if(e.match("%%"))return"header";if(e.match(/[%][A-Za-z]+/))return"keyword";if(e.match(/[%][}]/))return"matchingbracket";break;case"/":if(e.match(/[\/][A-Za-z]+/))return"keyword";case"\\":if(e.match(/[\][a-z]+/))return"string-2";case".":if(e.match("."))return"atom";case"*":case"-":case"+":case"^":if(e.match(s))return"atom";case"$":if(e.match("$$"))return"builtin";if(e.match(/[$][0-9]+/))return"variable-3";case"<":if(e.match(/<<[a-zA-Z_]+>>/))return"builtin"}return e.match(/^\/\//)?(e.skipToEnd(),"comment"):e.match(/return/)?"operator":e.match(/^[a-zA-Z_][a-zA-Z0-9_]*/)?e.match(/(?=[\(.])/)?"variable":e.match(/(?=[\s\n]*[:=])/)?"def":"variable-2":-1!=["[","]","(",")"].indexOf(e.peek())?(e.next(),"bracket"):(e.eatSpace()||e.next(),null)}}}}),t.defineMIME("text/x-ebnf","ebnf")}(a(1))}}]);