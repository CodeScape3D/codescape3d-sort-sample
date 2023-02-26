import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Mesa = () => {
  const mountRef = useRef(null);

  const { array } = useSelector((state) => state.bubleSort);

  useEffect(() => {
    //console.log(array);
  }, [array]);

  useEffect(() => {
    //Data from the canvas
    const currentRef = mountRef.current;
    const { clientWidth: width, clientHeight: height } = currentRef;

    // camera, renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeeeee);
    const camera = new THREE.PerspectiveCamera(27, width / height, 0.1, 100);
    scene.add(camera);
    camera.position.set(2, 3, 0);
    camera.lookAt(new THREE.Vector3());

    //creamos el render
    const renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.physicallyCorrectLights = true;
    renderer.setSize(width, height);
    currentRef.appendChild(renderer.domElement);

    //OrbitControls
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableDamping = true;

    //Resize canvas
    const resize = () => {
      renderer.setSize(currentRef.clientWidth, currentRef.clientHeight);
      camera.aspect = currentRef.clientWidth / currentRef.clientHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", resize);

    //env map
    const cubeTextureLoader = new THREE.CubeTextureLoader();
    const environmentMap = cubeTextureLoader.load([
      "./envMap/px.png",
      "./envMap/nx.png",
      "./envMap/py.png",
      "./envMap/ny.png",
      "./envMap/pz.png",
      "./envMap/nz.png",
    ]);

    scene.environment = environmentMap;

    const loader = new GLTFLoader();

    //loader mesa
    loader.load("./modelos/mesa/table.gltf", (gltf) => {
      gltf.scene.scale.set(1.8, 1.8, 1.8);
      scene.add(gltf.scene);
      castAndReceiveShadow();
    });

    //loader piso
    loader.load("./modelos/piso/piso.gltf", (gltf) => {
      gltf.scene.scale.set(1.8, 1.8, 1.8);
      gltf.scene.position.z = 3;
      gltf.scene.position.x = 2;
      scene.add(gltf.scene);
      castAndReceiveShadow();
    });

    /*
    //cargamos los datos del array
    // Variables para los objetos 3D
    // Crear los objetos 3D para representar los números del arreglo
    for (let i = 0; i < array.length; i++) {
      let cube = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.1, 0.1),
        new THREE.MeshBasicMaterial({ color: 0x00ff00 })
      );
      cube.position.x = (i - array.length / 4) *-1;
      cube.scale.y = array[i] / 40;
      cube.position.y = 1.5;
      scene.add(cube);
    }

    */
    //sombras
    const castAndReceiveShadow = () => {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    };

    //luz ambiental
    const ambientLight = new THREE.AmbientLight(0xffffff, 0);
    scene.add(ambientLight);

    //punto de luz
    const pointLight = new THREE.DirectionalLight(0xffffff, 1);
    pointLight.position.set(5, 10, 5);
    pointLight.castShadow = true;
    pointLight.shadow.mapSize.set(1024, 1024);
    pointLight.shadow.bias = -0.0001;
    pointLight.shadow.normalBias = 0.05;
    camera.add(pointLight);

    //Animate the scene
    const animate = () => {
      orbitControls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      currentRef.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      className="Contenedor3D"
      ref={mountRef}
      style={{ width: "50%", height: "90vh" }}
    ></div>
  );
};

export default Mesa;
