import React,{useEffect,useRef} from 'react'
import * as THREE from "three" 
import { OrbitControls,useGLTF,useTexture,useAnimations } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { color, texture } from 'three/tsl'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'


const Dog = () => {

  gsap.registerPlugin(useGSAP())
  gsap.registerPlugin(ScrollTrigger)

    const model = useGLTF('/models/dog.drc.glb')

    useThree(({camera,scene,gl})=>{
        camera.position.set(0, 0, 0.4)
        gl.toneMapping=THREE.ReinhardToneMapping
        gl.outputColorSpace=THREE.SRGBColorSpace

    })
    
    const {actions}=useAnimations(model.animations,model.scene)

    useEffect(()=>{
      actions["Take 001"].play()
    },[actions])
    const [normalMap] = (useTexture(["/dog_normals.jpg"])).map(texture=>{
      texture.flipY=false
      texture.colorSpace=THREE.SRGBColorSpace
      return texture
    })
    const [bNormal,bMap] = (useTexture(["/b_normals.jpg","/b_diffuse.jpg"])).map(texture=>{
      
      texture.colorSpace=THREE.SRGBColorSpace
      return texture
    })
    const [
      mat1,
      mat2,
      mat3,
      mat4,
      mat5,
      mat6,
      mat7,
      mat8,
      mat9,
      mat10,
      mat11,
      mat12,
      mat13,
      mat14,
      mat15,
      mat16,
      mat17,
      mat18,
      mat19,
    ]=(useTexture([
      "/matcap/mat-1.png",
      "/matcap/mat-2.png",
      "/matcap/mat-3.png",
      "/matcap/mat-4.png",
      "/matcap/mat-5.png",
      "/matcap/mat-6.png",
      "/matcap/mat-7.png",
      "/matcap/mat-8.png",
      "/matcap/mat-9.png",
      "/matcap/mat-10.png",
      "/matcap/mat-11.png",
      "/matcap/mat-12.png",
      "/matcap/mat-13.png",
      "/matcap/mat-14.png",
      "/matcap/mat-15.png",
      "/matcap/mat-16.png",
      "/matcap/mat-17.png",
      "/matcap/mat-18.png",
      "/matcap/mat-19.png",


    ])).map(texture=>{
      texture.flipY=false
      texture.colorSpace=THREE.SRGBColorSpace
      return texture
    })
    const material=useRef({
      umatcap1:{ value:mat2},
      umatcap2:{value:mat19},
      uprogress:{value:0.1}
    })
    
    const dogMaterial=new THREE.MeshMatcapMaterial({
      normalMap:normalMap,
      matcap:mat2
    })
    const bMaterial=new THREE.MeshMatcapMaterial({
      normalMap:bNormal,
      map:bMap
    })

    
    function onBeforeCompile(shader) {
      shader.uniforms.uMatcapTexture1 = material.current.umatcap1
      shader.uniforms.uMatcapTexture2 = material.current.umatcap2
      shader.uniforms.uProgress = material.current.uprogress

      // Store reference to shader uniforms for GSAP animation

      shader.fragmentShader = shader.fragmentShader.replace(
          "void main() {",
          `
      uniform sampler2D uMatcapTexture1;
      uniform sampler2D uMatcapTexture2;
      uniform float uProgress;

      void main() {
      `
      )

      shader.fragmentShader = shader.fragmentShader.replace(
          "vec4 matcapColor = texture2D( matcap, uv );",
          `
        vec4 matcapColor1 = texture2D( uMatcapTexture1, uv );
        vec4 matcapColor2 = texture2D( uMatcapTexture2, uv );
        float transitionFactor  = 0.2;
        
        float progress = smoothstep(uProgress - transitionFactor,uProgress, (vViewPosition.x+vViewPosition.y)*0.5 + 0.5);

        vec4 matcapColor = mix(matcapColor2, matcapColor1, progress );
      `
      )
  }

  dogMaterial.onBeforeCompile = onBeforeCompile





    model.scene.traverse((child)=>{
      if(child.name.includes("DOG")){
        child.material= dogMaterial
      }else{
        child.material= bMaterial
      }
    })
const dogModel=useRef(model)

    useGSAP(()=>{
      const tl=gsap.timeline({
        scrollTrigger:{
          trigger:"#section-1",
          endTrigger:"#section-5",
          start:"top top",
          end:"bottom bottom",
         
          scrub:true
        }
      })
      tl.to(dogModel.current.scene.position,{
        z:"-=0.5",
        y:"+=0.1"
      })
      .to(dogModel.current.scene.rotation,{
        x:`+=${Math.PI/15}`
      })
      .to(dogModel.current.scene.rotation,{
        y:`-=${Math.PI}`
      },"third")
      .to(dogModel.current.scene.position,{
        y:"+=0.1",
        z:"+=0.15",
        x:"-=0.6",

      },"third")
    },[])
    
    useEffect(() => {

      document.querySelector(`.class[img-title="tom"]`).addEventListener("mouseenter", () => {
          material.current.umatcap1.value = mat19
          gsap.to(material.current.uProgress, {
              value: 0.0,
              duration: 0.3,
              onComplete: () => {
                  material.current.umatcap2.value = material.current.umatcap1.value
                  material.current.uProgress.value = 1.0
              }
          })
      })
      document.querySelector(`.class[img-title="nav"]`).addEventListener("mouseenter", () => {

          material.current.umatcap1.value = mat8
          
          gsap.to(material.current.uProgress, {
              value: 0.0,
              duration: 0.3,
              onComplete: () => {
                  material.current.umatcap2.value = material.current.umatcap1.value
                  material.current.uProgress.value = 1.0
              }
          })
      })
      document.querySelector(`.class[img-title="msi"]`).addEventListener("mouseenter", () => {

          material.current.umatcap1.value = mat9
          
          gsap.to(material.current.uProgress, {
              value: 0.0,
              duration: 0.3,
              onComplete: () => {
                  material.current.umatcap2.value = material.current.umatcap1.value
                  material.current.uProgress.value = 1.0
              }
          })
      })
      document.querySelector(`.class[img-title="phone"]`).addEventListener("mouseenter", () => {

          material.current.umatcap1.value = mat12
          
          gsap.to(material.current.uProgress, {
              value: 0.0,
              duration: 0.3,
              onComplete: () => {
                  material.current.umatcap2.value = material.current.umatcap1.value
                  material.current.uProgress.value = 1.0
              }
          })
      })
      document.querySelector(`.class[img-title="fest"]`).addEventListener("mouseenter", () => {

          material.current.umatcap1.value = mat10
          
          gsap.to(material.current.uProgress, {
              value: 0.0,
              duration: 0.3,
              onComplete: () => {
                  material.current.umatcap2.value = material.current.umatcap1.value
                  material.current.uProgress.value = 1.0
              }
          })
      })
      document.querySelector(`.class[img-title="ken"]`).addEventListener("mouseenter", () => {

          material.current.umatcap1.value = mat8
          
          gsap.to(material.current.uProgress, {
              value: 0.0,
              duration: 0.3,
              onComplete: () => {
                  material.current.umatcap2.value = material.current.umatcap1.value
                  material.current.uProgress.value = 1.0
              }
          })
      })
      document.querySelector(`.class[img-title="opera"]`).addEventListener("mouseenter", () => {

          material.current.umatcap1.value = mat13
          
          gsap.to(material.current.uProgress, {
              value: 0.0,
              duration: 0.3,
              onComplete: () => {
                  material.current.umatcap2.value = material.current.umatcap1.value
                  material.current.uProgress.value = 1.0
              }
          })
      })
      document.querySelector(`.main`).addEventListener("mouseleave", () => {

          material.current.umatcap1.value = mat2
          
          gsap.to(material.current.uProgress, {
              value: 0.0,
              duration: 0.3,
              onComplete: () => {
                  material.current.umatcap2.value = material.current.umatcap1.value
                  material.current.uProgress.value = 1.0
              }
          })
      })

  }, [])

  return (
    <>
        <primitive object={model.scene} position={[0.25, -0.64, 0]} rotation={[0, Math.PI/7, 0]}/>
        <directionalLight position={[0, 5, 5]} intensity={100} color={0x9F2B68} />
        <OrbitControls />
    </>
  )
}

export default Dog