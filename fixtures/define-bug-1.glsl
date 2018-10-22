#ifdef WORLD
#ifdef HELLO

#pragma glslify: b = require('./define-bug-2.glsl')

float a(float x) {
  return b(x);
}

#else
float b(float x) { return pow(x, 50.0); }
float a(float x) { return b(+x) + b(-x); }
#endif
#else

float a(float x) {
  return x * 10.0;
}

#endif

#pragma glslify:export(a)
