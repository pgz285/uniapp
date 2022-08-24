(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/info-popup/info-popup"],{"1c0b":function(n,o,e){"use strict";e.r(o);var t=e("c551"),u=e.n(t);for(var i in t)"default"!==i&&function(n){e.d(o,n,(function(){return t[n]}))}(i);o["default"]=u.a},"1c64":function(n,o,e){"use strict";e.r(o);var t=e("39ff"),u=e("1c0b");for(var i in u)"default"!==i&&function(n){e.d(o,n,(function(){return u[n]}))}(i);e("9fa9");var c,r=e("f0c5"),a=Object(r["a"])(u["default"],t["b"],t["c"],!1,null,"66c0065a",null,!1,t["a"],c);o["default"]=a.exports},"39ff":function(n,o,e){"use strict";e.d(o,"b",(function(){return u})),e.d(o,"c",(function(){return i})),e.d(o,"a",(function(){return t}));var t={uPopup:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uview-ui/components/u-popup/u-popup")]).then(e.bind(null,"6c65"))},uTag:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uview-ui/components/u-tag/u-tag")]).then(e.bind(null,"07c8"))}},u=function(){var n=this,o=n.$createElement;n._self._c},i=[]},"5b65":function(n,o,e){},"9fa9":function(n,o,e){"use strict";var t=e("5b65"),u=e.n(t);u.a},c551:function(n,o,e){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var t={name:"login-popup",data:function(){return{agree:!1,popupData:{isshow:!1,overlay:!0,mode:"bottom",borderRadius:"",round:"20",closeable:!0,closeOnClickOverlay:!0}}},props:{show:Boolean},mounted:function(){this.isshow=this.show},methods:{change:function(){this.agree=!this.agree},close:function(){this.isshow=!1,this.$emit("send")}}};o.default=t}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/info-popup/info-popup-create-component',
    {
        'components/info-popup/info-popup-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("1c64"))
        })
    },
    [['components/info-popup/info-popup-create-component']]
]);
