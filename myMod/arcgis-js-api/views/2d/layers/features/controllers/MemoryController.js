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

define(["require","exports","../../../../../core/tsSupport/declareExtendsHelper","../../../../../core/tsSupport/decorateHelper","../../../../../core/tsSupport/assignHelper","../../../../../geometry","../../../../../core/Error","../../../../../core/Logger","../../../../../core/promiseUtils","../../../../../core/workers","../../../../../core/accessorSupport/decorators","../../../../../geometry/support/spatialReferenceUtils","../../../../../layers/support/FeatureProcessing","../../../../../tasks/support/QuantizationParameters","../../../../../tasks/support/Query","./BaseController","../support/TileUpdateQueue","../../../tiling/TileInfoView"],function(e,t,r,o,i,n,s,u,a,p,c,l,f,y,h,d,m,g){Object.defineProperty(t,"__esModule",{value:!0});var v=u.getLogger("esri.views.2d.layers.features.controllers.MemoryController"),_=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.type="memory",t._processingInMainThread=!1,t}return r(t,e),t.prototype.initialize=function(){var e=this;this._tileQueue=new m.default({tileInfoView:new g(this.tileStore.tileInfo),process:function(t,r){return e._fetchFeatureSet(t,r)}}),this._memorySource=p.open(this.service.source,{client:this}),this.handles.add(this.watch("processor",this._switchProcessor.bind(this)))},t.prototype.destroy=function(){this._tileQueue.clear(),this._tileQueue.pause()},Object.defineProperty(t.prototype,"processing",{get:function(){return f.fromWorker(this.configuration.processing)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"updating",{get:function(){return this._tileQueue.updating},enumerable:!0,configurable:!0}),t.prototype.onEdits=function(e){this.refresh()},t.prototype.queryFeatures=function(e){return this._memorySource.invoke("queryFeatures",e)},t.prototype.queryFeatureCount=function(e){return this._memorySource.invoke("queryFeatureCount",e)},t.prototype.queryObjectIds=function(e){return this._memorySource.invoke("queryObjectIds",e)},t.prototype.queryExtent=function(e){return this._memorySource.invoke("queryExtent",e)},t.prototype.redraw=function(){this.refresh()},t.prototype.refresh=function(){this._tileQueue.refresh();for(var e=0,t=this.tileStore.tiles;e<t.length;e++){var r=t[e];this._tileQueue.push(r.id,r.updateTimestamp)}},t.prototype.setViewState=function(e){this._tileQueue.state=e},t.prototype.onTileUpdate=function(e){this._tileQueue.pause();for(var t=0,r=e.removed;t<r.length;t++){var o=r[t];this._tileQueue.cancel(o.id)}for(var i=0,n=e.added;i<n.length;i++){var o=n[i];this._tileQueue.push(o.id,o.updateTimestamp)}this.processor&&this._tileQueue.resume()},t.prototype._switchProcessor=function(e,t){this.refresh(),e&&this._tileQueue.resume()},t.prototype._fetchFeatureSet=function(e,t){var r=this,o=this.tileStore.get(e),i=this.processor.queryInfo;return this._query(o,i).then(function(e){return r._wrapPoints(e,i)}).then(function(e){return r._sortFeatures(e,i)}).then(function(e){return e.features.length?e:null}).then(function(e){return o.updateTimestamp=t,r.processor.onTileData(o,{addOrUpdate:e&&e.features,clear:!0})}).catch(function(e){return o.updateTimestamp=t,"cancel"!==e.dojoType&&(r.processor.onTileError(o,e.message),v.error("query-error",{error:e})),a.reject(e)})},t.prototype._query=function(e,t){var r=this,o=new h,i=this._getQuantizationParameters(e),s=t.pixelBuffer*e.resolution,u=e.bounds.slice();return u[0]-=s,u[1]-=s,u[2]+=s,u[3]+=s,o.outFields=this.processor.queryInfo.outFields,o.where=this.processor.queryInfo.definitionExpression||"1=1",o.geometry=n.Extent.fromJSON({xmin:u[0],ymin:u[1],xmax:u[2],ymax:u[3],spatialReference:this.spatialReference}),this.service.capabilities.query.supportsQuantization?(o.quantizationParameters=i,"esriGeometryPolyline"===this.service.geometryType&&(o.maxAllowableOffset=i.tolerance)):o.maxAllowableOffset=i.tolerance,o.resultType="tile",o.returnExceededLimitFeatures=!1,o.returnGeometry=!0,o.returnCentroid=t.returnCentroid,o.orderByFields=t.orderByFields,this.queryFeatures(o.toJSON()).then(function(e){return r._applyProcessing(e)})},t.prototype._applyProcessing=function(e){var t=this.processing;if(!t)return e;if(this._processingInMainThread)return this.remoteClient.invoke("executeProcessing",{featureSet:e});try{var r=t.process(e,t.options);return r||a.reject(new s("FeatureLayer","invalid processing.process() method, returns nothing"))}catch(t){return this._processingInMainThread=!0,this.remoteClient.invoke("executeProcessing",{featureSet:e})}},t.prototype._getQuantizationParameters=function(e){return y.default.fromJSON({mode:"view",originPosition:"upperLeft",tolerance:e.resolution,extent:{xmin:e.bounds[0],ymin:e.bounds[1],xmax:e.bounds[2],ymax:e.bounds[3],spatialReference:this.spatialReference}})},t.prototype._wrapPoints=function(e,t){if(0===e.features.length)return e;var r=t.returnCentroid,o=t.pixelBuffer,n=e.geometryType,s=e.spatialReference,u=e.transform;if("esriGeometryPoint"!==n&&"esriGeometryMultipoint"!==n&&!r||!l.isWrappable(s))return e;var a=e.features,p=l.getInfo(s),c=Math.round((p.valid[1]-p.valid[0])/u.scale[0]);if(512===c){for(var f=[],y=0,h=a;y<h.length;y++){var d=h[y],m=d.geometry,g=d.attributes;if(m)if(m.x<o){var v={geometry:i({},m),attributes:g};v.geometry.x+=c,f.push(v)}else if(m.x>512-o){var v={geometry:i({},m),attributes:g};v.geometry.x-=c,f.push(v)}}a.push.apply(a,f)}else for(var _=0,x=a;_<x.length;_++){var m=x[_].geometry;m&&(m.x<-o?m.x+=c:m.x>512+o&&(m.x-=c))}return e},t.prototype._sortFeatures=function(e,t){var r=t.orderByFields;if(r){var o=r[0].split(" "),i=o[0];"DESC"===o[1]&&e.features.sort(function(e,t){return t.attributes[i]-e.attributes[i]})}return e},o([c.property()],t.prototype,"_tileQueue",void 0),o([c.property()],t.prototype,"configuration",void 0),o([c.property({readOnly:!0,dependsOn:["configuration"]})],t.prototype,"processing",null),o([c.property({dependsOn:["_tileQueue.updating"]})],t.prototype,"updating",null),t=o([c.subclass()],t)}(c.declared(d.default));t.default=_});