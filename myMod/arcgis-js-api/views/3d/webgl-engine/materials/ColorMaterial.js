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

define(["require","exports","../../../../core/tsSupport/extendsHelper","../../support/buffer/InterleavedLayout","../lib/GLMaterial","../lib/Material","../lib/RenderSlot","../lib/Util","./internal/bufferWriters","./internal/MaterialUtil","../shaders/ColorPrograms"],function(t,e,r,o,n,a,i,s,l,p,u){var f=function(t){function e(e,r){var o=t.call(this,r)||this;return o.supportsEdges=!0,o.bufferWriter=new d,o.params=p.copyParameters(e,g),o}return r(e,t),e.prototype.getParams=function(){return this.params},e.prototype.getParameterValues=function(){return p.copyParameters(this.params)},e.prototype.setColor=function(t){this.params.color=t,this.notifyDirty("matChanged")},e.prototype.getColor=function(){return this.params.color},e.prototype.setTransparent=function(t){this.params.transparent=t,this.notifyDirty("matChanged")},e.prototype.getTransparent=function(){return this.params.transparent},e.prototype.intersect=function(t,e,r,o,n,a,i,s){p.intersectTriangleGeometry(t,e,r,o,n,a,i)},e.prototype.getGLMaterials=function(){return{color:c,depthShadowMap:void 0,normal:void 0,depth:void 0,highlight:m}},e.prototype.getAllTextureIds=function(){return[]},e}(a),c=function(t){function e(e,r,o){var n=t.call(this,e,r)||this;return n.updateParameters(),n}return r(e,t),e.prototype.updateParameters=function(){this.params=this.material.getParameterValues(),this.selectProgram()},e.prototype.selectProgram=function(){this.program=this.programRep.getProgram(u.colorPass,{vertexColors:this.params.vertexColors,slice:this.params.slicePlaneEnabled})},e.prototype.beginSlot=function(t){return t===(this.params.color[3]<1?i.TRANSPARENT_MATERIAL:i.OPAQUE_MATERIAL)},e.prototype.getProgram=function(){return this.program},e.prototype.bind=function(t,e){var r=this.program,o=this.params;t.bindProgram(r),r.setUniform4fv("eColor",o.color),t.setFaceCullingEnabled(!1),o.polygonOffset&&(t.setPolygonOffsetFillEnabled(!0),t.setPolygonOffset(1,1)),o.transparent&&(t.setBlendingEnabled(!0),t.setBlendFunctionSeparate(770,771,1,771)),t.setDepthTestEnabled(!0)},e.prototype.release=function(t){var e=this.params;t.setPolygonOffsetFillEnabled(!1),e.transparent&&t.setBlendingEnabled(!1)},e.prototype.bindView=function(t,e){var r=this.program,o=this.params;p.bindView(e.origin,e.view,r),o.slicePlaneEnabled&&p.bindSlicePlane(e.origin,e.slicePlane,r)},e.prototype.bindInstance=function(t,e){this.program.setUniformMatrix4fv("model",e.transformation)},e.prototype.getDrawMode=function(t){return 4},e}(n),m=function(t){function e(e,r,o){var n=t.call(this,e,r)||this;return n.updateParameters(),n}return r(e,t),e.prototype.updateParameters=function(){this.params=this.material.getParameterValues(),this.selectProgram()},e.prototype.selectProgram=function(){this.program=this.programRep.getProgram(u.colorPass,{vertexColors:this.params.vertexColors,slice:this.params.slicePlaneEnabled})},e.prototype.beginSlot=function(t){return t===i.OPAQUE_MATERIAL},e.prototype.getProgram=function(){return this.program},e.prototype.bind=function(t,e){var r=this.program,o=this.params;t.bindProgram(r),r.setUniform4fv("eColor",o.color),t.setFaceCullingEnabled(!1),o.polygonOffset&&(t.setPolygonOffsetFillEnabled(!0),t.setPolygonOffset(1,1))},e.prototype.release=function(t){t.setPolygonOffsetFillEnabled(!1)},e.prototype.bindView=function(t,e){var r=this.program,o=this.params;p.bindView(e.origin,e.view,r),o.slicePlaneEnabled&&p.bindSlicePlane(e.origin,e.slicePlane,r)},e.prototype.bindInstance=function(t,e){this.program.setUniformMatrix4fv("model",e.transformation)},e.prototype.getDrawMode=function(t){return 4},e}(n),g={color:[1,1,1,1],transparent:!1,vertexColors:!1,polygonOffset:!1,slicePlaneEnabled:!1},h=o.newLayout().vec3f(s.VertexAttrConstants.POSITION).vec4u8(s.VertexAttrConstants.COLOR),d=function(){function t(){this.vertexBufferLayout=h}return t.prototype.allocate=function(t){return h.createBuffer(t)},t.prototype.elementCount=function(t){return t.indices[s.VertexAttrConstants.POSITION].length},t.prototype.write=function(t,e,r,o,n){l.writeDefaultAttributes(e,r,h,t.transformation,t.invTranspTransformation,o,n)},t}();return f});