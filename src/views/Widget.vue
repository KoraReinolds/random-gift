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
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js'

export default defineComponent({
  name: 'Widget',
  setup() {

    const widget = ref(document.createElement('div'))

    onMounted(() => {
      initScene()
    })

    const initScene = () => {

      let mixer: THREE.AnimationMixer
      let exrCubeRenderTarget: any
      const clock = new THREE.Clock()
			const scene = new THREE.Scene()

      // init camera
			const camera = new THREE.PerspectiveCamera(
        75, window.innerWidth / window.innerHeight, 0.1, 1000
      )
      camera.position.z = 10

      // init renderer
			const renderer = new THREE.WebGLRenderer({ alpha: true })
      renderer.outputEncoding = THREE.sRGBEncoding
      renderer.physicallyCorrectLights = true
			renderer.setSize(window.innerWidth, window.innerHeight)
			widget.value.appendChild(renderer.domElement)

      // Orbit controls
      const controls = new OrbitControls(camera, renderer.domElement)
      controls.update()

      // init exr texture
      const pmremGenerator = new THREE.PMREMGenerator(renderer)
      pmremGenerator.compileEquirectangularShader()
      new EXRLoader().load('snowy_cemetery_4k.exr', texture => {
        exrCubeRenderTarget = pmremGenerator.fromEquirectangular(texture)
        texture.dispose()
      })

      // init model
      const loader = new GLTFLoader()
      loader.load(
        'watch.glb',
        gltf => {
          scene.add(gltf.scene)
          mixer = new THREE.AnimationMixer(gltf.scene)
          gltf.animations.forEach(clip => {
            mixer.clipAction( clip ).play()
          })
        },
        xhr => {
          console.log((xhr.loaded / xhr.total * 100) + '% loaded')
        },
        error => {
          console.log(error, 'An error happened')
        }
      )

			const animate = () => {
				requestAnimationFrame(animate)
        const delta = clock.getDelta()
        scene.traverse(child => {
          if ( !(child instanceof THREE.Mesh) ) return
          child.material.envMapIntensity = 2.0
          child.material.envMap = exrCubeRenderTarget?.texture
          child.material.needsUpdate = true
        })
        mixer?.update(delta)
				renderer.render(scene, camera)
			}

			animate()

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
