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
  onMounted,
} from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

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

			const renderer = new THREE.WebGLRenderer({ alpha: true })
			renderer.setSize( window.innerWidth, window.innerHeight )
			widget.value.appendChild( renderer.domElement )


      const light = new THREE.AmbientLight(0xFFFFFF, 5)
			scene.add( light )

      const directionalLight = new THREE.DirectionalLight( 0xffffff, 3.5 )
      scene.add( directionalLight )

			camera.position.z = 10

			const animate = function () {
				requestAnimationFrame( animate )
				renderer.render( scene, camera )
			}

			animate()

      const loader = new GLTFLoader()

      loader.load(
        'knife.glb',
        gltf => {
          scene.add( gltf.scene )
        },
        xhr => {
          console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' )
        },
        error => {
          console.log( error, 'An error happened' )
        }
      );

    }

    return {
      widget,
    }

  },
})
</script>

<style lang="scss">
.widget {
  canvas {
  }
}
</style>
