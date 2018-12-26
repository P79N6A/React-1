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

define(["require","exports","../../../../core/tsSupport/extendsHelper","dojo/errors/CancelError","../../../../Color","../../../../core/asyncUtils","../../../../core/lang","../../../../core/screenUtils","../../../../geometry/support/aaBoundingBox","../../../../symbols/ObjectSymbol3DLayer","./ElevationAligners","./Graphics3DObject3DGraphicLayer","./Graphics3DSymbolCommonCode","./Graphics3DSymbolLayer","./graphicUtils","./objectResourceUtils","./primitiveObjectSymbolUtils","../support/FastSymbolUpdates","../../lib/gl-matrix","../../webgl-engine/Stage","../../webgl-engine/lib/Geometry","../../webgl-engine/lib/Util","../../webgl-engine/materials/DefaultMaterial"],function(e,t,r,i,a,s,o,n,l,c,p,h,u,d,m,f,_,y,v,g,b,x,M){var S=[g.ModelContentType.MATERIAL,g.ModelContentType.TEXTURE,g.ModelContentType.GEOMETRY],P=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return r(t,e),t.prototype._prepareResources=function(){var e=this.symbol,t=this._getStageIdHint();if(!this._isPropertyDriven("size")){var r=m.validateSymbolLayerSize(this.symbol);if(r)return this._logWarning(r),void this.reject()}if(e.resource&&e.resource.href)this._prepareModelResources(e.resource.href,t);else{var i=e.resource?e.resource.primitive:"sphere";this._preparePrimitiveResources(i,t)}},t.prototype._preparePrimitiveResources=function(e,t){if(!_.isValidPrimitive(e))return this._logWarning("Unknown object symbol primitive: "+e),void this.reject();var r=this.symbol;this._geometry=new b(_.primitiveGeometryData(e),t),this._context.stage.add(g.ModelContentType.GEOMETRY,this._geometry),this._resourceBoundingBox=_.primitiveBoundingBox(e),this._resourceSize=l.size(this._resourceBoundingBox),this._symbolSize=m.computeSizeWithResourceSize(this._resourceSize,r);var i=this._getMaterialOpacity(),s={specular:[0,0,0],opacity:i,transparent:i<1||this._isPropertyDriven("opacity"),instanced:["transformation"],ambient:O,diffuse:O},c=this.symbolContainer;if("point-3d"===c.type&&c.verticalOffset){var p=c.verticalOffset,h=p.screenLength,u=p.minWorldLength,d=p.maxWorldLength;s.verticalOffset={screenLength:n.pt2px(h),minWorldLength:u||0,maxWorldLength:null!=d?d:1/0},s.castShadows=!1}if(this._context.screenSizePerspectiveEnabled&&(s.screenSizePerspective=this._context.sharedResources.screenSizePerspectiveSettings),this._isPropertyDriven("color"))s.externalColor=C;else{var f=r.material?a.toUnitRGBA(r.material.color):C;s.externalColor=f}this._fastUpdates=y.initFastSymbolUpdatesState(this._context.renderer,this._fastVisualVariableConvertOptions()),this._fastUpdates.enabled?(o.mixin(s,this._fastUpdates.materialParameters),s.instanced.push("featureAttribute")):this._hasPerInstanceColor()&&s.instanced.push("color"),s.slicePlaneEnabled=this._context.slicePlaneEnabled,this._material=new M(s,t+"_objectmat"),this._context.stage.add(g.ModelContentType.MATERIAL,this._material),this.resolve()},t.prototype._prepareModelResources=function(e,t){var r=this,a=["transformation"],c={instanced:a},p={materialParamsMixin:c,idHint:t,streamDataSupplier:this._context.streamDataSupplier};this._fastUpdates=y.initFastSymbolUpdatesState(this._context.renderer,this._fastVisualVariableConvertOptions()),this._fastUpdates.enabled?(o.mixin(p.materialParamsMixin,this._fastUpdates.materialParameters),a.push("featureAttribute")):this._hasPerInstanceColor()&&a.push("color");var h=this.symbolContainer;if("point-3d"===h.type&&h.verticalOffset){var u=h.verticalOffset,d=u.screenLength,_=u.minWorldLength,v=u.maxWorldLength;p.materialParamsMixin.verticalOffset={screenLength:n.pt2px(d),minWorldLength:_||0,maxWorldLength:null!=v?v:1/0},p.materialParamsMixin.castShadows=!1}this._symbolLoaderPromise=s.safeCast(f.fetch(e,p)),this._symbolLoaderPromise.then(function(e){if(r._symbolLoaderPromise=null,!r.isRejected()){var t=r._context,i=e.stageResources,a=t.stage,s=r.symbol.material,o=r._getExternalColorParameters(s),n=r._getMaterialOpacity(),c=r._isPropertyDriven("opacity"),p=i[g.ModelContentType.MATERIAL];e.originalMaterialOpacities=new Array(p.length),p.forEach(function(r,i){var a=r.getParameterValues();r.setParameterValues(o),e.originalMaterialOpacities[i]=a.opacity;var s=a.opacity*n,l=s<1||c||a.transparent;r.setParameterValues({opacity:s,transparent:l}),t.screenSizePerspectiveEnabled&&r.setParameterValues({screenSizePerspective:t.sharedResources.screenSizePerspectiveSettings})}),S.forEach(function(e){for(var t=i[e],r=0;t&&r<t.length;r++)a.add(e,t[r])}),r._resourceBoundingBox=f.computeBoundingBox(e),r._resourceSize=l.size(r._resourceBoundingBox),r._pivotOffset=e.pivotOffset,r._symbolSize=m.computeSizeWithResourceSize(r._resourceSize,r.symbol),r._i3sModel=e,y.updateFastSymbolUpdatesState(r._fastUpdates,r._context.renderer,r._fastVisualVariableConvertOptions())&&p.forEach(function(e){return e.setParameterValues(r._fastUpdates.materialParameters)}),r.resolve()}},function(e){if(r._symbolLoaderPromise=null,!r.isFulfilled()){if(!(e instanceof i)){var t="ObjectSymbol3DLayer failed to load";e&&e.message&&(t+=" ("+e.message+")"),r._logWarning(t)}r.reject()}})},t.prototype._forEachMaterial=function(e){if(this._i3sModel){this._i3sModel.stageResources[g.ModelContentType.MATERIAL].forEach(e)}else e(this._material)},t.prototype._getExternalColorParameters=function(e){var t={};return this._isPropertyDriven("color")?t.externalColor=C:e&&e.color?t.externalColor=a.toUnitRGBA(e.color):(t.externalColor=C,t.colorMixMode="ignore"),t},t.prototype.destroy=function(){e.prototype.destroy.call(this),this.isFulfilled()||this.reject(),this._symbolLoaderPromise&&this._symbolLoaderPromise.cancel();var t=this._context.stage;if(this._i3sModel){var r=this._i3sModel.stageResources;S.forEach(function(e){for(var i=r[e],a=0;i&&a<i.length;a++)t.remove(e,i[a].id)})}else this._material&&t.remove(g.ModelContentType.MATERIAL,this._material.id),this._geometry&&t.remove(g.ModelContentType.GEOMETRY,this._geometry.id)},t.prototype.createGraphics3DGraphic=function(e){var t=e.graphic;if(!this._validateGeometry(t.geometry))return null;var r=u.placePointOnGeometry(t.geometry);if(!r)return this._logWarning("unsupported geometry type for icon symbol: "+t.geometry.type),null;var i="graphic"+t.uid,a=this.getGraphicElevationContext(t),s=e.renderingInfo;return this._createAs3DShape(t,r,s,a,i,t.uid)},t.prototype.layerPropertyChanged=function(e,t,r){var i=this;if("opacity"===e){var a=this._isPropertyDriven("opacity");if(this._i3sModel){var s=this._getMaterialOpacity();this._i3sModel.stageResources[g.ModelContentType.MATERIAL].forEach(function(e,t){var r=i._i3sModel.originalMaterialOpacities[t],o=r*s;e.setParameterValues({opacity:o,transparent:o<1||a})})}else{var o=this._getMaterialOpacity();this._material.setParameterValues({opacity:o,transparent:o<1||a})}return!0}if("elevationInfo"===e){this._updateElevationContext();for(var n in t){var l=t[n],c=r(l);if(c){var p=l.graphic,h=this.getGraphicElevationContext(p);c.needsElevationUpdates=u.needsElevationUpdates3D(h.mode),c.elevationContext.set(h)}}return!0}return!1},t.prototype.applyRendererDiff=function(e,t,r,i){var a=this;for(var s in e.diff)switch(s){case"visualVariables":if(!y.updateFastSymbolUpdatesState(this._fastUpdates,t,this._fastVisualVariableConvertOptions()))return!1;this._forEachMaterial(function(e){return e.setParameterValues(a._fastUpdates.materialParameters)});break;default:return!1}return!0},Object.defineProperty(t.prototype,"numberOfVertices",{get:function(){return this._i3sModel?this._i3sModel.numberOfVertices:this._geometry.data.getIndices(x.VertexAttrConstants.POSITION).length},enumerable:!0,configurable:!0}),t.prototype._createAs3DShape=function(e,t,r,i,a,s){var o,n=this,l=null,c=null,d=this.getFastUpdateAttrValues(e);d&&(l={featureAttribute:d},c=function(e){return y.evaluateModelTransform(n._fastUpdates.materialParameters,d,e)}),!this._fastUpdates.enabled&&this._hasPerInstanceColor()&&(l=l||{},l.color=m.mixinColorAndOpacity(r.color,r.opacity));var f=this._context.layer.uid,_=v.mat4d.identity();if(this._applyObjectRotation(r,_),this._applyObjectRotation(this.symbol,_),this._applyObjectScale(r,_),this._applyAnchor(_),this._i3sModel){for(var b=this._i3sModel.stageResources[g.ModelContentType.GEOMETRY],x=this._i3sModel.materialsByComponent,M=new Array(b.length),S=0;S<M.length;S++)M[S]=_;o=u.createStageObjectForPoint.call(this,t,b,x,M,l,i,a,f,s,null,c)}else o=u.createStageObjectForPoint.call(this,t,[this._geometry],[[this._material]],[_],l,i,a,f,s,null,c);if(null===o)return null;if(this._fastUpdates.enabled){var P=y.getMaterialParams(this._fastUpdates.visualVariables,this._fastVisualVariableConvertOptions());this._forEachMaterial(function(e){return e.setParameterValues(P)})}o.object.setCastShadow(!0);var O=p.perObjectElevationAligner,C=new h(this,o.object,null,null,null,O,i,h.VisibilityModes.REMOVE_OBJECT);return C.alignedTerrainElevation=o.terrainElevation,C.needsElevationUpdates=u.needsElevationUpdates3D(i.mode),u.extendPointGraphicElevationContext(C,t,this._context.elevationProvider),C},t.prototype._applyObjectScale=function(e,t){if(!this._fastUpdates.enabled||!this._fastUpdates.customTransformation){var r=this._isPropertyDriven("size")&&e.size?e.size:this._symbolSize,i=m.computeObjectScale(r,this._symbolSize,this._resourceSize,this._context.renderCoordsHelper.unitInMeters);1===i[0]&&1===i[1]&&1===i[2]||v.mat4d.scale(t,i)}},t.prototype._applyObjectRotation=function(e,t){if(!(this._fastUpdates.enabled&&this._fastUpdates.customTransformation&&e instanceof c))return m.computeObjectRotation(e.heading,e.tilt,e.roll,t)},t.prototype._computeAnchor=function(){switch(this.symbol.anchor){case"center":return v.vec3d.scale(l.center(this._resourceBoundingBox),-1);case"top":var e=l.center(this._resourceBoundingBox);return[-e[0],-e[1],-this._resourceBoundingBox[5]];case"bottom":var e=l.center(this._resourceBoundingBox);return[-e[0],-e[1],-this._resourceBoundingBox[2]];case"origin":default:return this._pivotOffset?v.vec3d.scale(this._pivotOffset,-1,new Array(3)):E}},t.prototype._applyAnchor=function(e){if(!this._fastUpdates.enabled||!this._fastUpdates.customTransformation){var t=this._computeAnchor();t&&v.mat4d.translate(e,t)}},t.prototype._hasPerInstanceColor=function(){return this._isPropertyDriven("color")||this._isPropertyDriven("opacity")},t.prototype._fastVisualVariableConvertOptions=function(){var e=this._resourceBoundingBox?l.size(this._resourceBoundingBox):O,t=this._resourceBoundingBox?this._computeAnchor():E,r=this._context.renderCoordsHelper.unitInMeters,i=m.computeObjectScale(this._symbolSize,this._symbolSize,this._resourceSize,r),a=[this.symbol.tilt||0,this.symbol.roll||0,this.symbol.heading||0];return{modelSize:e,symbolSize:this._symbolSize||O,unitInMeters:r,transformation:{anchor:t,scale:i,rotation:a}}},t}(d),O=[1,1,1],C=[1,1,1,1],E=[0,0,0];return P});