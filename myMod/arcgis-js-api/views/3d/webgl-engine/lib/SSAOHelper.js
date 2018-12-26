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

define(["require","exports","../../../../core/Logger","../../lib/gl-matrix","../../support/imageUtils","./DefaultVertexAttributeLocations","./DefaultVertexBufferLayouts","./glUtil3D","./Util","../shaders/MiscPrograms","../shaders/SSAOPrograms","../../../webgl/BufferObject","../../../webgl/FramebufferObject","../../../webgl/Texture","../../../webgl/Util","../../../webgl/VertexArrayObject"],function(e,t,r,i,s,o,a,n,h,u,l,p,f,_,d,m){var c=r.getLogger("esri.views.3d.webgl-engine.lib.SSAOHelper"),b=function(){function t(e,t,r){this._enabled=!1,this._BLUR_F=2,this._attenuation=.5,this._radius=3,this._samples=16,this._viewportToRestore=i.vec4d.create(),this._rctx=t,this._programRep=e,this._requestRender=r,this._emptyTexture=n.createEmptyTexture(t)}return t.prototype.dispose=function(){this._emptyTexture.dispose(),this._emptyTexture=null},Object.defineProperty(t.prototype,"isSupported",{get:function(){var e=this._rctx,t=-1!==e.parameters.versionString.indexOf("WebGL 0.93"),r=-1!==e.parameters.versionString.indexOf("WebGL 0.94");return!(t||r)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"enabled",{get:function(){return this._enabled},set:function(e){e?this.enable():this.disable()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"attenuation",{get:function(){return this._attenuation},set:function(e){this._attenuation=e},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"radius",{get:function(){return this._radius},set:function(e){this._radius=e},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"filterRadius",{get:function(){return 4},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"samples",{get:function(){return this._samples},set:function(e){this._samples=e,this._enabled&&this.selectPrograms()},enumerable:!0,configurable:!0}),t.prototype.computeSSAO=function(e,t,r,s){if(this._noiseTexture){h.assert(this.enabled);var o=this._rctx,a=r.width,u=r.height,l=a/this._BLUR_F,p=u/this._BLUR_F;this._ssaoFBO.resize(a,u),this._blur0FBO.resize(l,p),this._blur1FBO.resize(l,p);var f=1*a,_=1*u;o.bindFramebuffer(this._ssaoFBO),i.vec4d.set(e.fullViewport,this._viewportToRestore),o.setViewport(0,0,a,u);var m=this._ssaoProgram,c=this._blurProgram;m.setUniform2f("rnmScale",a/this._noiseTexture.descriptor.width,u/this._noiseTexture.descriptor.height),m.setUniform3fv("pSphere",this._samples<=8?this._data.random8:this._samples<=16?this._data.random16:this._samples<=32?this._data.random32:this._data.random64),o.bindProgram(m);var b=this._data.minDiscrepancy,O=this._samples<b.length?b[this._samples]:5779;m.setUniform1f("numSpiralTurns",O);var v=x,T=g;h.inverseProjectionInfo(e.projectionMatrix,e.fullWidth,e.fullHeight,v,T),m.setUniform4fv("projInfo",v),m.setUniform2fv("zScale",T),m.setUniform2f("nearFar",e.near,e.far);var y=1/e.computePixelSizeAtDist(1);m.setUniform1f("projScale",1*y),m.setUniform2f("screenDimensions",f,_);var w=2*this._radius,U=i.vec3d.dist(e.eye,e.center);w=20*e.computePixelSizeAtDist(U),w=Math.max(.1,w),m.setUniform1f("radius",w),m.setUniform1f("intensity",4*this._attenuation/Math.pow(w,6)),m.setUniform1i("rnm",0),m.setUniform1i("normalMap",1),m.setUniform1i("depthMap",2),o.bindTexture(this._noiseTexture,0),o.bindTexture(s.colorTexture,1),o.bindTexture(r.colorTexture,2);var F=n.createQuadVAO(this._rctx);o.bindVAO(F),o.drawArrays(5,0,d.vertexCount(F,"geometry"));o.bindTexture(this._ssaoFBO.colorTexture,0),o.setViewport(0,0,f/this._BLUR_F,_/this._BLUR_F),o.bindFramebuffer(this._blur0FBO),c.setUniform2f("screenDimensions",f,_),c.setUniform1i("tex",0),c.setUniform1i("normalMap",1),c.setUniform1i("depthMap",2),c.setUniform2f("blurSize",0,1*this._BLUR_F/_),c.setUniform1i("radius",4),c.setUniform1f("g_BlurFalloff",.08),c.setUniform2f("nearFar",e.near,e.far),U>5e4&&(y=Math.max(0,y-(U-5e4))),c.setUniform1f("projScale",y),c.setUniform2f("zScale",1,0),o.drawArrays(5,0,d.vertexCount(F,"geometry")),c.setUniform2f("blurSize",1*this._BLUR_F/f,0),o.bindFramebuffer(this._blur1FBO),o.bindTexture(this._blur0FBO.colorTexture,0),o.drawArrays(5,0,d.vertexCount(F,"geometry")),o.bindFramebuffer(t),o.setViewport(this._viewportToRestore[0],this._viewportToRestore[1],this._viewportToRestore[2],this._viewportToRestore[3])}},t.prototype.setUniforms=function(e){var t=this.enabled&&this._noiseTexture,r=this._rctx;r.bindTexture(t?this._blur1FBO.colorTexture:this._emptyTexture,6),r.setActiveTexture(0),e.setUniform1i("ssaoTex",6),t?e.setUniform4f("viewportPixelSz",this._viewportToRestore[0],this._viewportToRestore[1],1/this._ssaoFBO.width,1/this._ssaoFBO.height):e.setUniform4f("viewportPixelSz",-1,-1,-1,-1)},t.prototype.bindAll=function(e){for(var t=e.getProgramsUsingUniform("viewportPixelSz"),r=0;r<t.length;r++)this.setUniforms(t[r])},t.prototype.drawQuad=function(e){h.assert(this.enabled);var t=this._showDepthProgram;this._debugQuadVAO||(this._debugQuadVAO=new m(this._rctx,o.Default3D,{geometry:a.Pos2Tex},{geometry:p.createVertex(this._rctx,35044,O)}));var r=this._rctx;r.setDepthTestEnabled(!1),t.setUniformMatrix4fv("proj",new Float32Array(e)),t.setUniform1i("depthTex",0),r.bindTexture(this._ssaoFBO.colorTexture,0),r.bindVAO(this._debugQuadVAO),r.drawArrays(5,0,d.vertexCount(this._debugQuadVAO,"geometry")),r.setDepthTestEnabled(!0)},t.prototype.selectPrograms=function(){var e=this._samples<=8?8:this._samples<=16?16:this._samples<=32?32:64;this._ssaoProgram=this._programRep.getProgram(l.ssaoPass,{samples:e}),this._blurProgram=this._programRep.getProgram(l.blurPass,{radius:4}),this._showDepthProgram=this._programRep.getProgram(u.showDepth)},t.prototype.enable=function(){var e=this;if(!this.enabled){if(!this.isSupported)return void c.warn("SSAO is not supported for this browser or hardware");this._enabled=!0,this.loadResources(function(){e._enabled&&e.initialize()})}},t.prototype.loadResources=function(t){var r=this;this._data?t():e(["./SSAOHelperData"],function(e){r._data=e,t()})},t.prototype.initialize=function(){var e=this,t={target:3553,pixelFormat:6408,dataType:5121,samplingMode:9729,wrapMode:33071,width:0,height:0},r={colorTarget:0,depthStencilTarget:0};this._ssaoFBO=f.createWithAttachments(this._rctx,t,r),this._blur0FBO=f.createWithAttachments(this._rctx,t,r),this._blur1FBO=f.createWithAttachments(this._rctx,t,r),s.requestImage(this._data.noiseTexture).then(function(t){e._enabled&&(e._noiseTexture=new _(e._rctx,{target:3553,pixelFormat:6408,dataType:5121,hasMipmap:!0,width:t.width,height:t.height},t),e._requestRender())}),this.selectPrograms()},t.prototype.disable=function(){this.enabled&&(this._enabled=!1,this._quadVAO&&(this._quadVAO.dispose(!0),this._quadVAO=null),this._noiseTexture&&(this._noiseTexture.dispose(),this._noiseTexture=null),this._blur1FBO&&(this._blur1FBO.dispose(),this._blur1FBO=null),this._blur0FBO&&(this._blur0FBO.dispose(),this._blur0FBO=null),this._ssaoFBO&&(this._ssaoFBO.dispose(),this._ssaoFBO=null))},t}(),g=i.vec2d.create(),x=i.vec4d.create(),O=new Float32Array([0,0,0,0,512,0,1,0,0,512,0,1,512,512,1,1]);return b});