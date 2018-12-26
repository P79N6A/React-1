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

define(["require","exports","../../../../core/tsSupport/declareExtendsHelper","../../../../core/tsSupport/decorateHelper","../../../../Graphic","../../../../core/Collection","../../../../core/Handles","../../../../core/Logger","../../../../core/promiseUtils","../../../../core/accessorSupport/decorators","../../../../renderers/support/renderingInfoUtils","../../../../symbols/Symbol3D","../../engine/graphics/GFXGroup","../../engine/graphics/GFXObject","../../engine/graphics/GFXSurface","../../../layers/GraphicsView"],function(e,r,t,i,o,n,s,a,p,c,h,l,d,u,g,f){var b=a.getLogger("esri.views.2d.layers.support.FeaturesView2D");return function(e){function r(){for(var r=[],t=0;t<arguments.length;t++)r[t]=arguments[t];var i=e.apply(this,r)||this;return i._handles=new s,i._backgroundGroup=new d,i._frontGroup=new d,i._frontObjects=new Map,i._backgroundObjects=new Map,i._scale=0,i.container=new g,i.layer=null,i.container.addChild(i._backgroundGroup),i.container.addChild(i._frontGroup),i.watch("graphics",function(){return i._reset()}),i.watch("renderer",function(){return i._resymbolize()}),i.watch("mapView.scale, mapView.stationary",function(){return i._applyScale()}),i}return t(r,e),r.prototype.destroy=function(){this.graphics=null,this.renderer=null},r.prototype.hitTest=function(e,r){e+=this.mapView.position[0]-window.pageXOffset,r+=this.mapView.position[1]-window.pageYOffset;var t=this.container.hitTest(e,r);return t?p.resolve(t.graphic):p.resolve()},r.prototype.graphicUpdateHandler=function(e){},r.prototype._reset=function(){var e=this;this._handles.remove("graphics"),this.graphics&&(this.graphics.forEach(this._add,this),this._handles.add(this.graphics.on("change",function(r){return e._graphicsChangeHandler(r)}),"graphics"))},r.prototype._applyScale=function(){var e=this.get("mapView.scale"),r=this.get("mapView.stationary");e!==this._scale&&r&&(this._scale=e,this._resymbolize())},r.prototype._resymbolize=function(){var e=this;this.graphics&&this.graphics.forEach(function(r){return e._resymbolizeGraphic(r)})},r.prototype._add=function(e){if(e&&!this._frontObjects.has(e)){var r=h.getRenderingInfo(e,{renderer:this.renderer,viewingMode:"map",scale:this.mapView.state.scale,resolution:this.mapView.state.resolution,spatialReference:this.mapView.spatialReference});if(r){if(r.symbol instanceof l)return void b.error("3D symbols are not supported with MapView");var t=new u;t.graphic=e,t.renderingInfo=r,this._frontObjects.set(e,t),this._frontGroup.addChild(t);var i=r.renderer&&r.renderer.backgroundFillSymbol;if(i&&t.isPolygonMarkerSymbol){var o=new u;o.graphic=e,null!=r.outlineSize?o.renderingInfo={symbol:i,size:[r.outlineSize,r.outlineSize,r.outlineSize]}:o.renderingInfo={symbol:i},this._backgroundObjects.set(e,o),this._backgroundGroup.addChild(o)}}}},r.prototype._remove=function(e){var r=this._frontObjects.get(e);if(r&&(this._frontObjects.delete(e),this._frontGroup.removeChild(r),this._backgroundObjects.has(e))){var t=this._backgroundObjects.get(e);this._backgroundObjects.delete(e),this._backgroundGroup.removeChild(t)}},r.prototype._resymbolizeGraphic=function(e){if(this._frontObjects.has(e)){var r=h.getRenderingInfo(e,{renderer:this.renderer,viewingMode:"map",scale:this.mapView.state.scale,resolution:this.mapView.state.resolution,spatialReference:this.mapView.spatialReference});if(r){if(r.symbol instanceof l)return void b.error("3D symbols are not supported with MapView");var t=this._frontObjects.get(e);t&&(t.renderingInfo=r);var i=r.renderer&&r.renderer.backgroundFillSymbol,o=this._backgroundObjects.get(e);i&&t.isPolygonMarkerSymbol?(o||(o=new u,o.graphic=e,this._backgroundObjects.set(e,o),this._backgroundGroup.addChild(o)),null!=r.outlineSize?o.renderingInfo={symbol:i,size:[r.outlineSize,r.outlineSize,r.outlineSize]}:o.renderingInfo={symbol:i}):!i&&o&&(this._backgroundObjects.delete(e),this._backgroundGroup.removeChild(o))}}},r.prototype._graphicsChangeHandler=function(e){for(var r=e.added,t=e.removed,i=0,o=r;i<o.length;i++){var n=o[i];this._add(n)}for(var s=0,a=t;s<a.length;s++){var n=a[s];this._remove(n)}},i([c.property()],r.prototype,"container",void 0),i([c.property(),c.cast(n.ofType(o))],r.prototype,"graphics",void 0),i([c.property()],r.prototype,"layer",void 0),i([c.property()],r.prototype,"mapView",void 0),r=i([c.subclass("esri.views.2d.layers.support.FeaturesView2D")],r)}(c.declared(f))});