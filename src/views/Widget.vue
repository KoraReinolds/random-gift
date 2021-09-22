<template>
  <div
    class="widget"
    ref="widget"
  >
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted
} from 'vue'
import * as THREE from 'three'

export default defineComponent({
  name: 'Widget',
  setup() {

    const widget = ref(document.createElement('div'))

    onMounted(() => {
      initScene()
    })

    const initScene = () => {

			const scene = new THREE.Scene()
			const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )

			const renderer = new THREE.WebGLRenderer()
			renderer.setSize( window.innerWidth, window.innerHeight )
      console.log(widget.value)
			widget.value.appendChild( renderer.domElement )

			const geometry = new THREE.BoxGeometry()
			const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
			const cube = new THREE.Mesh( geometry, material )
			scene.add( cube )

			camera.position.z = 5

			const animate = function () {
				requestAnimationFrame( animate )

				cube.rotation.x += 0.01
				cube.rotation.y += 0.01

				renderer.render( scene, camera )
			}

			animate()

    }

    // const loadThreeJS = () => {
    //   const script = document.createElement('script')
    //   script.setAttribute('type', 'text/javascript')
    //   script.setAttribute('src', 'https://threejs.org/build/three.js')
    //   script.setAttribute('defer', 'defer')
    //   document.body.appendChild(script)
    // }

    return {
      widget,
    }

  },
})
</script>

<style lang="scss">
.widget canvas {
  position: absolute;
  top: 0;
}
</style>
