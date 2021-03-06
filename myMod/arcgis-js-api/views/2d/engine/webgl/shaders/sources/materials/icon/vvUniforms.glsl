#if defined(VV_COLOR) || defined(VV_SIZE_MIN_MAX_VALUE) || defined(VV_SIZE_SCALE_STOPS) || defined(VV_SIZE_FIELD_STOPS) || defined(VV_SIZE_UNIT_VALUE) || defined(VV_OPACITY) || defined(VV_ROTATION)
attribute vec4 a_vv;
#endif // VV_COLOR || VV_SIZE_MIN_MAX_VALUE || VV_SIZE_SCALE_STOPS || VV_SIZE_FIELD_STOPS || VV_SIZE_UNIT_VALUE || VV_OPACITY || VV_ROTATION

#ifdef VV_COLOR
uniform float u_vvColorValues[8];
uniform vec4 u_vvColors[8];
#endif // VV_COLOR

#ifdef VV_SIZE_MIN_MAX_VALUE
uniform vec4 u_vvSizeMinMaxValue;
#endif // VV_SIZE_MIN_MAX_VALUE

#ifdef VV_SIZE_SCALE_STOPS
uniform float u_vvSizeScaleStopsValue;
#endif // VV_SIZE_SCALE_STOPS

#ifdef VV_SIZE_FIELD_STOPS
uniform float u_vvSizeFieldStopsValues[6];
uniform float u_vvSizeFieldStopsSizes[6];
#endif // VV_SIZE_FIELD_STOPS

#ifdef VV_SIZE_UNIT_VALUE
uniform float u_vvSizeUnitValueWorldToPixelsRatio;
#endif // VV_SIZE_UNIT_VALUE

#ifdef VV_OPACITY
uniform float u_vvOpacityValues[8];
uniform float u_vvOpacities[8];
#endif // VV_OPACITY

#ifdef VV_ROTATION
uniform lowp float u_vvRotationType;
#endif // VV_ROTATION
