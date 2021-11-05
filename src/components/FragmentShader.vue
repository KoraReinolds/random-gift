<template>
  <div
    class="fragment-shader"
    ref="widget"
  >

  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  watch,
} from 'vue'
import * as THREE from 'three'

export default defineComponent({
  name: 'FragmentShader',
  props: {
    color: {
      type: String,
      default: 'epic',
    },
    value: {
      type: Number,
      default: 0,
    }
  },
  setup(props) {

    const widget = ref(document.createElement('div'))
    const theme = ref('light')
    const getVector3ByColorName = (colorName: string) => {
      const style = getComputedStyle(document.body)
      const color = style.getPropertyValue(`--${colorName}-color`) || `rgb(0, 0, 0)`
      const [r, g, b] = color.slice(5, color.length - 1).split(', ')
      const vectorColor = new THREE.Vector3(+r/255, +g/255, +b/255)
      return vectorColor
    }
    let material: THREE.ShaderMaterial
    let intervalId: number

    watch(() => props.value, (value) => {
      if (intervalId) clearInterval(intervalId)
      let parts = 20
      let delta = (value - material.uniforms.u_current_value.value) / parts
      intervalId = setInterval(() => {
        parts = parts - 1
        material.uniforms.u_current_value.value += delta
        if (!parts) clearInterval(intervalId)
      }, 1000 / parts)
    })

    onMounted(() => {
      // TODE: remove this ugly logic
      theme.value = document
        .querySelector('.app')
        ?.contains(widget.value) ? 'light' : 'dark'
      initScene()
    })

    const initScene = () => {

      const vertexShader = `
        void main() {
          gl_Position = vec4( position, 1.0 );
        }`
      const fragmentShader = `
        #ifdef GL_ES
        precision mediump float;
        #endif

        uniform vec2 u_resolution;
        uniform vec2 u_mouse;
        uniform float u_time;
        uniform vec3 u_mix_color;
        uniform vec3 u_background;
        uniform float u_rotate;
        uniform float u_max_width;
        uniform float u_current_value;


        float random (in vec2 _st) {
          return fract(sin(dot(_st.xy, vec2(12.9898,78.233)))*43758.5453123);
        }

        float noise (in vec2 _st) {
          vec2 i = floor(_st);
          vec2 f = fract(_st);

          // Four corners in 2D of a tile
          float a = random(i);
          float b = random(i + vec2(1.0, 0.0));
          float c = random(i + vec2(0.0, 1.0));
          float d = random(i + vec2(1.0, 1.0));

          vec2 u = f * f * (3.0 - 2.0 * f);

          return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
        }

        float fbm ( in vec2 _st) {
          float v = 0.1;
          float a = 0.55;
          vec2 shift = vec2(100.0);
          // Rotate to reduce axial bias
          mat2 rot = mat2(cos(u_rotate), sin(u_rotate),
                          -sin(u_rotate), cos(u_rotate));
          for (int i = 0; i < 5; ++i) {
              v += a * noise(_st);
              _st = rot * _st * 2.0 + shift;
              a *= 0.5;
          }
          return v;
        }

        void main() {
          vec2 st = gl_FragCoord.xy/u_resolution.xy;
          st += st * abs(5.0);
          vec3 color = vec3(0.0);
          vec4 opacity_color = vec4(0.0);

          vec2 q = vec2(0.);
          q.x = fbm( st + 0.00*u_time);
          q.y = fbm( st + vec2(1.0));

          vec2 r = vec2(0.);
          r.x = fbm( st + 1.0*q + vec2(1.7,9.2)+ 0.15*u_time );
          r.y = fbm( st + 1.0*q + vec2(8.3,2.8)+ 0.126*u_time);

          float f = fbm(st+r);


          if (gl_FragCoord.x/u_max_width > u_current_value) {
            opacity_color = vec4(u_background, 1.0);
          } else {
            color = mix(vec3(0.101961,0.619608,0.666667),
                        vec3(0.666667,0.666667,0.498039),
                        clamp((f*f)*4.0,0.0,1.0));
  
            color = mix(color,
                        u_mix_color,
                        clamp(length(q),0.0,1.0));
  
            color = mix(color,
                        u_mix_color,
                        clamp(length(r.x),0.0,1.0));

            opacity_color = vec4((f*f*f+.6*f*f+.5*f)*color, 1.);

          }

          gl_FragColor = opacity_color;
        }`
			const scene = new THREE.Scene()
			const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
      const clock = new THREE.Clock()

			const renderer = new THREE.WebGLRenderer({ alpha: true })
      const { width, height } = widget.value.getBoundingClientRect()
			renderer.setSize( width, height )
			widget.value.appendChild( renderer.domElement )
			const geometry = new THREE.PlaneGeometry(2, 2)
      material = new THREE.ShaderMaterial( {

        uniforms: {
          
          u_mix_color: { value: getVector3ByColorName(props.color) },
          u_time: { value: 1.0 },
          u_resolution: { value: new THREE.Vector2(200, 200) },
          u_background: { value: getVector3ByColorName(`${theme.value}-grey`) },
          u_mouse: { value: { x: null, y: null } },
          u_rotate: { value: Math.random() },
          u_max_width: { value: width },
          u_current_value: { value: props.value },

        },

        vertexShader,

        fragmentShader,

      } );
			// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
			const cube = new THREE.Mesh( geometry, material )
			scene.add( cube )

			camera.position.z = 1

			const animate = function () {
				requestAnimationFrame( animate )

        material.uniforms.u_time.value = clock.getElapsedTime()

				renderer.render( scene, camera )
			}

			animate()

    }

    return {
      widget,
    }

  },
});
</script>

<style scoped lang="scss">

</style>
