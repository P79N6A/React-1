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

define(["require","exports","../../../../core/tsSupport/extendsHelper","../../../../geometry/support/aaBoundingRect","../../lib/gl-matrix","../../support/buffer/InterleavedLayout","../lib/ComponentUtils","../lib/GLMaterialTexture","../lib/Material","../lib/RenderPass","../lib/RenderSlot","../lib/screenSizePerspectiveUtils","../lib/Util","./internal/bufferWriters","./internal/MaterialUtil","../shaders/HUDPrograms"],function(e,t,r,i,n,s,o,a,c,l,f,d,v,p,u,m){function g(e,t){return void 0===t&&(t=C),e.textureIsSignedDistanceField?S(e.anchorPos,e.distanceFieldBoundingBox,t):n.vec2d.set(e.anchorPos,t),t}function h(e,t,r,i){return void 0===i&&(i=C),n.vec2d.set(e.anchorPos,i),i[0]*=-t[0],i[1]*=-t[1],i[0]+=e.screenOffset[0]*r,i[1]+=e.screenOffset[1]*r,i}function S(e,t,r){r[0]=e[0]*(t[2]-t[0])+t[0],r[1]=e[1]*(t[3]-t[1])+t[1]}function P(e){var t=e[0],r=e[1],i=e[2],n=e[3],s=e[4],o=e[5],a=e[6],c=e[7],l=e[8],f=1/Math.sqrt(t*t+r*r+i*i),d=1/Math.sqrt(n*n+s*s+o*o),v=1/Math.sqrt(a*a+c*c+l*l);return e[0]=t*f,e[1]=r*f,e[2]=i*f,e[3]=n*d,e[4]=s*d,e[5]=o*d,e[6]=a*v,e[7]=c*v,e[8]=l*v,e}var x={"bottom-left":[0,0],bottom:[.5,0],"bottom-right":[1,0],left:[0,.5],center:[.5,.5],right:[1,.5],"top-left":[0,1],top:[.5,1],"top-right":[1,1]},A=function(e){function t(t,r){var i=e.call(this,r)||this;return i._textureDirty=!1,i.params=u.copyParameters(t,N),"string"==typeof i.params.anchorPos&&(i.params.anchorPos=x[i.params.anchorPos]),i.bufferWriter=new X(i),i}return r(t,e),t.prototype.dispose=function(){},t.prototype.getParameterValues=function(){return u.copyParameters(this.params)},t.prototype.setParameterValues=function(e){for(var t in e)"textureId"===t&&v.assert(!!this.params.textureId,"Can only change texture of material that already has a texture"),this.params[t]=e[t];this.notifyDirty("matChanged")},t.prototype.getParams=function(){return this.params},t.prototype.intersect=function(e,t,r,i,s,a,c,l){if(i.isSelection&&i.enableHUDSelection&&!o.isAllHidden(t.componentVisibilities,e.data.componentOffsets)){var f=e.data,p=this.params,u=1,m=1;if(n.mat4d.toMat3(r,w),l){var h=l(E);u=h[0],m=h[5],P(w)}var S=f.getVertexAttr()[v.VertexAttrConstants.POSITION],x=f.getVertexAttr()[v.VertexAttrConstants.SIZE],A=f.getVertexAttr()[v.VertexAttrConstants.NORMAL];v.assert(S.size>=3);for(var O=i.point,y=i.camera,z=g(p),C=0;C<S.data.length/S.size;C++){var T=C*S.size;n.vec3d.set3(S.data[T],S.data[T+1],S.data[T+2],V),n.mat4d.multiplyVec3(r,V,V);var D=C*x.size;F[0]=x.data[D]*u,F[1]=x.data[D+1]*m,n.mat4d.multiplyVec3(y.viewMatrix,V);var B=C*A.size;if(n.vec3d.set3(A.data[B],A.data[B+1],A.data[B+2],U),this.applyVerticalOffsetTransformation(V,U,w,y,b),y.applyProjection(V,I),I[0]>-1){var N=Math.floor(I[0]),H=Math.floor(I[1]);d.applyPrecomputedScaleFactorVec2(F,b.factor,F);var X=N-L-(z[0]>0?F[0]*z[0]:0),_=X+F[0]+2*L,G=H-L-(z[1]>0?F[1]*z[1]:0),j=G+F[1]+2*L;if(p.textureIsSignedDistanceField){var q=p.outlineSize/2,Z=p.distanceFieldBoundingBox;X+=F[0]*Z[0],G+=F[1]*Z[1],_-=F[0]*(1-Z[2]),j-=F[1]*(1-Z[3]),X-=q,_+=q,G-=q,j+=q}if(O[0]>X&&O[0]<_&&O[1]>G&&O[1]<j){var W=i.p0,k=i.p1;n.mat4d.multiplyVec3(n.mat4d.inverse(y.viewMatrix,R),V,M),I[0]=O[0],I[1]=O[1],y.unprojectPoint(I,V);var J=n.vec3d.negate(i.getDirection(),n.vec3d.create());c(n.vec3d.dist(W,V)/n.vec3d.dist(W,k),J,-1,1,!0,M)}}}}},t.prototype.normalAndViewAngle=function(e,t,r,i){return void 0===i&&(i=D),n.mat3d.multiplyVec3(t,e,i.normal),n.mat4d.multiplyVec3(r.viewInverseTransposeMatrix,i.normal),i.cosAngle=n.vec3d.dot(T,B),i},t.prototype.updateScaleInfo=function(e,t,r){var i=this.params;i.screenSizePerspective?e.factor=d.precomputeScaleFactor(D.cosAngle,r,i.screenSizePerspective,e.factor):(e.factor.scale=1,e.factor.factor=0,e.factor.minPixelSize=0,e.factor.paddingPixels=0),i.screenSizePerspectiveAlignment?(e.scaleAlignment=d.precomputeScale(D.cosAngle,r,i.screenSizePerspectiveAlignment),e.minPixelSizeAlignment=i.screenSizePerspectiveAlignment.parameters.minPixelSize):(e.scaleAlignment=e.factor.scale,e.minPixelSizeAlignment=e.factor.minPixelSize)},t.prototype.applyVerticalOffsetTransformation=function(e,t,r,i,s,o){var a=this.params;if(16===r.length&&(r=n.mat4d.toMat3(r,w)),!a.verticalOffset||!a.verticalOffset.screenLength){if(s&&(a.screenSizePerspective||a.screenSizePerspectiveAlignment)){var c=this.normalAndViewAngle(t,r,i),l=n.vec3d.length(e);this.updateScaleInfo(s,c.cosAngle,l)}else s&&(s.factor.scale=1,s.scaleAlignment=1);return o?n.vec3d.set(e,o):e}var f=this.normalAndViewAngle(t,r,i),d=n.vec3d.length(e),v=a.screenSizePerspectiveAlignment||a.screenSizePerspective,p=u.verticalOffsetAtDistance(i,d,a.verticalOffset,f.cosAngle,v);return s&&this.updateScaleInfo(s,f.cosAngle,d),n.vec3d.add(e,n.vec3d.scale(f.normal,p),o)},t.prototype.getGLMaterials=function(){return{color:y,depthShadowMap:void 0,normal:void 0,depth:void 0,highlight:z}},t.prototype.getAllTextureIds=function(){return[this.params.textureId]},t.prototype.setTextureDirty=function(){this._textureDirty=!0},t.prototype.calculateRelativeScreenBounds=function(e,t,r){return void 0===r&&(r=i.create()),h(this.params,e,t,r),r[2]=r[0]+e[0],r[3]=r[1]+e[1],r},t.prototype.calculateAnchorPosForRendering=function(e){return g(this.params,e)},t.shouldRenderVisibilityDuringRenderPass=function(e){return e===l.MATERIAL||l.MATERIAL_HIGHLIGHT},t}(c),O=function(e){function t(t,r,i){var n=e.call(this,t,r,i,t.getParams().textureId)||this;return n.params=u.copyParameters(t.getParams()),n.selectProgram(),n.selectSlot(),n}return r(t,e),t.prototype.selectSlot=function(){this.mainSlot=this.params.drawInSecondSlot?f.HUDMATERIAL2:f.HUDMATERIAL1},t.prototype.beginSlot=function(e){return e===this.mainSlot},t.prototype.getProgram=function(){return this.program},t.prototype.updateParameters=function(){this.params=this.material.getParameterValues(),this.updateTexture(this.params.textureId),this.selectProgram(),this.selectSlot()},t.prototype.bindRender=function(e,t){var r=this.params,i=this.getProgram();this.bindTexture(e,i),i.setUniform1i("hudVisibilityTexture",1),e.bindTexture(t.hudVisibilityTexture,1),e.setActiveTexture(0),i.setUniform1f("uRenderTransparentlyOccludedHUD","occluded"===t.renderTransparentlyOccludedHUD?1:"notOccluded"===t.renderTransparentlyOccludedHUD?0:.75);var n=t.pixelRatio||1;i.setUniform4fv("overrideColor",r.color),i.setUniform1f("pixelRatio",n),r.textureIsSignedDistanceField&&(i.setUniform4fv("outlineColor",r.outlineColor),i.setUniform1f("outlineSize",r.outlineSize*n)),r.vvSizeEnabled&&(i.setUniform3fv("vvSizeMinSize",r.vvSizeMinSize),i.setUniform3fv("vvSizeMaxSize",r.vvSizeMaxSize),i.setUniform3fv("vvSizeOffset",r.vvSizeOffset),i.setUniform3fv("vvSizeFactor",r.vvSizeFactor)),r.vvColorEnabled&&(i.setUniform1fv("vvColorValues",r.vvColorValues),i.setUniform4fv("vvColorColors",r.vvColorColors)),i.setUniform2fv("texScale",r.texCoordScale),i.setUniform2f("screenOffset",2*r.screenOffset[0]*n,2*r.screenOffset[1]*n),i.setUniform2fv("anchorPos",g(r)),r.polygonOffset&&(e.setPolygonOffsetFillEnabled(!0),e.setPolygonOffset(0,-4)),e.setBlendingEnabled(!0),e.setBlendFunction(1,771)},t.prototype.bindProjection=function(e,t){this.material._textureDirty&&(this.renderTexture(e),this.material._textureDirty=!1);var r=t.cameraAboveGround?1:-1,i=this.getProgram(),n=this.params;e.bindProgram(i),i.setUniform1f("cameraGroundRelative",r),i.setUniform1f("polygonOffset",n.shaderPolygonOffset),i.setUniform4fv("viewport",t.viewport),u.bindVerticalOffset(n.verticalOffset,t,i),i.setUniformMatrix4fv("viewNormal",t.viewInvTransp),n.screenSizePerspective&&(u.bindScreenSizePerspective(n.screenSizePerspective,t,i,"screenSizePerspective"),u.bindScreenSizePerspective(n.screenSizePerspectiveAlignment||n.screenSizePerspective,t,i,"screenSizePerspectiveAlignment"))},t.prototype.releaseRender=function(e){e.setPolygonOffsetFillEnabled(!1),e.setBlendFunction(770,771),e.setBlendingEnabled(!1)},t.prototype.bindView=function(e,t){var r=t.origin,i=this.getProgram();u.bindView(r,t.view,i),u.bindCamPos(r,t.viewInvTransp,i)},t.prototype.bindInstance=function(e,t){var r=this.getProgram();r.setUniformMatrix4fv("model",t.transformation),r.setUniformMatrix4fv("modelNormal",t.transformationNormal)},t.prototype.getDrawMode=function(e){return 4},t}(a),y=function(e){function t(t,r,i){var n=e.call(this,t,r,i)||this;return n.isOcclusionSlot=!1,n}return r(t,e),t.prototype.selectProgram=function(){var e=this.params;this.programOcclusionTestPixel=this.programRep.getProgram(m.occlusionPass,{verticalOffset:!!e.verticalOffset,screenSizePerspective:!!e.screenSizePerspective,centerOffsetUnitsScreen:"screen"===e.centerOffsetUnits,slice:e.slicePlaneEnabled}),this.program=this.programRep.getProgram(m.colorPass,{occlTest:e.occlusionTest,sdf:e.textureIsSignedDistanceField,vvSize:!!e.vvSizeEnabled,vvColor:!!e.vvColorEnabled,verticalOffset:!!e.verticalOffset,screenSizePerspective:!!e.screenSizePerspective,centerOffsetUnitsScreen:"screen"===e.centerOffsetUnits,debugDrawBorder:!!e.debugDrawBorder})},t.prototype.getDrawMode=function(e){return this.isOcclusionSlot?0:4},t.prototype.release=function(e){e.setDepthFunction(513),this.isOcclusionSlot||this.releaseRender(e)},t.prototype.bind=function(e,t){this.bindProjection(e,t);var r=this.getProgram();if(e.setDepthTestEnabled(!0),e.setDepthFunction(515),this.isOcclusionSlot){r.setUniform4f("color",1,1,1,1);var i=t.pixelRatio||1;r.setUniform1f("pixelRatio",i)}else this.bindRender(e,t),this.bindTexture(e,r)},t.prototype.bindView=function(t,r){e.prototype.bindView.call(this,t,r);var i=this.getProgram(),n=this.params;this.isOcclusionSlot&&n.slicePlaneEnabled&&u.bindSlicePlane(r.origin,r.slicePlane,i)},t.prototype.getProgram=function(){return this.isOcclusionSlot?this.programOcclusionTestPixel:this.program},t.prototype.getPrograms=function(){return[this.programOcclusionTestPixel,this.program]},t.prototype.beginSlot=function(e){return this.params.occlusionTest?(this.isOcclusionSlot=e===f.OCCLUSION_PIXELS,e===f.OCCLUSION_PIXELS||e===this.mainSlot):(this.isOcclusionSlot=!1,e===this.mainSlot)},t}(O),z=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return r(t,e),t.prototype.selectProgram=function(){var e=this.params;this.program=this.programRep.getProgram(m.highlightPass,{occlTest:e.occlusionTest,sdf:e.textureIsSignedDistanceField,vvSize:!!e.vvSizeEnabled,vvColor:!!e.vvColorEnabled,verticalOffset:!!e.verticalOffset,screenSizePerspective:!!e.screenSizePerspective,centerOffsetUnitsScreen:"screen"===e.centerOffsetUnits,binaryHighlightOcclusion:e.binaryHighlightOcclusion})},t.prototype.bind=function(e,t){this.bindProjection(e,t),this.bindRender(e,t)},t.prototype.release=function(e){this.releaseRender(e)},t}(O),b={factor:{scale:0,factor:0,minPixelSize:0,paddingPixels:0},scaleAlignment:0,minPixelSizeAlignment:0},C=[0,0],V=n.vec3d.create(),U=n.vec3d.create(),I=n.vec3d.create(),T=n.vec3d.create(),M=n.vec3d.create(),w=n.mat3d.create(),R=n.mat4d.create(),D={normal:T,cosAngle:0},E=n.mat4d.create();n.mat4d.identity(E);var L=1,F=[0,0],B=[0,0,1],N={texCoordScale:[1,1],occlusionTest:!0,binaryHighlightOcclusion:!0,drawInSecondSlot:!1,color:[1,1,1,1],outlineColor:[1,1,1,1],outlineSize:0,textureIsSignedDistanceField:!1,distanceFieldBoundingBox:null,vvSizeEnabled:!1,vvSizeMinSize:[1,1,1],vvSizeMaxSize:[100,100,100],vvSizeOffset:[0,0,0],vvSizeFactor:[1,1,1],vvColorEnabled:!1,vvColorValues:[0,0,0,0,0,0,0,0],vvColorColors:[1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],screenOffset:[0,0],verticalOffset:null,screenSizePerspective:null,screenSizePerspectiveAlignment:null,slicePlaneEnabled:!1,anchorPos:x.center,shaderPolygonOffset:1e-5,polygonOffset:!1,textureId:null,centerOffsetUnits:"world",debugDrawBorder:!1},H=s.newLayout().vec3f(v.VertexAttrConstants.POSITION).vec3f(v.VertexAttrConstants.NORMAL).vec2f(v.VertexAttrConstants.UV0).vec4u8(v.VertexAttrConstants.COLOR).vec2f(v.VertexAttrConstants.SIZE).vec4f(v.VertexAttrConstants.AUXPOS1).vec4f(v.VertexAttrConstants.AUXPOS2),X=function(){function e(e){this.material=e,this.vertexBufferLayout=H}return e.prototype.allocate=function(e){return this.vertexBufferLayout.createBuffer(e)},e.prototype.elementCount=function(e){return 6*e.indices[v.VertexAttrConstants.POSITION].length},e.prototype.write=function(e,t,r,i,n){var s=this.material.getParameterValues();p.writePosition(t.indices[v.VertexAttrConstants.POSITION],t.vertexAttr[v.VertexAttrConstants.POSITION].data,e.transformation,i.position,n,6),p.writeNormal(t.indices[v.VertexAttrConstants.NORMAL],t.vertexAttr[v.VertexAttrConstants.NORMAL].data,e.invTranspTransformation,i.normal,n,6);var o=t.vertexAttr[v.VertexAttrConstants.UV0].data,a=void 0,c=void 0,l=void 0,f=void 0;null==o||o.length<4?(a=0,c=0,l=s.texCoordScale[0],f=s.texCoordScale[1]):(a=o[0],c=o[1],l=o[2],f=o[3]),l=Math.min(1.99999,l+1),f=Math.min(1.99999,f+1);for(var d=t.indices[v.VertexAttrConstants.POSITION].length,u=i.uv0,m=n,g=0;g<d;++g)u.set(m,0,a),u.set(m,1,c),m+=1,u.set(m,0,l),u.set(m,1,c),m+=1,u.set(m,0,l),u.set(m,1,f),m+=1,u.set(m,0,l),u.set(m,1,f),m+=1,u.set(m,0,a),u.set(m,1,f),m+=1,u.set(m,0,a),u.set(m,1,c),m+=1;p.writeColor(t.indices[v.VertexAttrConstants.COLOR],t.vertexAttr[v.VertexAttrConstants.COLOR].data,4,i.color,n,6);for(var h=t.indices[v.VertexAttrConstants.SIZE],S=t.vertexAttr[v.VertexAttrConstants.SIZE].data,P=h.length,x=i.size,m=n,g=0;g<P;++g)for(var A=S[2*h[g]],O=S[2*h[g]+1],y=0;y<6;++y)x.set(m,0,A),x.set(m,1,O),m+=1;t.indices[v.VertexAttrConstants.AUXPOS1]&&t.vertexAttr[v.VertexAttrConstants.AUXPOS1]&&p.writeBufferVec4(t.indices[v.VertexAttrConstants.AUXPOS1],t.vertexAttr[v.VertexAttrConstants.AUXPOS1].data,i.auxpos1,n,6),t.indices[v.VertexAttrConstants.AUXPOS2]&&t.vertexAttr[v.VertexAttrConstants.AUXPOS2]&&p.writeBufferVec4(t.indices[v.VertexAttrConstants.AUXPOS2],t.vertexAttr[v.VertexAttrConstants.AUXPOS2].data,i.auxpos2,n,6)},e}();return A});