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

define(["require","exports","../../../core/libs/gl-matrix/mat4","../../../core/libs/gl-matrix/vec2","../../../core/libs/gl-matrix/vec3","../../../core/libs/gl-matrix/vec4","../GeometryUtils","./rendererUtils","../../webgl/VertexArrayObject"],function(e,t,r,i,a,n,o,s,l){return function(){function e(e){this._initialized=!1,this._programOptions={id:!1,dd:!1,pattern:!1},this._programCache=e,this._viewProjMat=r.create(),this._offsetVector=a.create(),this._color=n.create(),this._dashArray=i.create()}return e.prototype.dispose=function(){},e.prototype.render=function(e,t,i,a,n,l,f,d,u,c,m){if(0!==t.triangleElementCount){this._initialized||this._initialize(e);var _=l.tileTransform.transform,h=l.coordRange/512,v=f.getPaintValue("line-translate",i);if(0!==v[0]||0!==v[1]){r.copy(this._viewProjMat,l.tileTransform.transform);var g=v[0],p=v[1],y=0,b=0,x=(1<<l.key.level)/Math.pow(2,i)*h,V=n.rotation;if(1===f.getPaintValue("line-translate-anchor",i)){var D=-o.C_DEG_TO_RAD*V,A=Math.sin(D),z=Math.cos(D);y=x*(g*z-p*A),b=x*(g*A+p*z)}else y=x*g,b=x*p;this._offsetVector[0]=y,this._offsetVector[1]=b,this._offsetVector[2]=0,r.translate(this._viewProjMat,this._viewProjMat,this._offsetVector),_=this._viewProjMat}var P=f.getPaintValue("line-pattern",i),O=void 0!==P,U=1/c,j=f.getPaintValue("line-blur",i),w=f.hasDataDrivenColor?[1,1,1,1]:f.getPaintValue("line-color",i),M=f.hasDataDrivenOpacity?1:f.getPaintValue("line-opacity",i),C=f.hasDataDrivenWidth?1:f.getPaintValue("line-width",i),B=M*w[3]*m;this._color[0]=B*w[0],this._color[1]=B*w[1],this._color[2]=B*w[2],this._color[3]=B;var E,T=f.hasDataDrivenLine,I=3===a;I&&(E=s.int32To4Bytes(t.layerID));var L=this._getLineVAO(e,l,T);if(L){e.bindVAO(L);var G=(I?1:0)<<2|(T?1:0)<<1|(O?1:0),N=this._programOptions;N.id=I,N.dd=T,N.pattern=O;var R=this._programCache.getProgram(3,G,N);if(e.bindProgram(R),R.setUniformMatrix4fv("u_transformMatrix",_),R.setUniformMatrix4fv("u_extrudeMatrix",u),R.setUniform2fv("u_normalized_origin",l.tileTransform.displayCoord),R.setUniform1f("u_depth",f.z),R.setUniform1f("u_blur",j),R.setUniform1f("u_antialiasing",U),R.setUniform4fv("u_color",this._color),R.setUniform1f("u_width",C),I&&R.setUniform4f("u_id",E[0],E[1],E[2],E[3]),O){var S=d.getMosaicItemPosition(P,!0);S&&(d.bind(e,9729,S.page,1),R.setUniform2f("u_pattern_tl",S.tl[0],S.br[1]),R.setUniform2f("u_pattern_br",S.br[0],S.tl[1]),R.setUniform2f("u_spriteSize",h*S.size[0],S.size[1]),R.setUniform1i("u_texture",1))}else{var k=f.getPaintValue("line-dasharray",i);k.length<2&&(k=[1,-1]);var q=h;this._dashArray[0]=q*k[0],this._dashArray[1]=q*k[1],R.setUniform2fv("u_dasharray",this._dashArray)}e.drawElements(4,t.triangleElementCount,5125,12*t.triangleElementStart),e.bindVAO()}}},e.prototype._initialize=function(e){return!!this._initialized||(this._vertexAttributes={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:12,normalized:!1,divisor:0},{name:"a_offsetAndNormal",count:4,type:5120,offset:4,stride:12,normalized:!1,divisor:0},{name:"a_accumulatedDistance",count:2,type:5123,offset:8,stride:12,normalized:!1,divisor:0}]},this._vertexAttributesDD={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:20,normalized:!1,divisor:0},{name:"a_offsetAndNormal",count:4,type:5120,offset:4,stride:20,normalized:!1,divisor:0},{name:"a_accumulatedDistance",count:2,type:5122,offset:8,stride:20,normalized:!1,divisor:0},{name:"a_color",count:4,type:5121,offset:12,stride:20,normalized:!0,divisor:0},{name:"a_width",count:1,type:5126,offset:16,stride:20,normalized:!1,divisor:0}]},this._initialized=!0,!0)},e.prototype._getLineVAO=function(e,t,r){if(r){if(t.lineDDVertexArrayObject)return t.lineDDVertexArrayObject;var i=t.lineDDVertexBuffer,a=t.lineIndexBuffer;return i&&a?(t.lineDDVertexArrayObject=new l(e,this._programCache.getProgramAttributes(3),this._vertexAttributesDD,{geometry:i},a),t.lineDDVertexArrayObject):null}if(t.lineVertexArrayObject)return t.lineVertexArrayObject;var i=t.lineVertexBuffer,a=t.lineIndexBuffer;return i&&a?(t.lineVertexArrayObject=new l(e,this._programCache.getProgramAttributes(3),this._vertexAttributes,{geometry:i},a),t.lineVertexArrayObject):null},e}()});