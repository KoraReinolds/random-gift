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
  onUnmounted,
} from 'vue' 
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js'
import { io } from 'socket.io-client'
import { useRoute } from 'vue-router'
import { axiosBackend } from '@/api'


export default defineComponent({
  name: 'Widget',
  props: {
    id: {
      type: String,
    }
  },
  setup() {

    const route = useRoute()
    const channelId = route.query.id

    if (channelId && typeof channelId === 'string') {
      const socket = io(process.env.VUE_APP_BACKEND_URI)
      socket.on(channelId, (msg) => {
        console.log(msg)
      })
    }

    const widget = ref(document.createElement('div'))
    const notifyAll = (active: boolean) => axiosBackend.post(
      'emitWidgetStatus',
      { active, channelId }
    )
    let intervalId: number

    onMounted(() => {
      // initScene()
      notifyAll(true)
      intervalId = setInterval(() => notifyAll(true), 30000)
    })

    onUnmounted(() => {
      axiosBackend.post('emitWidgetStatus', { active: false })
      notifyAll(false)
      clearInterval(intervalId)
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
</style>
