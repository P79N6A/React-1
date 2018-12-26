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

define(["require","exports","../../../../../core/tsSupport/extendsHelper","../../../../../geometry/support/aaBoundingBox","../../../lib/gl-matrix","../../../support/buffer/glUtil","../Camera","../DefaultVertexAttributeLocations","../RenderSlot","./InstanceData","./InstanceOctree","./LevelSelector","./RenderInstanceData","./utils","../../materials/DefaultMaterial","../../../../webgl/BufferObject","../../../../webgl/Util","../../../../webgl/VertexArrayObject"],function(e,t,n,a,r,i,s,o,c,l,u,d,h,f,p,g,v,m){function y(e,t,n,a){f.encodeDoubleVec3(e.modelOrigin,t,n.modelOriginHi,n.modelOriginLo,a),e.model.getMat(t,x),n.model.setMat(a,x),e.modelNormal.getMat(t,x),n.modelNormal.setMat(a,x),e.color&&n.color&&(e.color.getVec(t,C),n.color.setVec(a,C)),e.featureAttribute&&n.featureAttribute&&(e.featureAttribute.getVec(t,C),n.featureAttribute.setVec(a,C))}Object.defineProperty(t,"__esModule",{value:!0});var b=v.assert,_=function(){function e(e,t){this.glMaterials={};var n=e.rctx,a=t.geometry,r=t.material,s=a.data.toRenderData();this.materialRep=e.materialRep,r.setParameterValues({instancedDoublePrecision:!0});var c=r.bufferWriter,l=c.vertexBufferLayout,u=c.elementCount(s),d=c.allocate(u);c.write({},s,void 0,d,0),this.geometry=a,this.material=r,this.glMaterials=f.acquireGLMaterials(r,this.materialRep),this.vertexBufferLayout=l,this.vbo=g.createVertex(n,35044,d.buffer),this.vao=new m(n,o.Default3D,{geometry:i.glLayout(l)},{geometry:this.vbo}),this.vertexCount=u}return e.prototype.destroy=function(){f.releaseGLMaterials(this.material,this.materialRep),this.vbo.dispose(),this.vao.dispose()},Object.defineProperty(e.prototype,"boundingInfo",{get:function(){return this.geometry.boundingInfo},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"triangleCount",{get:function(){return this.vertexCount/3},enumerable:!0,configurable:!0}),e.prototype.intersect=function(e,t,n,a,r){var i=this.geometry.id,s=a.toString();this.material.intersect(this.geometry,null,A,e,t,n,function(t,n,o,c,l,u){if(t>=0){var d={type:"external",metadata:r(a)};(null==e.minResult.priority||c>=e.minResult.priority)&&(null==e.minResult.dist||t<e.minResult.dist)&&(e.minResult.set(d,s,t,n,c,null,i,o),e.minResult.setIntersector("LodRenderer")),(null==e.maxResult.priority||c>=e.maxResult.priority)&&(null==e.maxResult.dist||t>e.maxResult.dist)&&(e.maxResult.set(d,s,t,n,c,null,i,o),e.minResult.setIntersector("LodRenderer"))}},null)},e}();t.LodComponentData=_;var I=function(){function e(e,t){var n=this;this.components=[],this.minScreenSpaceRadius=t.minScreenSpaceRadius,t.components.forEach(function(t){n.components.push(new _(e,t))})}return e.prototype.destroy=function(){this.components.forEach(function(e){e.destroy()})},e.prototype.intersect=function(e,t,n,a,r){this.components.forEach(function(i){i.intersect(e,t,n,a,r)})},Object.defineProperty(e.prototype,"boundingBox",{get:function(){if(!this._boundingBox){var e=a.empty();this.components.forEach(function(t){a.expand(e,t.boundingInfo.bbMin),a.expand(e,t.boundingInfo.bbMax)}),this._boundingBox=e}return this._boundingBox},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"boundingSphere",{get:function(){if(!this._boundingSphere){var e=this.boundingBox,t=r.vec3d.create();a.center(e,t),this._boundingSphere={center:t,radius:.5*a.diameter(e)}}return this._boundingSphere},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"triangleCount",{get:function(){return this.components.reduce(function(e,t){return e+t.triangleCount},0)},enumerable:!0,configurable:!0}),e}();t.LodLevelData=I;var R=function(){function e(e,n,a){var r=this;this._levels=[],this._renderInstanceData=[],this._highlightRenderInstanceData=[],this._instanceIndex=0,this._lastCamera=new s,this._updateCyclesWithStaticCamera=-1,this._needFullCycle=!1,this.didRender=!1,this._symbol=e,this._optionalFields=n,this._instanceToMetadata=a,this._instanceBufferLayout=p.getInstanceBufferLayout({instancedDoublePrecision:!0,instanced:n}),this._glInstanceBufferLayout=i.glLayout(this._instanceBufferLayout,{divisor:1}),this._instanceData=new l.InstanceData(this._optionalFields),this._instanceData.on("instance-added",function(e){r.resetUpdateCycle()}),this._instanceData.on("instance-removed",function(e){r.resetUpdateCycle()}),this._instanceData.on("instance-transform-changed",function(e){r.resetUpdateCycle()}),this._instanceData.on("instance-visibility-changed",function(e){r.resetUpdateCycle(),r.requestFullCycle()}),this._instanceData.on("instance-highlight-changed",function(e){r.resetUpdateCycle(),r.requestFullCycle()}),t.lodRenderers.push(this),window.lodRenderer=this}return e.prototype.destroy=function(){t.lodRenderers.splice(t.lodRenderers.indexOf(this),1)},Object.defineProperty(e.prototype,"baseBoundingBox",{get:function(){return this._levels[0].boundingBox},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"baseBoundingSphere",{get:function(){return this._levels[0].boundingSphere},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"instanceData",{get:function(){return this._instanceData},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"memoryUsage",{get:function(){var e={cpu:0,gpu:0};return this._renderInstanceData.forEach(function(t){var n=t.memoryUsage;e.cpu+=n.cpu,e.gpu+=n.gpu}),this._highlightRenderInstanceData.forEach(function(t){var n=t.memoryUsage;e.cpu+=n.cpu,e.gpu+=n.gpu}),e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"renderStats",{get:function(){var e=this,t=this._instanceData.size,n=[];return this._levels.forEach(function(t,a){var r=e._renderInstanceData[a],i=e._highlightRenderInstanceData[a],s=r.size+i.size,o=t.triangleCount;n.push({renderedInstances:s,renderedTriangles:s*o,trianglesPerInstance:o})}),{totalInstances:t,renderedInstances:n.reduce(function(e,t){return e+t.renderedInstances},0),renderedTriangles:n.reduce(function(e,t){return e+t.renderedTriangles},0),levels:n}},enumerable:!0,configurable:!0}),e.prototype.initializeRenderContext=function(e){var t=this,n=e.rctx;this._symbol.levels.forEach(function(a){t._levels.push(new I(e,a)),t._renderInstanceData.push(new h.RenderInstanceData(n,t._optionalFields,t._instanceBufferLayout)),t._highlightRenderInstanceData.push(new h.RenderInstanceData(n,t._optionalFields,t._instanceBufferLayout))});var a=this._levels[0].boundingSphere.radius,r=this._levels.map(function(e){return e.minScreenSpaceRadius});this._levelSelector=new d.LevelSelector(a,r),this._octree=new u.InstanceOctree(this._instanceData,this._levels[0].boundingSphere)},e.prototype.uninitializeRenderContext=function(e){this._levels.forEach(function(e){e.destroy()}),this._renderInstanceData.forEach(function(e){e.destroy()}),this._highlightRenderInstanceData.forEach(function(e){e.destroy()})},Object.defineProperty(e.prototype,"slots",{get:function(){return[c.OPAQUE_EXTERNAL,c.TRANSPARENT_EXTERNAL]},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"needsHighlight",{get:function(){return this._highlightRenderInstanceData.reduce(function(e,t){return e+t.size},0)>0},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"needsRender",{get:function(){return this._updateCyclesWithStaticCamera<1},enumerable:!0,configurable:!0}),e.prototype.resetNeedsRender=function(){this.didRender&&(this.didRender=!1)},e.prototype.prepareRender=function(e){var t=e.equivalent(this._lastCamera);this._lastCamera.copyFrom(e),t||this.resetUpdateCycle();var n=this._needFullCycle?this._instanceData.size:2e3;this._needFullCycle=!1,this.updateInstances(e,n)},e.prototype.render=function(e){var t=e.rctx,n=e.slot===c.OPAQUE_EXTERNAL?c.OPAQUE_MATERIAL:e.slot===c.TRANSPARENT_EXTERNAL?c.TRANSPARENT_MATERIAL:null;if(n){var a={view:e.camera.viewMatrix,proj:e.camera.projectionMatrix,origin:[0,0,0],viewInvTransp:e.camera.viewInverseTransposeMatrix,lightingData:e.lightingData,viewport:e.camera.viewport,fovY:e.camera.fovY,nearFar:[e.camera.near,e.camera.far],framebufferTex:e.offscreenRenderingHelper?e.offscreenRenderingHelper.colorTexture:null,shadowMap:e.shadowMap,shadowMappingEnabled:!!e.shadowMap&&e.shadowMap.enabled,ssaoEnabled:!!e.ssaoHelper&&e.ssaoHelper.enabled,pixelRatio:e.pixelRatio,cameraAboveGround:e.camera.aboveGround,hudVisibilityTexture:e.offscreenRenderingHelper?e.offscreenRenderingHelper.hudVisibilityTexture:null};if(t.bindVAO(),e.isHighlightPass)for(var r=0;r<this._levels.length;++r)this.renderLevel(e,n,a,this._highlightRenderInstanceData[r],this._levels[r]);else for(var r=0;r<this._levels.length;++r)this.renderLevel(e,n,a,this._renderInstanceData[r],this._levels[r]);return!0}},e.prototype.intersect=function(e,t,n,a){var i=this,s=r.vec3d.create();r.vec3d.subtract(n,t,s),this._octree.forEachAlongRay(t,s,function(a){i._instanceData.getTranslation(a,D),i._instanceData.getModel(a,x),r.vec3d.subtract(t,D,S),r.vec3d.subtract(n,D,E),r.mat3d.inverse(x,x),r.mat3d.multiplyVec3(x,S),r.mat3d.multiplyVec3(x,E);var s=i._instanceData.getState(a),o=i._instanceData.getLodLevel(a);b(s&l.StateFlags.ACTIVE,"invalid instance state"),b(o>=0&&o<i._levels.length,"invaid lod level"),i._levels[o].intersect(e,S,E,a,i._instanceToMetadata)})},e.prototype.queryDepthRange=function(e){return this.queryDepthRangeOctree(e)},e.prototype.queryDepthRangeOctree=function(e){var t=e.eye,n=e.viewForward,a=this._octree.findClosest(n,"front-to-back",e.frustumPlanes),i=this._octree.findClosest(n,"back-to-front",e.frustumPlanes);if(null!=a&&null!=i){this._instanceData.view.boundingSphere.getVec(a,C),r.vec3d.subtract(C,t);var s=r.vec3d.dot(C,n)-C[3];this._instanceData.view.boundingSphere.getVec(i,C),r.vec3d.subtract(C,t);var o=r.vec3d.dot(C,n)+C[3];return{near:Math.max(e.near,s),far:Math.min(e.far,o)}}return{near:1/0,far:-1/0}},e.prototype.updateInstances=function(e,t){var n=this._levelSelector;n.updateCamera(e),this._renderInstanceData.forEach(function(e){e.beginUpdate()}),this._highlightRenderInstanceData.forEach(function(e){e.beginUpdate()});var a=this._instanceData,r=this._instanceData.view,i=a.size,s=a.capacity,o=this._instanceIndex;t=Math.min(i,t);for(var c=0;c<t;++c){0===o&&this.startUpdateCycle();var u=r.state.get(o),d=0;if(u&l.StateFlags.ALLOCATED){var h=r.lodLevel.get(o);if(u&l.StateFlags.ACTIVE&&this._renderInstanceData[h].freeTail(),u&l.StateFlags.HIGHLIGHT_ACTIVE&&this._highlightRenderInstanceData[h].freeTail(),u&l.StateFlags.REMOVE)a.notifyRemoved(o);else if(u&l.StateFlags.VISIBLE){r.modelOrigin.getVec(o,D);var f=n.selectLevel(D,r.modelScaleFactor.get(o));if(d=u&~(l.StateFlags.ACTIVE|l.StateFlags.HIGHLIGHT_ACTIVE|l.StateFlags.TRANSFORM_CHANGED),f>=0){var p=this._renderInstanceData[f],g=p.allocateHead();if(y(r,o,p.view,g),d|=l.StateFlags.ACTIVE,u&l.StateFlags.HIGHLIGHT){var v=this._highlightRenderInstanceData[f],m=v.allocateHead();y(r,o,v.view,m),d|=l.StateFlags.HIGHLIGHT_ACTIVE}}r.state.set(o,d),r.lodLevel.set(o,f)}else d=u&~(l.StateFlags.ACTIVE|l.StateFlags.HIGHLIGHT_ACTIVE|l.StateFlags.TRANSFORM_CHANGED),r.state.set(o,d);var b=!!(u&l.StateFlags.ACTIVE),_=!!(d&l.StateFlags.ACTIVE);!b&&_?this._octree.addInstance(o):b&&!_?this._octree.removeInstance(o):b&&_&&u&l.StateFlags.TRANSFORM_CHANGED&&(this._octree.removeInstance(o),this._octree.addInstance(o)),o=(o+1)%s}else o=(o+1)%s,t++}this._instanceIndex=o,this._renderInstanceData.forEach(function(e){e.endUpdate()}),this._highlightRenderInstanceData.forEach(function(e){e.endUpdate()})},e.prototype.startUpdateCycle=function(){this._updateCyclesWithStaticCamera++,this._renderInstanceData.forEach(function(e){e.startUpdateCylce()}),this._highlightRenderInstanceData.forEach(function(e){e.startUpdateCylce()})},e.prototype.resetUpdateCycle=function(){this._updateCyclesWithStaticCamera=-1},e.prototype.requestFullCycle=function(){this._needFullCycle=!0},e.prototype.renderLevel=function(e,t,n,a,r){var i=this;r.components.forEach(function(r){i.renderComponent(e,t,n,a,r)})},e.prototype.renderComponent=function(e,t,n,a,r){var i=r.glMaterials[e.pass];if(i&&i.beginSlot(t)&&i.isVisible&&0!==a.size){var s=e.rctx,l=s.capabilities.instancing,u=i.getDrawMode(s);n.origin=[0,0,0],t===c.STENCIL_MATERIAL&&(e.stencilRenderingHelper.enabled=!0,e.stencilRenderingHelper.prepareStencilWritePass()),i.bind(s,n),s.bindVAO(r.vao);var d=i.getProgram();if(v.assertCompatibleVertexAttributeLocations(r.vao,d),e.isHighlightPass){var h=e.offscreenRenderingHelper?e.offscreenRenderingHelper.depthTexture:null;s.bindTexture(h,5),d.setUniform1i("depthTex",5),d.setUniform4f("highlightViewportPixelSz",0,0,1/n.viewport[2],1/n.viewport[3])}i.bindView(s,n);var f=a.capacity,p=a.headIndex,g=a.tailIndex,m=a.firstIndex,y=this._glInstanceBufferLayout,_=function(e,t){v.bindVertexBufferLayout(s,o.Default3D,a.buffer,y,e),l.drawArraysInstanced(u,0,r.vertexCount,t-e),v.unbindVertexBufferLayout(s,o.Default3D,a.buffer,y)};r.material.getParams().transparent&&null!=m?p>g?(b(m>=g&&m<=p,"invalid firstIndex"),_(m,p),_(g,m)):p<g&&(m<=p?(b(m>=0&&m<=p,"invalid firstIndex"),_(m,p),_(g,f),_(0,m)):(b(m>=g&&m<=f,"invalid firstIndex"),_(m,f),_(0,p),_(g,m))):p>g?_(g,p):p<g&&(_(0,p),_(g,f)),s.bindVAO(null),i.release(s,n)}},e}();t.LodRenderer=R,t.lodRenderers=[];var D=r.vec3d.create(),C=r.vec4d.create(),x=r.mat3d.create(),S=r.vec3d.create(),E=r.vec3d.create(),A=r.mat4d.identity()});