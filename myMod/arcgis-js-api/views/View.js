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

define(["../Graphic","../core/Accessor","../core/Collection","../core/CollectionFlattener","../core/Evented","../core/Handles","../core/lang","../core/Logger","../core/Promise","../core/watchUtils","../core/promiseUtils","../core/scheduling","../geometry/Extent","../geometry/HeightModelInfo","../geometry/SpatialReference","./LayerViewManager","./RefreshManager","./BasemapView","./GroundView","./support/DefaultsFromMap","./input/Input","./navigation/Navigation"],function(e,t,i,n,a,r,s,l,o,h,d,u,c,f,p,y,g,w,m,M,R,v){var V=l.getLogger("esri.views.View");return t.createSubclass([o,a],{declaredClass:"esri.views.View",properties:{allLayerViews:{readOnly:!0},basemapView:{},animation:{},resizing:{},interacting:{},graphics:{type:i.ofType(e)},groundView:{},defaultsFromMap:M,heightModelInfo:{readOnly:!0,type:f,dependsOn:["map.heightModelInfo?","defaultsFromMap.heightModelInfo"]},initialExtent:{readOnly:!0,type:c,dependsOn:["defaultsFromMap.extent"]},initialExtentRequired:{},layerViews:{type:i},map:{},ready:{readOnly:!0,dependsOn:["map","spatialReference","width","height","initialExtentRequired","initialExtent","defaultsFromMap.isSpatialReferenceDone","map.loaded?"]},size:{readOnly:!0,dependsOn:["width","height"],get:function(){return[this.width,this.height]}},spatialReference:{type:p,dependsOn:["defaultsFromMap.spatialReference","defaultsFromMap.vcsWkid","defaultsFromMap.latestVcsWkid"]},stationary:{dependsOn:["animation","interacting","resizing"]},type:{},updating:{},padding:{},width:{},height:{},cursor:{},spatialReferenceWarningDelay:1e3,renderContext:{},input:{readOnly:!0},navigation:{readOnly:!0}},constructor:function(e){this._viewHandles=new r,this._viewHandles.add(this.watch("ready",function(e,t){this._currentSpatialReference=e?this.spatialReference:null,this.notifyChange("spatialReference"),!e&&t&&this.layerViewManager.clear()}.bind(this))),this.allLayerViews=new n({root:this,rootCollectionNames:["basemapView.baseLayerViews","groundView.layerViews","layerViews","basemapView.referenceLayerViews"],getChildrenFunction:function(e){return e.layerViews}}),this.defaultsFromMap=new M({view:this}),this.input=new R,this.navigation=new v},getDefaults:function(){return s.mixin(this.inherited(arguments),{layerViews:[],graphics:[],padding:{left:0,top:0,right:0,bottom:0}})},initialize:function(){var e=this.validate().then(function(){this._isValid=!0,this.notifyChange("ready");var e=function(){return h.whenOnce(this,"ready").then(function(){return d.after(0)}.bind(this)).then(function(){if(!this.ready)return e()}.bind(this))}.bind(this);return e()}.bind(this));this.addResolvingPromise(e),this.basemapView=new w({view:this}),this.groundView=new m({view:this}),this.layerViewManager=new y({view:this}),this.refreshManager=new g({view:this}),this._resetInitialViewPropertiesFromContent();var t;h.init(this.defaultsFromMap,"isSpatialReferenceDone",function(e){var i=!!(this.map&&this.map.allLayers.length>0);e&&!this.spatialReference&&i||!t?e&&!this.spatialReference&&i&&!t&&(t=d.after(this.spatialReferenceWarningDelay),t.then(function(){V.warn("#spatialReference","no spatial reference could be derived from the currently added map layers")}).catch(function(){})):(t.cancel(),t=null)}.bind(this),!0)},destroy:function(){this.destroyed||(this.basemapView.destroy(),this.groundView.destroy(),this.destroyLayerViews(),this.refreshManager.destroy(),this.defaultsFromMap.destroy(),this.defaultsFromMap=null,this.navigation&&(this.navigation.destroy(),this._set("navigation",null)),this._viewHandles.destroy(),this.map=null)},destroyLayerViews:function(){this.layerViewManager.destroy()},_viewHandles:null,_isValid:!1,_readyCycleForced:!1,_userSpatialReference:null,_currentSpatialReference:null,animation:null,basemapView:null,groundView:null,graphics:null,heightModelInfo:null,_heightModelInfoGetter:function(){return this.getDefaultHeightModelInfo()},interacting:!1,layerViews:null,map:null,_mapSetter:function(e){e!==this._get("map")&&(e&&e.load&&e.load(),this._forceReadyCycle(),this._resetInitialViewPropertiesFromContent(),this._set("map",e))},padding:null,_readyGetter:function(){return!!(this._isValid&&!this._readyCycleForced&&this.map&&0!==this.width&&0!==this.height&&this.spatialReference&&(!this.map.load||this.map.loaded)&&(this._currentSpatialReference||!this.initialExtentRequired||this.initialExtent||this.defaultsFromMap&&this.defaultsFromMap.isSpatialReferenceDone)&&this.defaultsFromMap&&this.defaultsFromMap.isTileInfoDone&&this.isSpatialReferenceSupported(this.spatialReference))},spatialReference:null,_spatialReferenceGetter:function(){var e=this._userSpatialReference||this._currentSpatialReference||this.getDefaultSpatialReference()||null;return e&&this.isHeightModelInfoRequired&&this.defaultsFromMap&&(e=e.clone(),e.vcsWkid=this.defaultsFromMap.vcsWkid,e.latestVcsWkid=this.defaultsFromMap.latestVcsWkid),e},_spatialReferenceSetter:function(e){this._userSpatialReference=e,this._set("spatialReference",e)},stationary:!0,_stationaryGetter:function(){return!this.animation&&!this.interacting&&!this.resizing},type:null,updating:!1,initialExtentRequired:!0,initialExtent:null,_initialExtentGetter:function(){return this.defaultsFromMap&&this.defaultsFromMap.extent},cursor:"default",renderContext:null,input:null,navigation:null,whenLayerView:function(e){return this.layerViewManager.whenLayerView(e)},getDefaultSpatialReference:function(){return this.get("defaultsFromMap.spatialReference")},getDefaultHeightModelInfo:function(){return this.get("map.supportsHeightModelInfo")&&this.get("map.heightModelInfo")||this.get("defaultsFromMap.heightModelInfo")||null},validate:function(){return d.resolve()},isSpatialReferenceSupported:function(){return!0},isTileInfoRequired:function(){return!1},when:function(e,t,i){return this.isResolved()&&!this.ready&&V.warn("#when()",'Calling view.when() while the view is no longer ready but was already resolved once will resolve immediately. Use watchUtils.whenOnce(view, "ready").then(...) instead.'),this.inherited(arguments)},_resetInitialViewPropertiesFromContent:function(){if(this.defaultsFromMap){var e=this.defaultsFromMap.start.bind(this.defaultsFromMap);this.defaultsFromMap.reset(),this._currentSpatialReference=null,this.notifyChange("spatialReference"),this._viewHandles.remove("defaultsFromMap"),this._viewHandles.add([h.watch(this,"spatialReference",e),h.watch(this,"initialExtentRequired",e),u.schedule(e)],"defaultsFromMap")}},_forceReadyCycle:function(){this.ready&&(this._readyCycleForced=!0,h.whenFalseOnce(this,"ready",function(){this._readyCycleForced=!1,this.notifyChange("ready")}.bind(this)),this.notifyChange("ready"))}})});