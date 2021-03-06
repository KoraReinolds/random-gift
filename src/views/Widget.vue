<template>
  <div
    class="widget"
    ref="widget"
  >
  </div>
</template>

<script setup lang="ts">
  import {
    defineProps,
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

  const props = defineProps<{
    id: string
  }>()

  const route = useRoute()
  const channelId = route.query.id

  if (channelId && typeof channelId === 'string') {
    const socket = io(process.env.VUE_APP_BACKEND_URI)
    socket.on(channelId, (msg) => {
      try {
        const { displayName, type, reward } = JSON.parse(msg)
        console.log(displayName, type, reward)
        showText(reward)
      } catch (e) {
        // error
      }
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

  let mixer: THREE.AnimationMixer
  let exrCubeRenderTarget: any
  let textFont: THREE.Font
  let textMesh1: THREE.Mesh<THREE.TextGeometry, THREE.MeshPhongMaterial[]>
  const clock = new THREE.Clock()
  const scene = new THREE.Scene()

  const showText = (text: string) => {
    const textGeo = new THREE.TextGeometry(text, {
      font: textFont,
      curveSegments: 4,
      height: 20,
      size: 70,
      bevelThickness: 2,
      bevelSize: 1.5,
    })

    textGeo.computeBoundingBox()
    textMesh1 = new THREE.Mesh( textGeo, [
      new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } ), // front
      new THREE.MeshPhongMaterial( { color: 0x111111 } ) // side
    ])

    if (textGeo.boundingBox) {
      const centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
      textMesh1.position.x = centerOffset;
      textMesh1.rotation.y = Math.PI * 2 
      textMesh1.position.z = 0;
    }

    scene.add(textMesh1)
    setTimeout(() => scene.remove(textMesh1), 5000)
  }
  
  const initScene = () => {

    // init camera
    const camera = new THREE.PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 0.1, 1000
    )
    camera.position.z = 1000

    // init renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.physicallyCorrectLights = true
    renderer.setSize(window.innerWidth, window.innerHeight)
    widget.value.appendChild(renderer.domElement)

    // Orbit controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.update()

    // font
    const fontLoader = new THREE.FontLoader()
    fontLoader.load('fonts/optimer_bold.typeface.json', (font) => textFont = font)

    // light
    const light = new THREE.AmbientLight(0x404040, 10)
    scene.add(light)

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


</script>

<style lang="scss">

</style>
