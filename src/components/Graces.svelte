<script>
	import * as THREE from "three";
	import * as SC from "svelte-cubed";
	import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
    import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
	import { onMount } from "svelte";
    import lerp from 'lerp'
    
    const dracoLoader = new DRACOLoader()
    const loader = new GLTFLoader()
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
    dracoLoader.setDecoderConfig({ type: 'js' })
    loader.setDRACOLoader(dracoLoader)

    let model;
    let spot = new THREE.SpotLight();
    spot.position.set(0, 0, 8)

    let mouse = { x: 0, y: 0 };

    function handleMousemove(event) {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    }
    
    onMount(() => {
        loader.load("models/gltf/graces-draco2.glb", (gltf) => {
            console.log(gltf)
            model = gltf.scene.children[0].geometry;
        });
    });

    SC.onFrame(() => {
    // follow mouse with light
    spot.position.x = lerp((spot.position.x -0.5), mouse.x / 250, 0.1)
    spot.position.y = lerp((spot.position.y), -mouse.y / 250, 0.1)

    });
</script>

<div on:mousemove={handleMousemove}>
	<SC.Canvas
        antialias
        background={new THREE.Color('black')}
        fog={new THREE.FogExp2('black', 0, 20)}
        shadows={THREE.PCFShadowMap}
>
	{#if model}
         <SC.Mesh 
            geometry={model}
            material={new THREE.MeshStandardMaterial({
                color: '#474747',
                roughness: 0.9,
                metalness: 0.5
            })}
            scale={[1,1,1]}
            position={[0, -2.5, 0]}
            rotation={[0, -0.2, 0]}
            castShadow
            receiveShadow
        />
	{/if}

	<SC.PerspectiveCamera  position={[0, 0, 6]} fov={50} near={3} far={15}/>
	<SC.DirectionalLight color={0x435c72} intensity={0.08} position={[-100,0,-100]} />
	<SC.PointLight intensity={1} position={[0, 10, -10]}/>
    <SC.SpotLight
            intensity={8}
            position={spot.position.toArray()}
            penumbra={2}
            distance={10}
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            />
 </SC.Canvas>
</div>