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

define(["require","exports","../../../support/buffer/BufferView","../../lib/Util"],function(e,r,f,t){function a(e,r,f,t,a){var i=f.typedBuffer,s=f.typedBufferStride,o=e.length;if(t*=s,null==a||1===a)for(var l=0;l<o;++l){var v=2*e[l];i[t]=r[v],i[t+1]=r[v+1],t+=s}else for(var l=0;l<o;++l)for(var v=2*e[l],u=0;u<a;++u)i[t]=r[v],i[t+1]=r[v+1],t+=s}function i(e,r,f,t,a){var i=f.typedBuffer,s=f.typedBufferStride,o=e.length;if(t*=s,null==a||1===a)for(var l=0;l<o;++l){var v=3*e[l];i[t]=r[v],i[t+1]=r[v+1],i[t+2]=r[v+2],t+=s}else for(var l=0;l<o;++l)for(var v=3*e[l],u=0;u<a;++u)i[t]=r[v],i[t+1]=r[v+1],i[t+2]=r[v+2],t+=s}function s(e,r,f,t,a){var i=f.typedBuffer,s=f.typedBufferStride,o=e.length;if(t*=s,null==a||1===a)for(var l=0;l<o;++l){var v=4*e[l];i[t]=r[v],i[t+1]=r[v+1],i[t+2]=r[v+2],i[t+3]=r[v+3],t+=s}else for(var l=0;l<o;++l)for(var v=4*e[l],u=0;u<a;++u)i[t]=r[v],i[t+1]=r[v+1],i[t+2]=r[v+2],i[t+3]=r[v+3],t+=s}function o(e,r,f,t,a,s){if(f){var o=f,l=t.typedBuffer,v=t.typedBufferStride,u=e.length;if(a*=v,null==s||1===s)for(var n=0;n<u;++n){var d=3*e[n],c=r[d],B=r[d+1],V=r[d+2];l[a]=o[0]*c+o[4]*B+o[8]*V+o[12],l[a+1]=o[1]*c+o[5]*B+o[9]*V+o[13],l[a+2]=o[2]*c+o[6]*B+o[10]*V+o[14],a+=v}else for(var n=0;n<u;++n)for(var d=3*e[n],c=r[d],B=r[d+1],V=r[d+2],p=o[0]*c+o[4]*B+o[8]*V+o[12],w=o[1]*c+o[5]*B+o[9]*V+o[13],y=o[2]*c+o[6]*B+o[10]*V+o[14],g=0;g<s;++g)l[a]=p,l[a+1]=w,l[a+2]=y,a+=v}else i(e,r,t,a,s)}function l(e,r,f,t,a,s){if(f){var o=f,l=t.typedBuffer,v=t.typedBufferStride,u=e.length;if(a*=v,null==s||1===s)for(var n=0;n<u;++n){var d=3*e[n],c=r[d],B=r[d+1],V=r[d+2];l[a]=o[0]*c+o[4]*B+o[8]*V,l[a+1]=o[1]*c+o[5]*B+o[9]*V,l[a+2]=o[2]*c+o[6]*B+o[10]*V,a+=v}else for(var n=0;n<u;++n)for(var d=3*e[n],c=r[d],B=r[d+1],V=r[d+2],p=o[0]*c+o[4]*B+o[8]*V,w=o[1]*c+o[5]*B+o[9]*V,y=o[2]*c+o[6]*B+o[10]*V,g=0;g<s;++g)l[a]=p,l[a+1]=w,l[a+2]=y,a+=v}else i(e,r,t,a,s)}function v(e,r,f,t,a,i){var s=t.typedBuffer,o=t.typedBufferStride,l=e.length;if(a*=o,null==i||1===i){if(4===f)for(var v=0;v<l;++v){var u=4*e[v];s[a]=r[u],s[a+1]=r[u+1],s[a+2]=r[u+2],s[a+3]=r[u+3],a+=o}else if(3===f)for(var v=0;v<l;++v){var u=3*e[v];s[a]=r[u],s[a+1]=r[u+1],s[a+2]=r[u+2],s[a+3]=255,a+=o}}else if(4===f)for(var v=0;v<l;++v)for(var u=4*e[v],n=0;n<i;++n)s[a]=r[u],s[a+1]=r[u+1],s[a+2]=r[u+2],s[a+3]=r[u+3],a+=o;else if(3===f)for(var v=0;v<l;++v)for(var u=3*e[v],n=0;n<i;++n)s[a]=r[u],s[a+1]=r[u+1],s[a+2]=r[u+2],s[a+3]=255,a+=o}function u(e,r,f,t,a,i,s){var o=a.typedBuffer,l=a.typedBufferStride,v=e.length;if(i*=l,null==s||1===s){if(4===f)for(var u=0;u<v;++u){var n=4*e[u];o[i]=r[n]*t[0],o[i+1]=r[n+1]*t[1],o[i+2]=r[n+2]*t[2],o[i+3]=r[n+3]*t[3],i+=l}else if(3===f)for(var d=255*t[3],u=0;u<v;++u){var n=3*e[u];o[i]=r[n]*t[0],o[i+1]=r[n+1]*t[1],o[i+2]=r[n+2]*t[2],o[i+3]=d,i+=l}}else if(4===f)for(var u=0;u<v;++u)for(var n=4*e[u],c=0;c<s;++c)o[i]=r[n]*t[0],o[i+1]=r[n+1]*t[1],o[i+2]=r[n+2]*t[2],o[i+3]=r[n+3]*t[3],i+=l;else if(3===f)for(var d=255*t[3],u=0;u<v;++u)for(var n=3*e[u],c=0;c<s;++c)o[i]=r[n]*t[0],o[i+1]=r[n+1]*t[1],o[i+2]=r[n+2]*t[2],o[i+3]=d,i+=l}function n(e,r,i,n,d,c,B){for(var V=0,p=i.fieldNames;V<p.length;V++){var w=p[V],y=e.vertexAttr[w],g=e.indices[w];if(y&&g)switch(w){case t.VertexAttrConstants.POSITION:t.assert(3===y.size);var z=c.getField(w,f.BufferViewVec3f);z&&o(g,y.data,n,z,B);break;case t.VertexAttrConstants.NORMAL:t.assert(3===y.size);var C=c.getField(w,f.BufferViewVec3f);C&&l(g,y.data,d,C,B);break;case t.VertexAttrConstants.UV0:t.assert(2===y.size);var O=c.getField(w,f.BufferViewVec2f);O&&a(g,y.data,O,B);break;case t.VertexAttrConstants.REGION:t.assert(4===y.size);var b=c.getField(w,f.BufferViewVec4u16);b&&s(g,y.data,b,B);break;case t.VertexAttrConstants.COLOR:t.assert(3===y.size||4===y.size);var h=c.getField(w,f.BufferViewVec4u8);h&&(r&&r.color?u(g,y.data,y.size,r.color,h,B):v(g,y.data,y.size,h,B));break;case t.VertexAttrConstants.SYMBOLCOLOR:t.assert(3===y.size||4===y.size);var A=c.getField(w,f.BufferViewVec4u8);A&&v(g,y.data,y.size,A,B)}}}Object.defineProperty(r,"__esModule",{value:!0}),r.writeBufferVec2=a,r.writeBufferVec3=i,r.writeBufferVec4=s,r.writePosition=o,r.writeNormal=l,r.writeColor=v,r.writeMultipliedColor=u,r.writeDefaultAttributes=n});