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

//  copyright

/**
             * Copyright information for the WMS service.
             * This defaults to the value of the AccessConstraints property from the GetCapabilities request.
             *
             * @name copyright
             * @type {string}
             * @instance
             */

define(["require","exports","../core/tsSupport/assignHelper","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","dojo/_base/url","../config","../Graphic","../PopupTemplate","../request","../core/Collection","../core/CollectionFlattener","../core/Handles","../core/promiseUtils","../core/accessorSupport/decorators","../core/accessorSupport/write","../geometry/Extent","../geometry/SpatialReference","./Layer","./mixins/OperationalLayer","./mixins/PortalLayer","./mixins/RefreshableLayer","./mixins/ScaleRangeLayer","./support/ExportWMSImageParameters","./support/WMSSublayer","./support/wmsUtils"],function(e,r,t,a,o,n,i,s,p,l,u,y,c,m,d,f,h,g,v,w,b,x,S,I,E,R){function L(e,r){return e.some(function(e){for(var t in e)if(f.willPropertyWrite(e,t,null,r))return!0;return!1})}function P(e,r,t){var a=[],o=new Map;return e.forEach(function(e){var n=new E;if(n.read(e,r),t&&-1===t.indexOf(n.name)&&(n.visible=!1),o[n.id]=n,null!=e.parentLayerId&&-1!==e.parentLayerId){var i=o[e.parentLayerId];i.sublayers||(i.sublayers=[]),i.sublayers.unshift(n)}else a.unshift(n)}),a}return function(r){function f(e,t){var a=r.call(this)||this;return a._sublayersHandles=new c,a.allSublayers=new y({root:a,rootCollectionNames:["sublayers"],getChildrenFunction:function(e){return e.sublayers}}),a.customParameters=null,a.customLayerParameters=null,a.copyright=null,a.description=null,a.fullExtent=null,a.fullExtents=null,a.featureInfoFormat=null,a.featureInfoUrl=null,a.imageFormat=null,a.imageMaxHeight=2048,a.imageMaxWidth=2048,a.imageTransparency=!0,a.legendEnabled=!0,a.mapUrl=null,a.operationalLayerType="WMS",a.spatialReference=null,a.spatialReferences=null,a.sublayers=null,a.type="wms",a.version=null,a.watch("sublayers",function(e,r){r&&(r.forEach(function(e){e.layer=null}),a._sublayersHandles.removeAll(),a._sublayersHandles=null),e&&(e.forEach(function(e){e.parent=a,e.layer=a}),a._sublayersHandles||(a._sublayersHandles=new c),a._sublayersHandles.add([e.on("after-add",function(e){var r=e.item;r.parent=a,r.layer=a}),e.on("after-remove",function(e){var r=e.item;r.parent=null,r.layer=null})]))},!0),a}return a(f,r),f.prototype.normalizeCtorArgs=function(e,r){return"string"==typeof e?t({url:e},r):e},f.prototype.load=function(){var e=this;return this.addResolvingPromise(this.loadFromPortal({supportedTypes:["WMS"]}).then(function(){return e._fetchService()})),this.when()},f.prototype.readFullExtentFromItemOrMap=function(e,r,t){var a=r.extent,o=r.spatialReferences;return new h(o&&o.length>0?{xmin:a[0][0],ymin:a[0][1],xmax:a[1][0],ymax:a[1][1],spatialReference:o[0]}:{xmin:a[0][0],ymin:a[0][1],xmax:a[1][0],ymax:a[1][1]})},f.prototype.writeFullExtent=function(e,r,t,a){r.extent=[[e.xmin,e.ymin],[e.xmax,e.ymax]]},f.prototype.readImageFormat=function(e,r){var t=r.supportedImageFormatTypes;return t&&t.indexOf("image/png")>-1?"image/png":t&&t[0]},f.prototype.readSpatialReferenceFromItemOrDocument=function(e,r,t){return new g(r.spatialReferences[0])},f.prototype.writeSpatialReferences=function(e,r,t,a){var o=this.spatialReference&&this.spatialReference.wkid;e&&o?(r.spatialReferences=e.filter(function(e){return e!==o}),r.spatialReferences.unshift(o)):r.spatialReferences=e},f.prototype.readSublayersFromItemOrMap=function(e,r,t){return P(r.layers,t,r.visibleLayers)},f.prototype.readSublayers=function(e,r,t){return P(r.layers,t)},f.prototype.writeSublayers=function(e,r,a,o){r.layers=[];var n=new Map,i=e.flatten(function(e){var r=e.sublayers;return r&&r.toArray()}).toArray();i.forEach(function(e){"number"==typeof e.parent.id&&(n.has(e.parent.id)?n.get(e.parent.id).push(e.id):n.set(e.parent.id,[e.id]))}),i.forEach(function(e){var a=t({sublayer:e},o),i=e.write({parentLayerId:"number"==typeof e.parent.id?e.parent.id:-1},a);if(n.has(e.id)&&(i.sublayerIds=n.get(e.id)),!e.sublayers&&e.name){var s=e.write({},a);delete s.id,r.layers.push(s)}}),r.visibleLayers=i.filter(function(e){return e.visible&&!e.sublayers}).map(function(e){return e.name})},f.prototype.createExportImageParameters=function(e){return this._exportWMSImageParameters=new I({layer:this,extent:e}),this._exportWMSImageParameters.toJSON()},f.prototype.fetchImage=function(e,r,a,o){var n=this.mapUrl,i={responseType:"image",query:this._mixCustomParameters(t({width:r,height:a},this.createExportImageParameters(e)))};return o&&o.timestamp&&(i.query=t({_ts:o.timestamp},i.query)),l(n,i).then(function(e){return e.data})},f.prototype.fetchFeatureInfo=function(e,r,a,o,n){var i=this,u=R.getPopupLayers(this._exportWMSImageParameters.visibleSublayers);if(!this.featureInfoUrl||!u)return null;var y="1.3.0"===this.version?{I:o,J:n}:{x:o,y:n},c=t({query_layers:u,request:"GetFeatureInfo",info_format:this.featureInfoFormat,feature_count:25,width:r,height:a},y),m=t({},this.createExportImageParameters(e),c);return m=this._mixCustomParameters(m),l(this.featureInfoUrl,{query:m,responseType:"text"}).then(function(e){var r=i.featureInfoUrl;r+=-1===r.indexOf("?")?"?":"";for(var t in m)r+="?"===r.substring(r.length-1,r.length)?"":"&",r+=t+"="+m[t];return new s({sourceLayer:i,popupTemplate:new p({title:i.title,content:'<iframe src="'+r+'" frameborder="0" marginwidth="0" marginheight="0">'+e.data+"</iframe>"})})})},f.prototype.findSublayerById=function(e){return this.allSublayers.find(function(r){return r.id===e})},f.prototype.importLayerViewModule=function(r){switch(r.type){case"2d":return m.create(function(r){return e(["../views/2d/layers/WMSLayerView2D"],r)});case"3d":return m.create(function(r){return e(["../views/3d/layers/WMSLayerView3D"],r)})}},f.prototype._fetchService=function(){var e=this;return m.resolve().then(function(){return e.resourceInfo?{data:e.resourceInfo}:(e.parsedUrl.query&&e.parsedUrl.query.service&&(e.parsedUrl.query.SERVICE=e.parsedUrl.query.service,delete e.parsedUrl.query.service),e.parsedUrl.query&&e.parsedUrl.query.request&&(e.parsedUrl.query.REQUEST=e.parsedUrl.query.request,delete e.parsedUrl.query.request),l(e.parsedUrl.path,{query:t({SERVICE:"WMS",REQUEST:"GetCapabilities"},e.parsedUrl.query,e.customParameters),responseType:"xml"}))}).then(function(r){if(!e.resourceInfo){r.data=R.parseCapabilities(r.data);var t=new n(e.parsedUrl.path);"https"!==t.scheme||t.port&&"443"!==t.port||-1!==i.request.httpsDomains.indexOf(t.host)||i.request.httpsDomains.push(t.host)}r.data&&e.read(r.data,{origin:"service"})})},f.prototype._mixCustomParameters=function(e){if(!this.customLayerParameters&&!this.customParameters)return e;var r=t({},this.customParameters,this.customLayerParameters);for(var a in r)e[a.toLowerCase()]=r[a];return e},o([d.property({readOnly:!0})],f.prototype,"allSublayers",void 0),o([d.property({json:{write:!0}})],f.prototype,"customParameters",void 0),o([d.property({json:{write:!0}})],f.prototype,"customLayerParameters",void 0),o([d.property({type:String,json:{write:!0}})],f.prototype,"copyright",void 0),o([d.property()],f.prototype,"description",void 0),o([d.property({json:{origins:{service:{read:{source:"extent"}}}}})],f.prototype,"fullExtent",void 0),o([d.reader(["web-document","portal-item"],"fullExtent",["extent"])],f.prototype,"readFullExtentFromItemOrMap",null),o([d.writer(["web-document","portal-item"],"fullExtent")],f.prototype,"writeFullExtent",null),o([d.property()],f.prototype,"fullExtents",void 0),o([d.property({type:String,json:{write:{ignoreOrigin:!0}}})],f.prototype,"featureInfoFormat",void 0),o([d.property({type:String,json:{write:{ignoreOrigin:!0}}})],f.prototype,"featureInfoUrl",void 0),o([d.property({type:String,json:{origins:{"web-document":{read:{source:"format"},write:{target:"format"}}}}})],f.prototype,"imageFormat",void 0),o([d.reader("imageFormat",["supportedImageFormatTypes"])],f.prototype,"readImageFormat",null),o([d.property({type:Number,json:{read:{source:"maxHeight"},write:{target:"maxHeight"}}})],f.prototype,"imageMaxHeight",void 0),o([d.property({type:Number,json:{read:{source:"maxWidth"},write:{target:"maxWidth"}}})],f.prototype,"imageMaxWidth",void 0),o([d.property()],f.prototype,"imageTransparency",void 0),o([d.property({type:Boolean,json:{origins:{service:{read:{enabled:!1}}},read:{source:"showLegend"},write:{target:"showLegend"}}})],f.prototype,"legendEnabled",void 0),o([d.property({type:String,json:{write:{ignoreOrigin:!0}}})],f.prototype,"mapUrl",void 0),o([d.property()],f.prototype,"operationalLayerType",void 0),o([d.property({type:g,json:{origins:{service:{read:{source:"extent.spatialReference"}}},write:!1}})],f.prototype,"spatialReference",void 0),o([d.reader(["web-document","portal-item"],"spatialReference",["spatialReferences"])],f.prototype,"readSpatialReferenceFromItemOrDocument",null),o([d.property({type:[Number],json:{read:{source:"spatialReferences"},write:{ignoreOrigin:!0}}})],f.prototype,"spatialReferences",void 0),o([d.writer(["web-document","portal-item"],"spatialReferences")],f.prototype,"writeSpatialReferences",null),o([d.property({type:u.ofType(E),json:{write:{overridePolicy:function(e,r,t){if(L(this.allSublayers,t))return{ignoreOrigin:!0}}}}})],f.prototype,"sublayers",void 0),o([d.reader(["web-document","portal-item"],"sublayers",["layers","visibleLayers"])],f.prototype,"readSublayersFromItemOrMap",null),o([d.reader("service","sublayers",["layers"])],f.prototype,"readSublayers",null),o([d.writer("sublayers")],f.prototype,"writeSublayers",null),o([d.property({json:{read:!1},readOnly:!0,value:"wms"})],f.prototype,"type",void 0),o([d.property({type:String,json:{write:{ignoreOrigin:!0}}})],f.prototype,"version",void 0),f=o([d.subclass("esri.layers.WMSLayer")],f)}(d.declared(v,w,b,x,S))});