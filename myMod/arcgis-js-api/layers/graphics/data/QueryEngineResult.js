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

define(["require","exports","@dojo/framework/shim/Set","../../../core/promiseUtils","../../../geometry/support/quantizationUtils","../../../geometry/support/spatialReferenceUtils","../featureConversionUtils","./AttributesBuilder","./attributeSupport","./projectionSupport","./utils"],function(e,t,r,i,s,a,n,o,u,l,c){function f(e){return e?JSON.parse(JSON.stringify(e,["latestWkid","wkid","wkt"])):e}Object.defineProperty(t,"__esModule",{value:!0});var p=function(){function e(e,t){this.items=e,this.definitionExpression=t.definitionExpression,this.geometryType=t.geometryType,this.hasM=t.hasM,this.hasZ=t.hasZ,this.objectIdField=t.objectIdField,this.spatialReference=t.spatialReference,this.fieldsMap=t.fieldsMap}return Object.defineProperty(e.prototype,"size",{get:function(){return this.items.length},enumerable:!0,configurable:!0}),e.prototype.createQueryResponse=function(e){return e.outStatistics?this._createStatisticsQueryResponse(e):this._createFeatureQueryResponse(e)},e.prototype.executeAttributesQuery=function(e){var t=u.getWhereClause(e.where);if(!t)return i.resolve(this);if(t.isStandardized()){for(var r=0,s=[],a=0,n=this.items;a<n.length;a++){var o=n[a];t.testFeature(o.attributes)&&(s[r++]=o)}var l=this._createNew(s);return l.definitionExpression=e.where,i.resolve(l)}return i.reject(new TypeError("Where clause is not standardized"))},e.prototype.executeObjectIdsQuery=function(e){if(!e.objectIds||!e.objectIds.length)return i.resolve(this);var t=new r.default(e.objectIds);return i.resolve(this._createNew(this.items.filter(function(e){return t.has(e.objectId)})))},e.prototype.project=function(t){var r=this;return!t||a.equals(this.spatialReference,t)?i.resolve(this):l.projectMany(this.items.map(function(e){return c.getGeometry(r,e)}),this.spatialReference,t).then(function(i){for(var s=[],a=0;a<r.items.length;a++)s[a]={attributes:r.items[a].attributes,geometry:i[a]};var o=[];return n.convertFromFeatures(o,s,r.geometryType,r.hasZ,r.hasM,r.objectIdField),new e(o,{definitionExpression:r.definitionExpression,geometryType:r.geometryType,hasM:r.hasM,hasZ:r.hasZ,objectIdField:r.objectIdField,spatialReference:t,fieldsMap:r.fieldsMap})})},e.prototype._createFeatureQueryResponse=function(e){var t=this,r=this.items,i=this,a=i.geometryType,n=i.hasM,o=i.hasZ,u=i.objectIdField,l=i.spatialReference,c=e.outFields,p=e.outSpatialReference,h=e.quantizationParameters,d=!1;if(null!=e.num&&null!=e.start){var m=e.start+e.num;d=r.length>m,r=r.slice(e.start,Math.min(r.length,m))}return{exceededTransferLimit:d,features:this._createFeatures(e,r),fields:c&&c.map(function(e){return t.fieldsMap.get(e)}),geometryType:a,hasM:n,hasZ:o,objectIdFieldName:u,spatialReference:f(p?p.toJSON():l),transform:h&&s.toTransform(h)}},e.prototype._createFeatures=function(e,t){var r=new o.default(e,this.fieldsMap),i=e.quantizationParameters,a=e.returnGeometry,n=e.returnCentroid,u=e.maxAllowableOffset,l=e.orderByFields,f=[],p=0;if(t.length&&l&&l.length){var h=l[0].split(" "),d=h[0],m="DESC"===h[1];t.sort(function(e,t){var i=r.getFieldValue(e,d),s=r.getFieldValue(t,d);if("number"==typeof i&&"number"==typeof s)return m?s-i:i-s;if("string"==typeof i&&"string"==typeof s){var a=i.toUpperCase(),n=s.toUpperCase();return(m?a>n:a<n)?-1:(m?a<n:a>n)?1:0}})}if(a||n){var v=s.toTransform(i);if(a&&!n)for(var y=0,g=t;y<g.length;y++){var b=g[y];f[p++]={attributes:r.getAttributes(b),geometry:c.getGeometry(this,b,u,v)}}else if(!a&&n)for(var F=0,I=t;F<I.length;F++){var b=I[F];f[p++]={attributes:r.getAttributes(b),centroid:c.getCentroid(this,b,v)}}else for(var M=0,S=t;M<S.length;M++){var b=S[M];f[p++]={attributes:r.getAttributes(b),centroid:c.getCentroid(this,b,v),geometry:c.getGeometry(this,b,u,v)}}}else for(var _=0,j=t;_<j.length;_++){var b=j[_],T=r.getAttributes(b);T&&(f[p++]={attributes:T})}return f},e.prototype._createNew=function(t){return new e(t,this)},e.prototype._createStatisticsQueryResponse=function(e){for(var t=new o.default(e,this.fieldsMap),r=e.outStatistics,i=[],s=[],a=e.groupByFieldsForStatistics,n=e.having,u=a&&a.length,l=u&&a[0],c={},f={},p={},h={attributes:{}},d=0,m=r;d<m.length;d++){var v=m[d],y=v.onStatisticField,g=v.outStatisticFieldName,b=v.statisticType,F="1"===y;if(u&&(y===l||F)&&"count"===b){c[y]||(c[y]=this._calculateUniqueValues(t,F?l:y));var I=c[y];for(var M in I){var S=I[M],_=S.count,j=S.data,T=S.items,N=f[j]||{attributes:{}};n&&!t.validateItems(T,n)||(N.attributes[g]=_,N.attributes[F?"EXPR_1":y]=j,f[j]=N)}s.push({name:g,alias:g,type:"esriFieldTypeString"})}else{if(u){var w=this._calculateUniqueValues(t,l);for(var M in w){var R=w[M],j=R.data,T=R.items;if(!n||t.validateItems(T,n)){var N=f[j]||{attributes:{}},x=this._calculateStatistics(T,t,y),E="var"===b?"variance":b;N.attributes[g]=x[E],N.attributes[l]=j,f[j]=N}}}else{p[y]||(p[y]=this._calculateStatistics(this.items,t,y));var x=p[y],E="var"===b?"variance":b;h.attributes[g]=x[E]}s.push({name:g,alias:g,type:"esriFieldTypeDouble"})}}if(u)for(var q in f)i.push(f[q]);else i.push(h);return{fields:s,features:i}},e.prototype._calculateStatistics=function(e,t,r){for(var i=e.length,s=Number.POSITIVE_INFINITY,a=Number.NEGATIVE_INFINITY,n=null,o=null,u=null,l=null,c=[],f=0;f<i;f++){var p=e[f],h=c[f]=t.getFieldValue(p,r);isNaN(h)||(n+=h,s=Math.min(s,h),a=Math.max(a,h))}if(i){o=n/i;for(var d=0,m=0,v=c;m<v.length;m++){var h=v[m];d+=Math.pow(h-o,2)}l=i>1?d/(i-1):0,u=Math.sqrt(l)}else s=null,a=null;return{avg:o,count:i,max:a,min:s,stddev:u,sum:n,variance:l}},e.prototype._calculateUniqueValues=function(e,t){for(var r={},i=0,s=this.items;i<s.length;i++){var a=s[i],n=e.getFieldValue(a,t);(null==n||"string"==typeof n&&""===n.trim())&&(n=null),null==r[n]?r[n]={count:1,data:n,items:[a]}:(r[n].count++,r[n].items.push(a))}return r},e}();t.default=p});