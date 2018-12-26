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

define(["require","exports","../../../../core/Logger","./CIMSymbolDrawHelper","./SDFHelper","../../../vectorTiles/GeometryUtils"],function(e,r,a,o,t,i){Object.defineProperty(r,"__esModule",{value:!0});var s=a.getLogger("esri/views/2d/engine/webgl/CIMSymbolHelper"),n=function(){function e(){}return e.getEnvelope=function(e){if("CIMPointSymbol"!==e.type)return null;var r=new o.EnvDrawHelper,a={type:"point",x:0,y:0};return r.drawSymbol(e,a),r.envelope()},e.rasterize=function(e,r){var a=this.getEnvelope(r);if(!a||a.width<=0||a.height<=0)return[null,0,0,0,0];var t=(a.x+.5*a.width)*(96/72),i=-(a.y+.5*a.height)*(96/72);e.width=a.width*(96/72)+2,e.height=a.height*(96/72)+2;var s=e.getContext("2d"),n=o.Transformation.createScale(96/72,-96/72);n.translate(.5*e.width-t,.5*e.height-i);var l=new o.CanvasDrawHelper(s,n),S={type:"point",x:0,y:0};l.drawSymbol(r,S);for(var h,c=s.getImageData(0,0,e.width,e.height),d=new Uint8Array(c.data),g=0;g<d.length;g+=4)h=d[g+3]/255,d[g]=d[g]*h,d[g+1]=d[g+1]*h,d[g+2]=d[g+2]*h;return[d,e.width,e.height,t/e.width,i/e.height]},e.fromSimpleMarker=function(e){var r,a,o=e.style;if("circle"===o||"esriSMSCircle"===o){var t=Math.acos(.995),s=Math.ceil(i.C_PI/t/4);0===s&&(s=1),t=i.C_PI_BY_2/s,s*=4;var n=[];n.push([50,0]);for(var l=1;l<s;l++)n.push([50*Math.cos(l*t),-50*Math.sin(l*t)]);n.push([50,0]),r={rings:[n]},a={xmin:-50,ymin:-50,xmax:50,ymax:50}}else if("cross"===o||"esriSMSCross"===o){var S=0;r={rings:[[[S,50],[S,S],[50,S],[50,-S],[S,-S],[S,-50],[-S,-50],[-S,-S],[-50,-S],[-50,S],[-S,S],[-S,50],[S,50]]]},a={xmin:-50,ymin:-50,xmax:50,ymax:50}}else if("diamond"===o||"esriSMSDiamond"===o)r={rings:[[[-50,0],[0,50],[50,0],[0,-50],[-50,0]]]},a={xmin:-50,ymin:-50,xmax:50,ymax:50};else if("square"===o||"esriSMSSquare"===o)r={rings:[[[-50,-50],[-50,50],[50,50],[50,-50],[-50,-50]]]},a={xmin:-50,ymin:-50,xmax:50,ymax:50};else if("x"===o||"esriSMSX"===o){var S=0;r={rings:[[[0,S],[50-S,50],[50,50-S],[S,0],[50,S-50],[50-S,-50],[0,-S],[S-50,-50],[-50,S-50],[-S,0],[-50,50-S],[S-50,50],[0,S]]]},a={xmin:-50,ymin:-50,xmax:50,ymax:50}}else if("triangle"===o||"esriSMSTriangle"===o){var h=57.735026918962575,c=-h,d=2/3*100-100;r={rings:[[[c,d],[0,2/3*100],[h,d],[c,d]]]},a={xmin:c,ymin:d,xmax:h,ymax:2/3*100}}var g;if(r&&a){var m=[{type:"CIMSolidFill",enable:!0,color:e.color}];e.outline&&m.push({type:"CIMSolidStroke",enable:!0,width:e.outline.width,color:e.outline.color});var y={type:"CIMPolygonSymbol",symbolLayers:m};g={type:"CIMPointSymbol",symbolLayers:[{type:"CIMVectorMarker",enable:!0,rotation:e.angle,size:e.size,offsetX:e.xoffset,offsetY:e.yoffset,frame:a,markerGraphics:[{type:"CIMMarkerGraphic",geometry:r,symbol:y}]}]}}return g},e}();r.CIMSymbolHelper=n;var l=function(){function e(){}return e.rasterizeSimpleFill=function(e,r){"solid"!==r&&"none"!==r&&"esriSFSSolid"!==r&&"esriSFSNull"!==r||console.error("Unexpected: style does not require rasterization"),e.width=8,e.height=8;var a=e.getContext("2d");a.strokeStyle="#FFFFFF",a.beginPath(),"vertical"!==r&&"cross"!==r&&"esriSFSCross"!==r&&"esriSFSVertical"!==r||(a.moveTo(0,0),a.lineTo(0,8)),"horizontal"!==r&&"cross"!==r&&"esriSFSCross"!==r&&"esriSFSHorizontal"!==r||(a.moveTo(0,0),a.lineTo(8,0)),"forward-diagonal"!==r&&"diagonal-cross"!==r&&"esriSFSDiagonalCross"!==r&&"esriSFSForwardDiagonal"!==r||(a.moveTo(0,0),a.lineTo(8,8)),"backward-diagonal"!==r&&"diagonal-cross"!==r&&"esriSFSBackwardDiagonal"!==r&&"esriSFSDiagonalCross"!==r||(a.moveTo(8,0),a.lineTo(0,8)),a.stroke();for(var o,t=a.getImageData(0,0,e.width,e.height),i=new Uint8Array(t.data),s=0;s<i.length;s+=4)o=i[s+3]/255,i[s]=i[s]*o,i[s+1]=i[s+1]*o,i[s+2]=i[s+2]*o;return[i,e.width,e.height]},e.rasterizeSimpleLine=function(e,r){var a;switch(r){case"dash":case"esriSLSDash":a=[3,2];break;case"dash-dot":case"esriSLSDashDot":a=[2,2,0,2];break;case"dot":case"esriSLSDot":a=[0,3];break;case"long-dash":case"esriSLSLongDash":a=[6,3];break;case"long-dash-dot":case"esriSLSLongDashDot":a=[6,3,0,3];break;case"long-dash-dot-dot":case"esriSLSDashDotDot":a=[2,2,0,2,0,2];break;case"short-dash":case"esriSLSShortDash":a=[2,2];break;case"short-dash-dot":case"esriSLSShortDashDot":a=[2,2,0,2];break;case"short-dash-dot-dot":case"esriSLSShortDashDotDot":a=[2,2,0,2,0,2];break;case"short-dot":case"esriSLSShortDot":a=[0,2];break;case"solid":case"esriSLSSolid":case"none":s.error("Unexpected: style does not require rasterization"),a=[0,0];break;default:s.error("Tried to rasterize SLS, but found an unexpected style: "+r+"!"),a=[0,0]}for(var o=0,i=0,n=a;i<n.length;i++){var l=n[i];o+=l}for(var S=16*o,h=31*S,c=new Float32Array(h),d=0;d<h;++d)c[d]=257;for(var g=.5,m=.5,y=!0,f=0,v=a;f<v.length;f++){var l=v[f];g=m,m+=16*l;for(var u=g;u<m;){for(var p=.5;p<31;){var d=(31-p+.5+1)*S+u-.5,x=(p-15.5)*(p-15.5);c[d]=y?x:Math.min((u-g)*(u-g)+x,(u-m)*(u-m)+x),p++}u++}y=!y}for(var b=c.length,w=new Uint8Array(4*b),d=0;d<b;++d){var D=Math.sqrt(c[d])/15;t.packFloat(D,w,4*d)}return[w,S,31]},e}();r.SymbolHelper=l});