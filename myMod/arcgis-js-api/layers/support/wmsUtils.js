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

define(["require","exports","../../core/Error","../../core/urlUtils","../../geometry/Extent","../../geometry/SpatialReference"],function(e,t,r,n,a,i){function s(e){if(e){if(h=-1,"string"==typeof e){e=(new DOMParser).parseFromString(e,"text/xml")}var t=e.documentElement;if("ServiceExceptionReport"===t.nodeName){var n=Array.prototype.slice.call(t.childNodes),i=n.map(function(e){return e.textContent}),s=i.join("\r\n");throw new r("wmslayer:wms-capabilities-xml-is-not-valid","The server returned errors when the WMS capabilities were requested.",s)}var u=c("Layer",t);if(u){var l,f="WMS_Capabilities"===t.nodeName||"WMT_MS_Capabilities"===t.nodeName?t.getAttribute("version"):"1.3.0",m=c("Service",t),g=p("Title",m,"")||p("Name",m,""),N=p("AccessConstraints",m,""),b=p("Abstract",m,""),v=parseInt(p("MaxWidth",m,5e3),10),A=parseInt(p("MaxHeight",m,5e3),10),E=c("Capability",t),L=y(t,"GetMap"),w=d(t,"GetMap"),R=x(u,f),M=0;if(Array.prototype.slice.call(E.childNodes).forEach(function(e){"Layer"===e.nodeName&&(0===M?l=e:1===M?(R.name&&(R.name="",R.sublayers.push(x(l,f))),R.sublayers.push(x(e,f))):R.sublayers.push(x(e,f)),M++)}),!R)return null;var O,C,F,I=R.fullExtents;if(O=R.sublayers,O||(O=[]),0===O.length&&O.push(R),!(C=R.extent)){var B=new a(O[0].extent);R.extent=B.toJSON(),C=R.extent}if(F=R.spatialReferences,!F.length&&O.length>0){var S=function(e){var t=[];return e.sublayers.forEach(function(e){!t.length&&e.spatialReferences.length&&(t=e.spatialReferences||S(e))}),t};O.forEach(function(e){F.length||(F=e.spatialReferences||S(e))})}var U,_=d(t,"GetFeatureInfo");if(_){var T=y(t,"GetFeatureInfo");T.indexOf("text/html")>-1?U="text/html":T.indexOf("text/plain")>-1&&(U="text/plain")}if(!U){var q=function(e){e&&(e.queryable=!1,e.sublayers&&e.sublayers.forEach(function(e){q(e)}))};q(R)}return{copyright:N,description:b,extent:C,fullExtents:I,featureInfoFormat:U,featureInfoUrl:_,mapUrl:w,maxImageWidth:v,maxImageHeight:A,layers:o(O),spatialReferences:F,supportedImageFormatTypes:L,title:g,version:f}}}}function u(e){return N.some(function(t){var r=t[0],n=t[1];return e>=r&&e<=n})}function l(e){return e.length?e.filter(function(e){return e.popupEnabled&&e.name&&e.queryable}).map(function(e){return e.name}).join(","):""}function o(e){var t=[];return e.forEach(function(e){t.push(e),e.sublayers&&e.sublayers.length&&(t=t.concat(o(e.sublayers)),delete e.sublayers)}),t}function f(e,t,r,n){var a=c(e,r);return a?a.getAttribute(t):n}function c(e,t){var r=t&&t.getElementsByTagName(e);return r&&r.length>0?r[0]:null}function p(e,t,r){var n=c(e,t);return n?n.textContent:r}function m(e,t,r){if(!e)return null;var n,s,u,l,o=parseFloat(e.getAttribute("minx")),f=parseFloat(e.getAttribute("miny")),c=parseFloat(e.getAttribute("maxx")),p=parseFloat(e.getAttribute("maxy"));r?(n=isNaN(f)?-Number.MAX_VALUE:f,s=isNaN(o)?-Number.MAX_VALUE:o,u=isNaN(p)?Number.MAX_VALUE:p,l=isNaN(c)?Number.MAX_VALUE:c):(n=isNaN(o)?-Number.MAX_VALUE:o,s=isNaN(f)?-Number.MAX_VALUE:f,u=isNaN(c)?Number.MAX_VALUE:c,l=isNaN(p)?Number.MAX_VALUE:p);var m=new i({wkid:t});return new a({xmin:n,ymin:s,xmax:u,ymax:l,spatialReference:m})}function d(e,t){var r=c(t,e),n=c("DCPType",r);if(n){var a=c("HTTP",n);if(a){var i=c("Get",a);if(i){var s=f("OnlineResource","xlink:href",i,null);if(s)return s.indexOf("&")===s.length-1&&(s=s.substring(0,s.length-1)),g(s,["service","request"])}}}return null}function y(e,t){var r=e.getElementsByTagName("Operation");if(r&&r.length){var n=Array.prototype.slice.call(r),a=[];return n.forEach(function(e){if(e.getAttribute("name")===t){var r=e.getElementsByTagName("Format");Array.prototype.slice.call(r).forEach(function(e){a.push(e.textContent)})}}),a}var i=c(t,e),s=i.getElementsByTagName("Format");return Array.prototype.slice.call(s).map(function(e){return e.textContent})}function x(e,t){if(!e)return null;var r={id:h++,fullExtents:[],parentLayerId:null,queryable:"1"===e.getAttribute("queryable"),spatialReferences:[],sublayers:null},n=c("LatLonBoundingBox",e),s=c("EX_GeographicBoundingBox",e),l=null;n&&(l=m(n,4326)),s&&(l=new a(0,0,0,0,new i({wkid:4326})),l.xmin=parseFloat(p("westBoundLongitude",s,0)),l.ymin=parseFloat(p("southBoundLatitude",s,0)),l.xmax=parseFloat(p("eastBoundLongitude",s,0)),l.ymax=parseFloat(p("northBoundLatitude",s,0))),n||s||(l=new a(-180,-90,180,90,new i({wkid:4326})));var o=["1.0.0","1.1.0","1.1.1"].indexOf(t)>-1?"SRS":"CRS";return Array.prototype.slice.call(e.childNodes).forEach(function(e){if("Name"===e.nodeName)r.name=e.textContent||"";else if("Title"===e.nodeName)r.title=e.textContent||"";else if("Abstract"===e.nodeName)r.description=e.textContent||"";else if("BoundingBox"===e.nodeName){var n=e.getAttribute(o);if(n&&0===n.indexOf("EPSG:")){var a=parseInt(n.substring(5),10);0===a||isNaN(a)||l||(l="1.3.0"===t?m(e,a,u(a)):m(e,a))}var i=n&&n.indexOf(":");if(i&&i>-1){var a=parseInt(n.substring(i+1,n.length),10);0===a||isNaN(a)||(a=b[a]?b[a]:a);var s="1.3.0"===t?m(e,a,u(a)):m(e,a);r.fullExtents.push(s)}}else if(e.nodeName===o){var f=e.textContent.split(" ");f.forEach(function(e){0===(e=e.indexOf(":")>-1?parseInt(e.split(":")[1],10):parseInt(e,10))||isNaN(e)||(b[e]&&(e=b[e]),-1===r.spatialReferences.indexOf(e)&&r.spatialReferences.push(e))})}else if("Style"!==e.nodeName||r.legendURL){if("Layer"===e.nodeName){var p=x(e,t);p&&(p.parentLayerId=r.id,r.sublayers||(r.sublayers=[]),r.sublayers.push(p))}}else{var d=c("LegendURL",e);if(d){var y=c("OnlineResource",d);y&&(r.legendURL=y.getAttribute("xlink:href"))}}}),r.extent=l&&l.toJSON(),r}function g(e,t){var r=[],a=n.urlToObject(e);for(var i in a.query)a.query.hasOwnProperty(i)&&-1===t.indexOf(i.toLowerCase())&&r.push(i+"="+a.query[i]);return a.path+(r.length?"?"+r.join("&"):"")}Object.defineProperty(t,"__esModule",{value:!0});var h,N=[[4001,4999],[2044,2045],[2081,2083],[2085,2086],[2093,2093],[2096,2098],[2105,2132],[2169,2170],[2176,2180],[2193,2193],[2200,2200],[2206,2212],[2319,2319],[2320,2462],[2523,2549],[2551,2735],[2738,2758],[2935,2941],[2953,2953],[3006,3030],[3034,3035],[3058,3059],[3068,3068],[3114,3118],[3126,3138],[3300,3301],[3328,3335],[3346,3346],[3350,3352],[3366,3366],[3416,3416],[20004,20032],[20064,20092],[21413,21423],[21473,21483],[21896,21899],[22171,22177],[22181,22187],[22191,22197],[25884,25884],[27205,27232],[27391,27398],[27492,27492],[28402,28432],[28462,28492],[30161,30179],[30800,30800],[31251,31259],[31275,31279],[31281,31290],[31466,31700]],b={84:4326,83:4269,27:4267};t.parseCapabilities=s,t.coordsReversed=u,t.getPopupLayers=l});