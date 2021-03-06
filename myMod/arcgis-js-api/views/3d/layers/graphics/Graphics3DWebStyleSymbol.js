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

define(["require","exports","../../../../core/tsSupport/extendsHelper","../../support/PromiseLightweight"],function(e,t,r,i){return function(e){function t(t,r){var i=e.call(this)||this;return i.symbol=t,i.graphics3DSymbol=null,t.fetchSymbol().then(function(e){if(i.isRejected())throw new Error;e.id=i.symbol.id,i.graphics3DSymbol=r(e)}).then(function(){if(i.isRejected())throw new Error;i.graphics3DSymbol.then(function(){i.isRejected()||i.resolve()},function(e){i.isRejected()||i.reject(e)})}).catch(function(e){i.isRejected()||i.reject(e)}),i}return r(t,e),t.prototype.createGraphics3DGraphic=function(e){return this.graphics3DSymbol.createGraphics3DGraphic(e,this)},Object.defineProperty(t.prototype,"numberOfVertices",{get:function(){return this.graphics3DSymbol?this.graphics3DSymbol.numberOfVertices:0},enumerable:!0,configurable:!0}),t.prototype.layerPropertyChanged=function(e,t){return this.graphics3DSymbol.layerPropertyChanged(e,t)},t.prototype.applyRendererDiff=function(e,t,r){return this.graphics3DSymbol.applyRendererDiff(e,t,r)},t.prototype.getFastUpdateStatus=function(){return this.graphics3DSymbol?this.graphics3DSymbol.getFastUpdateStatus():{loading:1,fast:0,slow:0}},t.prototype.setDrawOrder=function(e,t){if(this.graphics3DSymbol)return this.graphics3DSymbol.setDrawOrder(e,t)},t.prototype.destroy=function(){this.isFulfilled()||this.reject(),this.graphics3DSymbol&&this.graphics3DSymbol.destroy()},t}(i.Promise)});