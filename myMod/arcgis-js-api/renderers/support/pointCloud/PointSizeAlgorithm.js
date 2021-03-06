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

define(["require","exports","../../../core/tsSupport/declareExtendsHelper","../../../core/tsSupport/decorateHelper","../../../core/JSONSupport","../../../core/kebabDictionary","../../../core/accessorSupport/decorators"],function(e,t,r,o,i,p,a){Object.defineProperty(t,"__esModule",{value:!0}),t.typeKebabDictionary=p({pointCloudFixedSizeAlgorithm:"fixed-size",pointCloudSplatAlgorithm:"splat"});var n=function(e){function i(){return null!==e&&e.apply(this,arguments)||this}return r(i,e),o([a.property({type:t.typeKebabDictionary.apiValues,readOnly:!0,nonNullable:!0,json:{type:t.typeKebabDictionary.jsonValues,read:!1,write:t.typeKebabDictionary.write}})],i.prototype,"type",void 0),i=o([a.subclass("esri.renderers.support.pointCloud.PointSizeAlgorithm")],i)}(a.declared(i));t.PointSizeAlgorithm=n,t.default=n});