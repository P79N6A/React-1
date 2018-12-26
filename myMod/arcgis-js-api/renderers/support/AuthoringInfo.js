// COPYRIGHT © 2018 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.9/esri/copyright.txt for details.

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../core/JSONSupport","../../core/kebabDictionary","../../core/lang","../../core/accessorSupport/decorators","./AuthoringInfoVisualVariable"],function(e,t,i,s,n,r,l,a,o){var p=r({esriClassifyEqualInterval:"equal-interval",esriClassifyManual:"manual",esriClassifyNaturalBreaks:"natural-breaks",esriClassifyQuantile:"quantile",esriClassifyStandardDeviation:"standard-deviation"}),u=r({classedSize:"class-breaks-size",classedColor:"class-breaks-color",univariateColorSize:"univariate-color-size",relationship:"relationship",predominance:"predominance"}),c=["inches","feet","yards","miles","nautical-miles","millimeters","centimeters","decimeters","meters","kilometers","decimal-degrees"];return function(e){function t(t){var i=e.call(this)||this;return i.lengthUnit=null,i.visualVariables=null,i}i(t,e),n=t,Object.defineProperty(t.prototype,"classificationMethod",{get:function(){var e=this._get("classificationMethod"),t=this.type;return t&&"relationship"!==t?"class-breaks-size"===t||"class-breaks-color"===t?e||"manual":null:e},set:function(e){this._set("classificationMethod",e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"fields",{get:function(){return this.type&&"predominance"!==this.type?null:this._get("fields")},set:function(e){this._set("fields",e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"field1",{get:function(){return this.type&&"relationship"!==this.type?null:this._get("field1")},set:function(e){this._set("field1",e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"field2",{get:function(){return this.type&&"relationship"!==this.type?null:this._get("field2")},set:function(e){this._set("field2",e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"focus",{get:function(){return this.type&&"relationship"!==this.type?null:this._get("focus")},set:function(e){this._set("focus",e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"numClasses",{get:function(){return this.type&&"relationship"!==this.type?null:this._get("numClasses")},set:function(e){this._set("numClasses",e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"standardDeviationInterval",{get:function(){var e=this.type;return e&&"relationship"!==e&&"class-breaks-size"!==e&&"class-breaks-color"!==e?null:this.classificationMethod&&"standard-deviation"!==this.classificationMethod?null:this._get("standardDeviationInterval")},set:function(e){this._set("standardDeviationInterval",e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"type",{get:function(){return this._get("type")},set:function(e){var t=e;"classed-size"===e?t="class-breaks-size":"classed-color"===e&&(t="class-breaks-color"),this._set("type",t)},enumerable:!0,configurable:!0}),t.prototype.clone=function(){return new n({classificationMethod:this.classificationMethod,fields:this.fields&&this.fields.slice(0),field1:l.clone(this.field1),field2:l.clone(this.field2),focus:this.focus,numClasses:this.numClasses,lengthUnit:this.lengthUnit,standardDeviationInterval:this.standardDeviationInterval,type:this.type,visualVariables:this.visualVariables&&this.visualVariables.map(function(e){return e.clone()})})};var n;return s([a.property({type:p.apiValues,value:null,dependsOn:["type"],json:{type:p.jsonValues,read:p.read,write:p.write}})],t.prototype,"classificationMethod",null),s([a.property({type:[String],value:null,dependsOn:["type"],json:{write:!0}})],t.prototype,"fields",null),s([a.property({value:null,dependsOn:["type"],json:{write:!0}})],t.prototype,"field1",null),s([a.property({value:null,dependsOn:["type"],json:{write:!0}})],t.prototype,"field2",null),s([a.property({type:String,value:null,dependsOn:["type"],json:{write:!0}})],t.prototype,"focus",null),s([a.property({type:Number,value:null,dependsOn:["type"],json:{write:!0}})],t.prototype,"numClasses",null),s([a.property({type:c,json:{type:c,read:!1,write:!1,origins:{"web-scene":{read:!0,write:!0}}}})],t.prototype,"lengthUnit",void 0),s([a.property({type:[.25,.33,.5,1],value:null,dependsOn:["classificationMethod","type"],json:{type:[.25,.33,.5,1],write:!0}})],t.prototype,"standardDeviationInterval",null),s([a.property({type:String,value:null,json:{type:u.jsonValues,read:u.read,write:u.write}})],t.prototype,"type",null),s([a.property({type:[o],json:{write:!0}})],t.prototype,"visualVariables",void 0),t=n=s([a.subclass("esri.renderers.support.AuthoringInfo")],t)}(a.declared(n))});