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

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","../core/Collection","../core/lang","../core/accessorSupport/decorators","./LineSymbol3DLayer","./PathSymbol3DLayer","./Symbol3D","./TextSymbol3DLayer"],function(e,r,o,t,l,n,y,i,s,a,p){var c=l.ofType({base:null,key:"type",typeMap:{line:i,text:p,path:s}});return function(e){function r(r){var o=e.call(this)||this;return o.symbolLayers=new c,o.type="line-3d",o}o(r,e),l=r,r.prototype.clone=function(){return new l({styleOrigin:n.clone(this.styleOrigin),symbolLayers:n.clone(this.symbolLayers),thumbnail:n.clone(this.thumbnail)})};var l;return t([y.property({type:c})],r.prototype,"symbolLayers",void 0),t([y.enumeration.serializable()({LineSymbol3D:"line-3d"})],r.prototype,"type",void 0),r=l=t([y.subclass("esri.symbols.LineSymbol3D")],r)}(y.declared(a))});