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

define(["require","exports","../../../core/tsSupport/declareExtendsHelper","../../../core/tsSupport/decorateHelper","../../../core/Accessor","../../../core/Evented","../../../core/Handles","../../../core/accessorSupport/decorators","../../../geometry/ScreenPoint","./DrawAction","./input/DrawEvents","./input/Keys"],function(e,t,r,o,i,n,s,d,c,a,p,v){return function(e){function t(t){var r=e.call(this,t)||this;return r._cursorMoved=!1,r._isDragging=!1,r._cursorScreenPoint=null,r._pointerDownEvent=null,r._viewHandles=new s,r.mode="freehand",r.vertices=[],r.view=null,r}return r(t,e),t.prototype.initialize=function(){this._addViewHandles()},t.prototype.destroy=function(){this._removeViewHandles(),this._viewHandles.destroy(),this.emit("destroy")},t.prototype.complete=function(){this._completeDrawing()},t.prototype._addViewHandles=function(){this._removeViewHandles(),"click"===this.mode?this._viewHandles.add(this._getClickModeViewHandles()):this._viewHandles.add(this._getDragModeViewHandles())},t.prototype._getDragModeViewHandles=function(){var e=this;return[this.view.on("click",function(t){t.stopPropagation(),e._set("vertices",[[t.mapPoint.x,t.mapPoint.y]]),e._drawCompleteHandler(t)}),this.view.on("pointer-down",function(t){e._pointerDownEvent=t,e._cursorMoved=!1,e._cursorScreenPoint=new c(t.x,t.y),e._set("vertices",[]),e._vertexAddHandler(t)}),this.view.on("pointer-move",function(t){e._cursorMoved&&e.vertices.pop(),e._cursorMoved=!0,e._cursorScreenPoint=new c(t.x,t.y),e._pointerDownEvent?e._vertexAddHandler(t):e._cursorUpdateHandler(t)}),this.view.on("pointer-up",function(t){e._cursorMoved?e._drawCompleteHandler(t):(e.vertices.pop(),e._pointerDownEvent=null)}),this.view.on("key-down",function(t){t.key===v.KEYS.drawCompleteKey&&e._cursorScreenPoint&&e._drawCompleteHandler(t)}),this.view.on("drag",function(t){e._pointerDownEvent&&t.stopPropagation()}),this.view.on("drag",["Shift"],function(e){e.stopPropagation()})]},t.prototype._getClickModeViewHandles=function(){var e=this;return[this.view.on("click",function(e){e.stopPropagation()}),this.view.on("pointer-down",function(t){e._pointerDownEvent=t,e._isDragging=!1,e._cursorMoved=!1,e._cursorScreenPoint=new c(t.x,t.y)}),this.view.on("pointer-move",function(t){e._cursorMoved&&e.vertices.pop(),e._cursorMoved=!0,e._cursorScreenPoint=new c(t.x,t.y),e._cursorUpdateHandler(t)}),this.view.on("pointer-up",function(t){e._cursorMoved||e._isDragging?e.vertices.pop():e._vertexAddHandler(t),2!==e.vertices.length||e._isDragging||e._drawCompleteHandler(t),e._isDragging=!1,e._cursorMoved=!1}),this.view.on("key-down",function(t){t.key===v.KEYS.vertexAddKey&&e._cursorScreenPoint&&(e._vertexAddHandler(t),2===e.vertices.length&&e._drawCompleteHandler(t)),t.key===v.KEYS.drawCompleteKey&&e._cursorScreenPoint&&2===e.vertices.length&&e._drawCompleteHandler(t)}),this.view.on("drag",function(t){e._isDragging=!0,e._cursorMoved&&e.vertices.pop(),e._cursorMoved=!1})]},t.prototype._removeViewHandles=function(){this._viewHandles.removeAll()},t.prototype._addVertex=function(e,t){if(this.isDuplicateVertex(this.vertices,e))return void(this._cursorMoved=!1);this.vertices.push(e);var r=this.vertices.indexOf(e),o=new p.VertexAddEvent(this.view,t,r,this.vertices);this.emit("vertex-add",o),o.defaultPrevented&&(this._cursorMoved=!0)},t.prototype._updateCursor=function(e,t){if(this.isDuplicateVertex(this.vertices,e))return void(this._cursorMoved=!1);this.vertices.push(e);var r=this.vertices.indexOf(e),o=new p.CursorUpdateEvent(this.view,t,r,this.vertices);this.emit("cursor-update",o)},t.prototype._completeDrawing=function(e){this._cursorMoved=!1,this._isDragging=!1,this._pointerDownEvent=null,this._cursorScreenPoint=null;var t=new p.DrawCompleteEvent(e,this.vertices);this.emit("draw-complete",t),t.defaultPrevented||this._removeViewHandles()},t.prototype._vertexAddHandler=function(e){this._addVertex(this.getCoordsFromScreenPoint(this._cursorScreenPoint),e.native)},t.prototype._cursorUpdateHandler=function(e){this._updateCursor(this.getCoordsFromScreenPoint(this._cursorScreenPoint),e.native)},t.prototype._drawCompleteHandler=function(e){this._completeDrawing(e.native)},o([d.property({cast:function(e){return-1===["freehand","click"].indexOf(e)?"freehand":e}})],t.prototype,"mode",void 0),o([d.property({readOnly:!0})],t.prototype,"vertices",void 0),o([d.property()],t.prototype,"view",void 0),t=o([d.subclass("esri/views/2d/engine/markup/SegmentDrawAction")],t)}(d.declared(a,i,n))});