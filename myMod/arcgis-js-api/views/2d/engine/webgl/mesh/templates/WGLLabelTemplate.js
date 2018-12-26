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

define(["require","exports","../../../../../../core/tsSupport/extendsHelper","../../../../../../core/Logger","../../../../../../core/screenUtils","../../../../../../core/libs/gl-matrix/mat2d","../../../../../../core/libs/gl-matrix/vec2","../../../../../../geometry/support/centroid","../../color","../../enums","../../fontUtils","../../number","../../TextShaping","../../WGLDisplayRecord","../../collisions/BoundingBox","./WGLMeshTemplate","./WGLTextTemplate"],function(t,e,r,i,o,s,h,n,a,p,l,f,c,u,_,g,m){Object.defineProperty(e,"__esModule",{value:!0});var x=i.getLogger("esri.views.2d.engine.webgl.WGLLabelTemplate"),y=24,d=10,v=1.2*y,b=10*y,w=f.i8888to32(255,255,255,255),O={xOffset:0,yOffset:0,width:0,height:0},A=function(t){function e(e,r,i){var s=t.call(this)||this;s.geometryType=p.WGLGeometryType.LABEL,s.vvFlags=0,s._textBoxVerticalOffset=0,s._textBoxHorizontalOffset=0,s._refTemplate=O,s._xOffset=r.xoffset,s._yOffset=-r.yoffset,s._decorationOffset=l.getFontDecorationOffset(r.font);var n=r.haloColor;s._color=0|(r.color&&a.premultiplyAlphaRGBA(r.color));var f=r.xoffset/r.font.size,c=r.yoffset/r.font.size;s._shapingXOffset=f*y,s._shapingYOffset=c*y,s._haloColor=0|(n&&a.premultiplyAlphaRGBA(n)),s._haloSize=d*o.pt2px(o.toPt(r.haloSize||0)),s._textPropSize=o.pt2px(r.font.size),s._textPropAngle=r.angle*Math.PI/180,s._textPropHJustification="left"===r.horizontalAlignment?0:"right"===r.horizontalAlignment?1:.5;var u=0,_=.5;switch(i){case"above-center":case"above-left":case"above-right":u=-.5,_=0;break;case"below-center":case"below-left":case"below-right":u=.5,_=1}var g=0,m=.5;switch(i){case"above-left":case"center-left":case"below-left":g=-.5,m=1;break;case"above-right":case"center-right":case"below-right":g=.5,m=0}return s._textPropHAnchorPlacement=m,s._textPropVAnchorPlacement=_,s._placementDirection=[g,u],s._materialStore=e,s.symbolId=r.id,s.anchor=h.create(),s}return r(e,t),e.fromText=function(t,r,i,o,s,h){return new e(t,i,s)},Object.defineProperty(e.prototype,"bounds",{get:function(){return this._bounds},enumerable:!0,configurable:!0}),e.prototype.computeGlyphs=function(t,e){var r=e.text;if(!r||!r.length)return this._computedGlyphs=[],1;var i=this._shapingXOffset,o=this._shapingYOffset,n=this._computeShaping(t,b,v,0,i,o,this._textPropHAnchorPlacement,this._textPropVAnchorPlacement,this._textPropHJustification),a=n.getShaping(r,e.rtl);isNaN(this._decorationOffset)||c.addDecoration(a,this._decorationOffset);for(var l=new Array(a.length),f=0;f<a.length;f++){var u=this._textPropAngle,g=this._textPropSize,x=this._haloSize,d=a[f].glyphMosaicItem,w=this._materialStore.createGlyphMaterial(d,p.WGLGeometryType.LABEL,this.vvFlags);l[f]=m.ComputedGlyph.from(a[f],w,u,g,x)}if(this._computedGlyphs=l,!a||0===a.length)return 2;var O=c.getBox(a),A=this._textPropSize/y;O.width*=A,O.height*=A,O.x*=A,O.y*=A,this._placementDirection[0]<0?this._textBoxHorizontalOffset=-O.x-O.width:this._placementDirection[0]>0&&(this._textBoxHorizontalOffset=-O.x),this._placementDirection[1]<0?this._textBoxVerticalOffset=-O.y:this._placementDirection[1]>0&&(this._textBoxVerticalOffset=-O.y+O.height);var P=O.width/2,T=O.height/2;if(this._textPropAngle){var G=h.fromValues(-P,-T),L=h.fromValues(P,T),z=s.create();s.rotate(z,z,this._textPropAngle),h.transformMat2d(G,G,z),h.transformMat2d(L,L,z);var S=Math.abs(L[0]-G[0]),B=Math.abs(L[1]-G[1]);O.width=S,O.height=B}var M=new _.default(O.x,O.y,O.width+10,O.height+10);this._bounds=M;var D=this._placementDirection[0]*(this._refTemplate.width+this._bounds.width),R=this._placementDirection[1]*(this._refTemplate.height+this._bounds.height);return this._bounds.center[0]=D+this._xOffset,this._bounds.center[1]=R+this._yOffset,0},e.prototype.bindReferenceTemplate=function(t){if(!t)return void(this._refTemplate=O);this._refTemplate=t},e.prototype.computeAnchor=function(t,e){var r=this._refTemplate.xOffset,i=this._refTemplate.yOffset;switch(t){case"esriGeometryPoint":var o=e.geometry,s=o.x,n=o.y;this._setAnchor(s,n);break;case"esriGeometryMultipoint":var a=e.geometry,p=this._computeAnchorMultipoint(a.points),s=p.x,n=p.y;this._setAnchor(s,n);break;case"esriGeometryPolygon":if(e.centroid){var l=e.centroid,f=l.x,c=l.y;this._setAnchor(f,c);break}var a=e.geometry,u=this._computeAnchorRings(a.rings);if(!u)break;var s=u.x,n=u.y;this._setAnchor(s,n);break;case"esriGeometryPolyline":var a=e.geometry,u=this._computeAnchorRings(a.paths);if(!u)break;var s=u.x,n=u.y;this._setAnchor(s,n);break;default:x.error("Unable to handle geometryType: "+t)}return h.fromValues(this.anchor[0]+r,this.anchor[1]+i)},e.prototype.writeMesh=function(t,e,r,i,o,s,h){var n=e.indexVector,a=e.get("geometry"),p=e.get("visibility"),l=e.get("visibilityRange"),c=this._getOffset(a),u=this._placementDirection[0]*(this._refTemplate.width+10)+this._textBoxHorizontalOffset,_=this._placementDirection[1]*(this._refTemplate.height+10)+this._textBoxVerticalOffset,g=f.i8888to32(this._refTemplate.xOffset,-this._refTemplate.yOffset,u,_);this._writeVertices(t,n,a,p,l,i,c,g,this.anchor[0],this.anchor[1])},e.prototype._setAnchor=function(t,e){this.anchor[0]=t,this.anchor[1]=e},e.prototype._computeAnchorMultipoint=function(t){return t.length&&t[0].length?{x:t[0][0],y:t[0][1]}:null},e.prototype._computeAnchorRings=function(t){if(!t.length||!t[0].length||!t[0][0].length)return null;var e=n.ringsCentroid(t,!1);return{x:e[0],y:e[1]}},e.prototype._computeShaping=function(t,e,r,i,o,s,h,n,a){return this._shaping=new c([t],b,v,0,[o,s],h,n,a),this._shaping},e.prototype._getOffset=function(t){return t.length/5},e.prototype._writeVertices=function(t,e,r,i,o,s,h,n,a,p){var l=this._computedGlyphs,c=a,_=p,g=f.i1616to32(2*c,2*_),m=f.i1616to32(2*c+1,2*_),x=0,y=(16711680&s)>>16,d=(65280&s)>>8,v=255&s,b=f.i8888to32(0,y,d,v);if(this._haloSize)for(var w=0;w<l.length;w++,x+=4){var O=l[w].materialId,A=this._materialStore.get(O),P=new u(s,this.geometryType,O);P.vertexFrom=h+x,P.indexFrom=e.length,this._writeGlyph(P,r,i,o,b,m,this._haloColor,n,l[w],A),this._writeIndices(P,e,h+x),t.push(P)}for(var w=0;w<l.length;w++,x+=4){var O=l[w].materialId,A=this._materialStore.get(O),P=new u(s,this.geometryType,O);P.vertexFrom=h+x,P.indexFrom=e.length,this._writeGlyph(P,r,i,o,b,g,this._color,n,l[w],A),this._writeIndices(P,e,h+x),t.push(P)}},e.prototype._writeGlyph=function(t,e,r,i,o,s,h,n,a,p){e.push(s),e.push(h),e.push(a.vertexOffsetUpperLeft),e.push(a.texFontSizeUpperLeft),e.push(n),r.push(255),e.push(s),e.push(h),e.push(a.vertexOffsetUpperRight),e.push(a.texFontSizeUpperRight),e.push(n),r.push(255),e.push(s),e.push(h),e.push(a.vertexOffsetLowerLeft),e.push(a.texFontSizeLowerLeft),e.push(n),r.push(255),e.push(s),e.push(h),e.push(a.vertexOffsetLowerRight),e.push(a.texFontSizeLowerRight),e.push(n),r.push(255),i.push(w),i.push(w),t.vertexCount+=4},e.prototype._writeIndices=function(t,e,r){e.push(r+0),e.push(r+1),e.push(r+2),e.push(r+1),e.push(r+3),e.push(r+2),t.indexCount+=6},e}(g.default);e.default=A});