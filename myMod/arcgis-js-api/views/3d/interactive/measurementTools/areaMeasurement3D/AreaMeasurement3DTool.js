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

define(["require","exports","../../../../../core/tsSupport/declareExtendsHelper","../../../../../core/tsSupport/decorateHelper","../../../../../core/tsSupport/restHelper","../../../../../core/Accessor","../../../../../core/accessorSupport/decorators","./AreaMeasurement3DController","./AreaMeasurement3DModel","./AreaMeasurement3DView"],function(e,t,o,r,i,a,s,l,n,p){return function(e){function t(t){var o=e.call(this)||this;return o.model=new n({sceneView:t.view}),o}return o(t,e),t.prototype.normalizeCtorArgs=function(e){e.view;return i(e,["view"])},t.prototype.initialize=function(){this._view=new p(this.model),this._controller=new l(this.model,this._view)},t.prototype.activate=function(){this._controller.activate(this.model.sceneView),this._view.show()},t.prototype.deactivate=function(){this._controller.deactivate(),this._view.hide()},t.prototype.reset=function(){this.model.reset()},t.prototype.clearMeasurement=function(){this.model.clearMeasurement()},r([s.property({constructOnly:!0})],t.prototype,"model",void 0),r([s.aliasOf("model.mode")],t.prototype,"mode",void 0),r([s.aliasOf("model.unit")],t.prototype,"unit",void 0),r([s.aliasOf("model.areaLabel")],t.prototype,"areaLabel",void 0),r([s.aliasOf("model.area")],t.prototype,"area",void 0),r([s.aliasOf("model.geodesicArea")],t.prototype,"geodesicArea",void 0),r([s.aliasOf("model.pathLengthLabel")],t.prototype,"pathLengthLabel",void 0),r([s.aliasOf("model.pathLength")],t.prototype,"pathLength",void 0),r([s.aliasOf("model.geodesicPathLength")],t.prototype,"geodesicPathLength",void 0),r([s.aliasOf("model.perimeterLengthLabel")],t.prototype,"perimeterLengthLabel",void 0),r([s.aliasOf("model.perimeterLength")],t.prototype,"perimeterLength",void 0),r([s.aliasOf("model.geodesicPerimeterLength")],t.prototype,"geodesicPerimeterLength",void 0),r([s.aliasOf("model.isMeasuring")],t.prototype,"isMeasuring",void 0),r([s.aliasOf("model.validMeasurement")],t.prototype,"validMeasurement",void 0),r([s.aliasOf("model.viewData")],t.prototype,"viewData",void 0),t=r([s.subclass("esri.views.3d.interactive.measurementTools.areaMeasurement3D.AreaMeasurement3DTool")],t)}(s.declared(a))});