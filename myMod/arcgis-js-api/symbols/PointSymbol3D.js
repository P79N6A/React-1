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

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","../core/Collection","../core/Error","../core/lang","../core/accessorSupport/decorators","./IconSymbol3DLayer","./ObjectSymbol3DLayer","./Symbol3D","./TextSymbol3DLayer","./callouts/calloutUtils","./support/Symbol3DVerticalOffset"],function(e,t,o,r,l,s,i,n,y,a,p,c,u,b){var f=l.ofType({base:null,key:"type",typeMap:{icon:y,object:a,text:c}});return function(e){function t(t){var o=e.call(this)||this;return o.verticalOffset=null,o.callout=null,o.symbolLayers=new f,o.type="point-3d",o}o(t,e),l=t,t.prototype.writeSymbolLayers=function(e,t,o,r){var l=e.filter(function(e){return"text"!==e.type});if(r&&r.messages&&l.length<e.length){var i=e.find(function(e){return"text"===e.type});r.messages.push(new s("symbol-layer:unsupported","Symbol layers of type 'text' cannot be persisted in PointSymbol3D",{symbolLayer:i}))}t[o]=l.map(function(e){return e.write({},r)}).toArray()},t.prototype.supportsCallout=function(){if(1!==(this.symbolLayers?this.symbolLayers.length:0))return!1;switch(this.symbolLayers.getItemAt(0).type){case"icon":case"text":case"object":return!0}return!1},t.prototype.hasVisibleCallout=function(){return u.hasVisibleCallout(this)},t.prototype.hasVisibleVerticalOffset=function(){return u.hasVisibleVerticalOffset(this)},t.prototype.clone=function(){return new l({verticalOffset:i.clone(this.verticalOffset),callout:i.clone(this.callout),styleOrigin:i.clone(this.styleOrigin),symbolLayers:i.clone(this.symbolLayers),thumbnail:i.clone(this.thumbnail)})};var l;return r([n.property({type:b.default,json:{write:!0}})],t.prototype,"verticalOffset",void 0),r([n.property(u.calloutProperty)],t.prototype,"callout",void 0),r([n.property({type:f})],t.prototype,"symbolLayers",void 0),r([n.writer("web-scene","symbolLayers")],t.prototype,"writeSymbolLayers",null),r([n.enumeration.serializable()({PointSymbol3D:"point-3d"})],t.prototype,"type",void 0),t=l=r([n.subclass("esri.symbols.PointSymbol3D")],t)}(n.declared(p))});