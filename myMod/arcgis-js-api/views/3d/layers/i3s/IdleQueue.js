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

define(["require","exports","dojo/Deferred","dojo/errors/CancelError"],function(e,r,t,s){Object.defineProperty(r,"__esModule",{value:!0});var n=function(){function e(){this._deferreds=[],this._values=[]}return e.prototype.push=function(e){var r=new t;return this._deferreds.push(r),this._values.push(e),r.promise},e.prototype.unshift=function(e){var r=new t;return this._deferreds.unshift(r),this._values.unshift(e),r.promise},e.prototype.length=function(){return this._deferreds.length},e.prototype.process=function(){this._deferreds.shift().resolve(this._values.shift())},e.prototype.cancelAll=function(){for(var e=new s,r=0,t=this._deferreds;r<t.length;r++){t[r].cancel(e)}this._deferreds.length=0,this._values.length=0},e}();r.IdleQueue=n});