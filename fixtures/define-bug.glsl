precision mediump float;

#ifndef ANOTHER
#pragma glslify: a = require('./define-bug-1.glsl')
#pragma glslify: b = require('./define-bug-2.glsl')
#else
float a (float t) { return 2.0 * t; }
float b (float t) { return 3.0 * t; }
#endif

void main() {
	gl_FragColor = vec4(a(1.0), b(1.0), 0.0, 0.0);
}
