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

define(["require","exports","../../../geometry","../../../core/Error","../../../geometry/SpatialReference","../../../geometry/support/aaBoundingRect","../../../geometry/support/scaleUtils","../../../layers/support/TileInfo","../support/mathUtils","../support/projectionUtils"],function(e,t,i,r,n,o,l,s,a,u){var h=u.webMercator.x2lon,c=u.webMercator.y2lat,p=function(){function e(t){var i=e._checkUnsupported(t);if(i)throw i;this.spatialReference=t.spatialReference,this._isWebMercator=this.spatialReference.isWebMercator,this._isWGS84=this.spatialReference.isWGS84,this.origin=[t.origin.x,t.origin.y],this.pixelSize=[t.size[0],t.size[1]],this.dpi=t.dpi;var r=t.lods.reduce(function(e,t,i){return t.level<e.min&&(e.min=t.level,e.minIndex=i),e.max=Math.max(e.max,t.level),e},{min:1/0,minIndex:0,max:-1/0}),n=t.lods[r.minIndex],o=Math.pow(2,n.level),l=n.resolution*o,s=n.scale*o;this.levels=new Array(r.max+1);for(var a=0;a<this.levels.length;a++)this.levels[a]={resolution:l,scale:s,tileSize:[l*t.size[0],l*t.size[1]]},l/=2,s/=2}return e.prototype.clone=function(){return new e(this.toTileInfo())},e.prototype.toTileInfo=function(){return new s({dpi:this.dpi,origin:{x:this.origin[0],y:this.origin[1],spatialReference:this.spatialReference},size:this.pixelSize,spatialReference:this.spatialReference,lods:this.levels.map(function(e,t){return{level:t,scale:e.scale,resolution:e.resolution}})})},e.prototype.getExtent=function(e,t,i,r,n){void 0===r&&(r=o.create());var l=this.levels[e],s=l.tileSize[0],u=l.tileSize[1];return r[0]=this.origin[0]+i*s,r[2]=r[0]+s,r[3]=this.origin[1]-t*u,r[1]=r[3]-u,n&&(this._isWebMercator?(n[0]=h(r[0]),n[1]=c(r[1]),n[2]=h(r[2]),n[3]=c(r[3])):this._isWGS84&&(n[0]=a.deg2rad(r[0]),n[1]=a.deg2rad(r[1]),n[2]=a.deg2rad(r[2]),n[3]=a.deg2rad(r[3]))),r},e.prototype.getExtentGeometry=function(e,t,r,n){return void 0===n&&(n=new i.Extent),this.getExtent(e,t,r,f),n.spatialReference=this.spatialReference,n.xmin=f[0],n.ymin=f[1],n.xmax=f[2],n.ymax=f[3],n.zmin=void 0,n.zmax=void 0,n},e.prototype.ensureMaxLod=function(e){for(;this.levels.length<=e;){var t=this.levels[this.levels.length-1],i=t.resolution/2;this.levels.push({resolution:i,scale:t.scale/2,tileSize:[i*this.pixelSize[0],i*this.pixelSize[1]]})}},e.prototype.capMaxLod=function(e){this.levels.length>e+1&&(this.levels.length=e+1)},e.prototype.getMaxLod=function(){return this.levels.length-1},e.prototype.scaleAtLevel=function(e){return this.levels[0].scale/Math.pow(2,e)},e.prototype.levelAtScale=function(e){var t=this.levels[0].scale;return e>=t?0:Math.log(t/e)*Math.LOG2E},e.prototype.resolutionAtLevel=function(e){return this.levels[0].resolution/Math.pow(2,e)},e.prototype.compatibleWith=function(t){if(!(t instanceof e)){if(e._checkUnsupported(t))return!1;t=new e(t)}if(!t.spatialReference.equals(this.spatialReference))return!1;if(t.pixelSize[0]!==this.pixelSize[0]||t.pixelSize[1]!==this.pixelSize[1])return!1;var i=Math.min(this.levels.length,t.levels.length)-1,r=this.levels[i].resolution,n=.5*r;if(!a.floatEqualAbsolute(t.origin[0],this.origin[0],n)||!a.floatEqualAbsolute(t.origin[1],this.origin[1],n))return!1;var o=Math.max(this.pixelSize[0],this.pixelSize[1]);return n=.5*r/Math.pow(2,i)/o*12,a.floatEqualAbsolute(r,t.levels[i].resolution,n)},e.prototype.rootTilesInExtent=function(t,i,r){var n=this.levels[0].tileSize;e.computeRowColExtent(t,n,this.origin,f);var o=f[1],l=f[3],s=f[0],a=f[2],u=a-s,h=l-o;if(u*h>r){var c=Math.floor(Math.sqrt(r));h>c&&(o=o+Math.floor(.5*h)-Math.floor(.5*c),l=o+c),u>c&&(s=s+Math.floor(.5*u)-Math.floor(.5*c),a=s+c)}for(var p=new Array((a-s)*(l-o)),v=0,g=o;g<l;g++)for(var m=s;m<a;m++)p[v++]=[0,g,m];return i&&(i[0]=this.origin[0]+s*n[0],i[1]=this.origin[1]-l*n[1],i[2]=this.origin[0]+a*n[0],i[3]=this.origin[1]-o*n[1]),p},e.computeRowColExtent=function(e,t,i,r){var n=.001*(e[2]-e[0]+(e[3]-e[1]));r[0]=Math.floor((e[0]+n-i[0])/t[0]),r[2]=Math.ceil((e[2]-n-i[0])/t[0]),r[1]=Math.floor((i[1]-e[3]+n)/t[1]),r[3]=Math.ceil((i[1]-e[1]-n)/t[1])},e.isPowerOfTwo=function(e){var t=e.lods,i=t[0].resolution*Math.pow(2,t[0].level);return!t.some(function(e){return!a.floatEqualRelative(e.resolution,i/Math.pow(2,e.level))})},e.hasGapInLevels=function(e){var t=e.lods.map(function(e){return e.level});t.sort(function(e,t){return e-t});for(var i=1;i<t.length;i++)if(t[i]!==t[0]+i)return!0;return!1},e.tileSizeSupported=function(e){var t=e.size[1];return t===e.size[0]&&0==(t&t-1)&&t>=128&&t<=512},e._checkUnsupported=function(t){return t?t.lods.length<1?new r("tilingscheme:generic","Tiling scheme must have at least one level"):e.isPowerOfTwo(t)?null:new r("tilingscheme:power-of-two","Tiling scheme must be power of two"):new r("tilingscheme:tile-info-missing","Tiling scheme must have tiling information")},e.checkUnsupported=function(t){var i=e._checkUnsupported(t);return i||(e.hasGapInLevels(t)?new r("tilingscheme:gaps","Tiling scheme levels must not have gaps between min and max level"):e.tileSizeSupported(t)?null:new r("tilingscheme:tile-size","Tiles must be square and size must be one of [128, 256, 512]"))},e.fromExtent=function(t,i){var r=t[2]-t[0],n=t[3]-t[1],o=l.getMetersPerUnitForSR(i),a=1.2*Math.max(r,n),u=new e(new s({size:[256,256],origin:{x:t[0]-.5*(a-r),y:t[3]+.5*(a-n)},lods:[{level:0,resolution:a/256,scale:1/(256/96*.0254/(a*o))}],spatialReference:i}));return u.ensureMaxLod(20),u},e.makeWebMercatorAuxiliarySphere=function(t){void 0===t&&(t=19);var i=new e(e.WebMercatorAuxiliarySphereTileInfo);return i.ensureMaxLod(t),i},e.makeWGS84WithTileSize=function(t,i){void 0===i&&(i=16);var r=256/t,o=new e(new s({size:[t,t],origin:{x:-180,y:90,spatialReference:n.WGS84},spatialReference:n.WGS84,lods:[{level:0,resolution:.703125*r,scale:295497598.570834*r}]}));return o.ensureMaxLod(i),o},e.WebMercatorAuxiliarySphereTileInfo=new s({size:[256,256],origin:{x:-20037508.342787,y:20037508.342787,spatialReference:n.WebMercator},spatialReference:n.WebMercator,lods:[{level:0,resolution:156543.03392800014,scale:591657527.591555}]}),e.WebMercatorAuxiliarySphere=e.makeWebMercatorAuxiliarySphere(19),e}(),f=o.create();return p});