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

define(["require","exports","../lib/gl-matrix","../webgl-engine/lib/Camera"],function(e,r,t,i){return function(){function e(e){this.view=e,this._renderTargetHelper=null,this.camera=new i,this.sunLight={direction:t.vec3d.create(),diffuse:{color:t.vec3d.create(),intensity:1},ambient:{color:t.vec3d.create(),intensity:1}}}return e.prototype.resetWebGLState=function(){null!=this.rctx&&(this.rctx.enforceState(),this._renderTargetHelper&&this._renderTargetHelper.bindFramebuffer())},e.prototype.bindRenderTarget=function(){if(this._renderTargetHelper){var e=this._renderTargetHelper.framebuffer;e.initialize(),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,e.glName)}},e}()});