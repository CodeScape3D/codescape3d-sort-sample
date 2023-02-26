import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Mesa = () => {
  const mountRef = useRef(null);
  const { array } = useSelector((state) => state.bubleSort);

  let cardMeshes = [];
  const scene = new THREE.Scene();

  useEffect(() => {
    //Data from the canvas
    const currentRef = mountRef.current;
    const { clientWidth: width, clientHeight: height } = currentRef;

    // camera, renderer

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

    createCards();

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
  }, [cardMeshes]);

  const createCards = () => {
    // Eliminar las cartas antiguas de la escena
    cardMeshes.forEach((cardMesh) => scene.remove(cardMesh));

    // Crear nuevas cartas
    cardMeshes = [];
    const cardGroup = new THREE.Group();
    for (let i = 0; i < array.length; i++) {
      // Crear la geometría y material de la carta
      const cardGeometry = new THREE.BoxGeometry(0.15, 0.01, 0.25);
      const cardMaterial = new THREE.MeshPhysicalMaterial({ color: 0xfffeee });

      // Crear la malla de la carta
      const cardMesh = new THREE.Mesh(cardGeometry, cardMaterial);
      cardMesh.position.y = 0.63;
      cardMesh.position.z = 0;
      cardMesh.position.x = (i - array.length / 2) * 0.17;

      // Agregar el número como hijo de la carta
      const numberTexture = new THREE.CanvasTexture(
        createNumberCanvas(array[i])
      );
      const numberMaterial = new THREE.MeshStandardMaterial({
        map: numberTexture,
        color: 0x000000,
        transparent: true,
      });
      const numberGeometry = new THREE.PlaneGeometry(0.1, 0.1);
      const numberMesh = new THREE.Mesh(numberGeometry, numberMaterial);
      numberMesh.position.set(0, 0.01, 0);
      numberMesh.rotateX(-Math.PI / 2);
      cardMesh.add(numberMesh);
      cardMeshes.push(cardMesh);
      cardGroup.add(cardMesh);
    }

    cardGroup.rotateY(Math.PI / 2);
    cardGroup.position.z = -0.1;
    scene.add(cardGroup);
  };

  function createNumberCanvas(number) {
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#fff";
    ctx.font = "bold 20px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(number.toString(), 16, 16);
    return canvas;
  }

  useEffect(() => {
    createCards();
  }, [array]);

  return (
    <div
      className="Contenedor3D"
      ref={mountRef}
      style={{ width: "50%", height: "90vh" }}
    ></div>
  );
};

export default Mesa;
