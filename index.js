function init(s){var t=this;this.processSets=[],this.data=s,this.errorMessage=void 0,this.pass=!1,this.newProcess=function(s){t.processSets.push({action:s.action||function(s){return s},tests:s.tests||[function(){return!0}],mode:s.mode||"sync",errorMessage:s.errorMessage||""})},this.run=function(){var s=0,n=t.processSets.length,e=t.processSets[s],o=function(s){"async"==e.mode?e.action(t.data).then(function(s){t.data=s,r(e)}):(t.data=e.action(t.data),r(e))},r=function(s){t.runTests(s)===!1?(t.pass=!1,t.onEnd()):a()},a=function(){s+1<n?(s++,e=t.processSets[s],o(e)):(t.pass=!0,t.onEnd(t.pass,t.data))};o(e)},this.onEnd=function(){},this.runTests=function(s){for(var n=0;n<s.tests.length;n++){var e=s.tests[n](t.data);if(void 0===e||null===e){console.error("Test function passed to function has null return");break}if(e!==!0)return t.errorMessage=e,!1}}}module.exports=init;