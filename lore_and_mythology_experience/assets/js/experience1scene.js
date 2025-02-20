import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/loaders/GLTFLoader.js';
import { TextureLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

export function experience1() {

    // Renderer for 3D environment
    let _threejs = new THREE.WebGLRenderer({ antialias: true });
    _threejs.shadowMap.enabled = true;
    _threejs.shadowMap.type = THREE.PCFSoftShadowMap;
    _threejs.setPixelRatio(window.devicePixelRatio);
    _threejs.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("scene").appendChild(_threejs.domElement);

    // Initialize parts of the scene

    // Initialize camera
    const fov = 60;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 1.0;
    const far = 15000.0;
    let _camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    _camera.position.set(0, 0, 10); // Set initial camera position

    // Handle resizes for scene
    window.addEventListener('resize', () => {
        _camera.aspect = window.innerWidth / window.innerHeight;
        _camera.updateProjectionMatrix();
        _threejs.setSize(window.innerWidth, window.innerHeight);
    }, false);

    // Initialize scene
    let _scene = new THREE.Scene();
    _scene.add(_camera);

    // Initialize lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    _scene.add(ambientLight);

    // Load the sun texture
    const textureLoader = new THREE.TextureLoader();
    const sunTexture = textureLoader.load('../assets/images/sun.png');

    // Create Sun Sprite
    const sunMaterial = new THREE.SpriteMaterial({
        map: sunTexture,
        color: 0xFFDF30,
        transparent: true,
        blending: THREE.AdditiveBlending,
    });

    const sunSprite = new THREE.Sprite(sunMaterial);
    sunSprite.scale.set(500, 500, 1);
    sunSprite.position.set(-5000, 3000, 1000); // Sun distance from origin
    sunSprite.frustumCulled = false;
    _scene.add(sunSprite);

    // Add Directional Light at the sun's position
    const sunLight = new THREE.DirectionalLight(0xFFFFFF, 3);
    sunLight.position.copy(sunSprite.position);
    sunLight.castShadow = true;

    // Configure shadow properties
    sunLight.shadow.bias = -0.0001;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;

    // Adjust the shadow camera to encompass the satellite
    const d = 100;
    sunLight.shadow.camera.left = -d;
    sunLight.shadow.camera.right = d;
    sunLight.shadow.camera.top = d;
    sunLight.shadow.camera.bottom = -d;
    sunLight.shadow.camera.near = 1;
    sunLight.shadow.camera.far = 10000;

    // Set the target of the light to the origin
    sunLight.target.position.set(0, 0, 0);
    _scene.add(sunLight.target);

    _scene.add(sunLight);

    const axesHelper = new THREE.AxesHelper(5);
    _scene.add(axesHelper);

    // Initialize controls
    //let _controls = new OrbitControls(_camera, _threejs.domElement);
    //_controls.target.set(0, 0, 0); // Center the controls on the satellite

    // Set initial camera rotation using spherical coordinates
    const radius = 10;
    //const theta = THREE.MathUtils.degToRad(195);
    const theta = THREE.MathUtils.degToRad(180);
    //const phi = THREE.MathUtils.degToRad(75);
    const phi = THREE.MathUtils.degToRad(45);
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    _camera.position.set(x - 3, y, z);
    _camera.lookAt(0, 0, 0);
    //_camera.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 12);

    // Ensure the camera is looking at the target
    //_camera.lookAt(_controls.target);
    //_camera.rotate.x = Math.PI / 4;
    //_camera.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 4);

    //_controls.enableZoom = true;
    //_controls.enableZoom = false;
    //_controls.minDistance = 3;
    //_controls.maxDistance = 1000;
    //_controls.enablePan = false;
    //_controls.screenSpacePanning = false;

    // Rotate the camera automatically
    //_controls.autoRotate = true;
    //_controls.autoRotateSpeed = 0.2;

    // Update controls to reflect the new position and rotation
    //_controls.update();

    // Initialize skybox
    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([
        '../assets/images/skybox/right.png',
        '../assets/images/skybox/left.png',
        '../assets/images/skybox/top.png',
        '../assets/images/skybox/bottom.png',
        '../assets/images/skybox/front.png',
        '../assets/images/skybox/back.png',
    ], undefined, undefined, (error) => {
        console.error('Error loading skybox texture:', error);
    });

    _scene.background = texture;

    // Initialize models
    const gltfLoader = new GLTFLoader();
    gltfLoader.load('../assets/models/satellite_light.glb', (gltf) => {
        // Configure model
        const model = gltf.scene;
        model.scale.set(0.25, 0.25, 0.25); // Set model scale
        model.position.set(0, 3, 0); // Set model position
        model.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 180);
        model.rotateOnAxis(new THREE.Vector3(0, 0, 1), Math.PI / 8);
        _scene.add(model); // Add model to scene
        //let _model = model;

        // Enable shadow casting
        model.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = false;
            }
        });

        // Log loading
    }, function(xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');

        // Log error to console
    }, undefined, (error) => {
        console.error('Error loading model:', error);
    });

    // Start rendering
    function animate() {
        _threejs.render(_scene, _camera);
    }
    _threejs.setAnimationLoop(animate);
}
