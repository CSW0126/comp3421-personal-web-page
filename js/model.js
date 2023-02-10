import * as THREE from 'three';
import { GLTFLoader } from './GLTFLoader';

export const phone = () =>{
    const canvas = document.querySelector('.webgl')
    const scene = THREE.Scene()

    const loader = new GLTFLoader()
    loader.load('../assets/iphone-11.glb', function(glb){
        console.log(glb)
        const root = glb.scene
        root.scale.set(0.03,0.03,0.03)
        scene.add(root)
    },function(xhr){
        console.log((xhr.loaded/xhr.total*100) + " % loaded")
    },function(error){
        console.log(error)
    })

    const light = new THREE.DirectionalLight(0xffffff, 1)
    scene.add(light)

    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }
    const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 100)
    camera.position.set(0,1,2)

}

