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

define(["require","exports","../intersectionUtils","../../lib/gl-matrix"],function(e,r,t,i){function n(e,r,n,l){void 0===n&&(n=0),void 0===l&&(l=r);var a=e.state.constraints;if(r!==l&&l.copyFrom(r),!a.collision.enabled)return!1;var c=t.surfaceElevationBelowEye(e,r),d=e.renderCoordsHelper.getAltitude(r.eye),s=a.collision.elevationMargin,v=c+s;if(d>=v)return!1;var u=i.vec3d.length(l.eye);if(i.vec3d.subtract(l.center,l.eye,o),e.renderCoordsHelper.setAltitude(v,l.eye),1===n)i.vec3d.add(l.eye,o,l.center);else if(2===n){var y=(u-d+v)/u;i.vec3d.scale(l.center,y)}return l.markViewDirty(),!0}Object.defineProperty(r,"__esModule",{value:!0}),r.apply=n;var o=i.vec3d.create()});