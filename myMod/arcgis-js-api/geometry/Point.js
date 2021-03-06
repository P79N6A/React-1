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

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","../core/Logger","../core/accessorSupport/decorators","./Geometry","./SpatialReference","./support/spatialReferenceUtils","./support/webMercatorUtils"],function(e,t,r,i,n,o,s,a,l,u){function p(e){return e&&("esri.geometry.SpatialReference"===e.declaredClass||null!=e.wkid)}var c=[0,0],h=n.getLogger("esri.geometry.Point"),y=function(e){function t(t,r,i,n,o){var s=e.call(this)||this;return s.x=0,s.y=0,s.z=void 0,s.m=void 0,s.type="point",s}r(t,e),n=t,t.copy=function(e,t){t.x=e.x,t.y=e.y,t.z=e.z,t.m=e.m,t.spatialReference=Object.isFrozen(e.spatialReference)?e.spatialReference:e.spatialReference.clone()},t.distance=function(e,t){var r=e.x-t.x,i=e.y-t.y,n=e.hasZ&&t.hasZ?e.z-t.z:0;return Math.sqrt(r*r+i*i+n*n)},t.prototype.normalizeCtorArgs=function(e,t,r,i,n){var o;if(Array.isArray(e))o=e,n=t,e=o[0],t=o[1],r=o[2],i=o[3];else if(e&&"object"==typeof e){if(o=e,e=null!=o.x?o.x:o.longitude,t=null!=o.y?o.y:o.latitude,r=null!=o.z?o.z:o.altitude,i=o.m,n=o.spatialReference,n&&"esri.geometry.SpatialReference"!==n.declaredClass&&(n=new a(n)),null!=o.longitude||null!=o.latitude)if(null==o.longitude)h.warn(".longitude=","Latitude was defined without longitude");else if(null==o.latitude)h.warn(".latitude=","Longitude was defined without latitude");else if(!o.declaredClass&&n&&n.isWebMercator){var s=u.lngLatToXY(o.longitude,o.latitude,c);e=s[0],t=s[1]}}else p(r)?(n=r,r=null):p(i)&&(n=i,i=null);var l={x:e,y:t};return null==l.x&&null!=l.y?h.warn(".y=","Y coordinate was defined without an X coordinate"):null==l.y&&null!=l.x&&h.warn(".x=","X coordinate was defined without a Y coordinate"),null!=n&&(l.spatialReference=n),null!=r&&(l.z=r),null!=i&&(l.m=i),l},Object.defineProperty(t.prototype,"hasM",{get:function(){return void 0!==this.m},set:function(e){e!==this._get("hasM")&&(this._set("m",e?0:void 0),this._set("hasM",e))},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"hasZ",{get:function(){return void 0!==this.z},set:function(e){e!==this._get("hasZ")&&(this._set("z",e?0:void 0),this._set("hasZ",e))},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"latitude",{get:function(){var e=this._get("spatialReference");if(e){if(e.isWebMercator)return u.xyToLngLat(this.x,this.y,c)[1];if(e.isWGS84)return this._get("y")}return null},set:function(e){var t=this._get("spatialReference");t&&(t.isWebMercator?this._set("y",u.lngLatToXY(this.x,e,c)[1]):t.isWGS84&&this._set("y",e),this._set("latitude",e))},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"longitude",{get:function(){var e=this._get("spatialReference");if(e){if(e.isWebMercator)return u.xyToLngLat(this._get("x"),this._get("y"),c)[0];if(e.isWGS84)return this._get("x")}return null},set:function(e){var t=this._get("spatialReference");t&&(t.isWebMercator?this._set("x",u.lngLatToXY(e,this._get("y"),c)[0]):t.isWGS84&&this._set("x",e),this._set("longitude",e))},enumerable:!0,configurable:!0}),t.prototype.clone=function(){var e=new n;return e.x=this.x,e.y=this.y,e.z=this.z,e.m=this.m,e.spatialReference=this.spatialReference,e},t.prototype.copy=function(e){return n.copy(e,this),this},t.prototype.equals=function(e){var t,r;if(!e)return!1;var i=this,n=i.x,o=i.y,s=i.z,a=i.m,l=i.spatialReference,p=e.z,c=e.m,h=e.x,y=e.y,d=e.spatialReference;if(!l.equals(d))if(l.isWebMercator&&d.isWGS84)t=u.lngLatToXY(h,y),h=t[0],y=t[1],d=l;else{if(!l.isWGS84||!d.isWebMercator)return!1;r=u.xyToLngLat(h,y),h=r[0],y=r[1],d=l}return n===h&&o===y&&s===p&&a===c&&l.wkid===d.wkid},t.prototype.offset=function(e,t,r){return this.x=this.x+e,this.y=this.y+t,null!=r&&this.hasZ&&(this.z=this.z+r),this},t.prototype.normalize=function(){if(!this.spatialReference)return this;var e=l.getInfo(this.spatialReference);if(!e)return this;var t,r=this.x,i=e.valid,n=i[0],o=i[1],s=2*o;return r>o?(t=Math.ceil(Math.abs(r-o)/s),r-=t*s):r<n&&(t=Math.ceil(Math.abs(r-n)/s),r+=t*s),this._set("x",r),this},t.prototype.distance=function(e){return n.distance(this,e)},t.prototype.toArray=function(){var e=this.hasZ,t=this.hasM;return e&&t?[this.x,this.y,this.z,this.m]:e?[this.x,this.y,this.z]:t?[this.x,this.y,this.m]:[this.x,this.y]},t.prototype.toJSON=function(e){return this.write(null,e)};var n;return i([o.property({dependsOn:["x","y","z","m","spatialReference"]})],t.prototype,"cache",void 0),i([o.property({type:Boolean,dependsOn:["m"],json:{read:!1,write:{enabled:!1,overridePolicy:null}}})],t.prototype,"hasM",null),i([o.property({type:Boolean,dependsOn:["z"],json:{read:!1,write:{enabled:!1,overridePolicy:null}}})],t.prototype,"hasZ",null),i([o.property({type:Number,dependsOn:["y"]})],t.prototype,"latitude",null),i([o.property({type:Number,dependsOn:["x"]})],t.prototype,"longitude",null),i([o.property({type:Number,json:{write:{isRequired:!0}}})],t.prototype,"x",void 0),i([o.property({type:Number,json:{write:!0}})],t.prototype,"y",void 0),i([o.property({type:Number,json:{write:{overridePolicy:function(){return{enabled:this.hasZ}}}}})],t.prototype,"z",void 0),i([o.property({type:Number,json:{write:{overridePolicy:function(){return{enabled:this.hasM}}}}})],t.prototype,"m",void 0),t=n=i([o.subclass("esri.geometry.Point")],t)}(o.declared(s));return y.prototype.toJSON.isDefaultToJSON=!0,y});