const bg1 = () =>{
  // Three JS Template
  window.addEventListener('load', init, false);
  function init() {
    createWorld();
    createLights();
    //createGrid();
    createPrimitive();
    //---
    createParticleWord();
    animation();
  }
  //--------------------------------------------------------------------
  var scene, camera, renderer, container;
  var world = new THREE.Object3D();
  var _width, _height;
  function createWorld() {
    _width = window.innerWidth;
    _height= window.innerHeight;
    //---
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 4, 12);
  //   scene.background = new THREE.Color(0xF00000);
    //---
    camera = new THREE.PerspectiveCamera(35, _width/_height, 1, 1000);
    camera.position.set(0,0,8);
    //---
    renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
    renderer.setSize(_width, _height);
    renderer.shadowMap.enabled = true;
    //---
    document.getElementById("three_bg").appendChild(renderer.domElement);
    //---
    window.addEventListener('resize', onWindowResize, false);
  }
  function onWindowResize() {
    _width = window.innerWidth;
    _height = window.innerHeight;
    renderer.setSize(_width, _height);
    camera.aspect = _width / _height;
    camera.updateProjectionMatrix();
    console.log('- resize -');
  }
  //--------------------------------------------------------------------
  var _ambientLights, _lights;
  function createLights() {
    //_ambientLights = new THREE.AmbientLight(0xFFFFFF, 1);
    _ambientLights = new THREE.HemisphereLight(0x111111, 0x000000, 5);
    _lights = new THREE.PointLight(0xF00555, 0.5);
    _lights.position.set(0, 0, 3);
    _lights.castShadow = true;
    scene.add(_ambientLights);
    scene.add(_lights);
  }
  //--------------------------------------------------------------------
  var createParticleWord = function() {
    var geometry = new THREE.IcosahedronGeometry(0.7, 3);
    var circle_start = 10;
    
    for (var i = 0; i<120; i++) {
      var material = new THREE.MeshBasicMaterial( {
        color: 0x01D3EC,
        //color: 0xF00000,
        //wireframe:false
      } );
      var circle = new THREE.Mesh( geometry, material );
      circle.castShadow  = true;
      circle.receivedShadow = true;
      
      circle.position.x = -Math.random()* circle_start + Math.random()* circle_start;
      circle.position.z = -Math.random()* circle_start + Math.random()* circle_start;
      circle.position.y = -Math.random()* circle_start + Math.random()* circle_start;
      var circle_scale = Math.random()* 1;
      var circle_random = Math.random() * 1;
      circle.scale.set(circle_scale, circle_scale, circle_scale);
      //TweenMax.to(circle.scale, 1+circle_random, {x:0, y:0, z:0, yoyo:true, repeat:-1, delay:0.04*i, ease:Elastic.easeIn});
    //---
      var object_pos = world.children[ 0 ];
      var object_pos_range = 0;
      setInterval(function(){  
        object_pos.position.x = -Math.random() * object_pos_range + Math.random() * object_pos_range;
        object_pos.position.y = -Math.random() * object_pos_range + Math.random() * object_pos_range;
        object_pos.position.z = -Math.random() * object_pos_range + Math.random() * object_pos_range;
      }, 1000);
      world.add( circle );
    }
    scene.add(world);
  }
  //--------------------------------------------------------------------
  var primitiveElement = function() {
    this.mesh = new THREE.Object3D();
    var geo = new THREE.IcosahedronGeometry();
    var mat = new THREE.MeshBasicMaterial({color:0x500000, flatShading:false});
    var mesh = new THREE.Mesh(geo, mat);
    //---
    //this.mesh.add(mesh);
    //---
  }
  var _primitive;
  function createPrimitive() {
    _primitive = new primitiveElement();
    _primitive.mesh.scale.set(1,1,1);
    scene.add(_primitive.mesh);
  }
  function createGrid() {
    var gridHelper = new THREE.GridHelper(20, 20);
    gridHelper.position.y = -1;
    scene.add(gridHelper);
  }
  //--------------------------------------------------------------------
  var distx, momentumx, momentumy, momentumz;
  function animation() {
    var time = Date.now() * 0.003;
    _primitive.mesh.rotation.y += 0.003;
    world.rotation.y = Math.sin(time) * Math.PI / 180;
    world.rotation.z = Math.cos(time) * Math.PI / 180;
    var object_place = world.children[ 0 ];
    object_place.visible = false;
    //---
    for ( let i = 0, l = world.children.length; i < l; i ++ ) {
      var object = world.children[ i ];
      var object_left = world.children[ i-1 ];
      if (i>1) {
        //---
        //object.position.x += Math.sin(time + object_left.position.x) - object.position.x * 0.8;
        //object.position.y += Math.cos(time + object_left.position.y) - object.position.y * 0.8;
        TweenMax.to(object.position, 2, {
          x:Math.cos(object_left.position.x * Math.PI) * 1,
          y:Math.sin(object_left.position.y * Math.PI) * 1,
          z:Math.cos(object_left.position.z * Math.PI) * 1,
          //elay:0.001*i,
          //ease:Expo.easeOut
        });
        //---
      }
    }
    //---
    var object_speed = 0.6;
    var object_guide = world.children[ 1 ];
    object_guide.position.x += Math.sin(object_place.position.x) - object_guide.position.x * object_speed;
    object_guide.position.y += Math.cos(object_place.position.y) - object_guide.position.y * object_speed;
    object_guide.position.z += object_place.position.z - object_guide.position.z * object_speed;
    //---
    camera.lookAt(scene.position);
    //---
    requestAnimationFrame(animation);
    renderer.render(scene, camera);
  }
}

const bg2 = ()=>{
  class App {
      constructor(opts) {
          this.opts = Object.assign({}, App.defaultOpts, opts);
          this.world = new World();
          this.init();
      }
      init() {
          this.threeEnvironment();
          window.requestAnimationFrame(this.animate.bind(this));
      }
      threeEnvironment() {
          const light = new Light();
          this.world.sceneAdd(light.ambient);
          this.world.sceneAdd(light.sun);
          const lights = lightBalls(this.world, light.lights);
          const composition = new Composition({
              sideLength: 10,
              amount: 15,
              radius: 6,
              thickness: 2,
              offset: 0.3
          });
          this.world.sceneAdd(composition.tubes);
      }
      animate() {
          this.world.renderer.render(this.world.scene, this.world.camera);
          window.requestAnimationFrame(this.animate.bind(this));
      }
  }
  
  App.defaultOpts = {
      debug: false
  };
  function lightBalls(world, meshes) {
      const radius = 12.4;
      const mainTl = new TimelineMax();
      meshes.forEach(function (group) {
          world.sceneAdd(group);
          createAnimation(group);
      });
      function createAnimation(group) {
          const tl = new TimelineMax({
              yoyo: true
          });
          tl
              .set(group.position, {
                  x: THREE.Math.randInt(-2, 2) * radius + radius * 0.5,
                  z: THREE.Math.randInt(-2, 2) * radius + radius * 0.5
              })
              .to(group.position, 2, {
                  y: 18,
                  ease: Linear.easeNone
              })
              .to(
                  group.children[0],
                  1.2,
                  {
                      intensity: 4.0,
                      distance: 18,
                      ease: Linear.easeNone
                  },
                  "-=1.2"
              );
          tl.paused(true);
          mainTl.to(
              tl,
              1.2,
              {
                  progress: 1,
                  ease: SlowMo.ease.config(0.0, 0.1, true),
                  onComplete: createAnimation,
                  onCompleteParams: [group],
                  delay: THREE.Math.randFloat(0, 0.8)
              },
              mainTl.time()
          );
      }
  }
  class Light {
      constructor() {
          this.lights = [];
          this.ambient = null;
          this.sun = null;
          this.createLights();
          this.createAmbient();
          this.createSun();
      }
      createLights() {
          for (let i = 0; i < 3; i++) {
              const group = new THREE.Group();
              const light = new THREE.PointLight(0xf82c91);
              light.intensity = 4.0;
              light.distance = 6;
              light.decay = 1.0;
              group.add(light);
              const geometry = new THREE.SphereBufferGeometry(2, 16, 16);
              const material = new THREE.MeshBasicMaterial({
                  color: 0xf82c91
              });
              const mesh = new THREE.Mesh(geometry, material);
              group.add(mesh);
              group.position.set(0, -5, 0);
              this.lights.push(group);
          }
      }
      createAmbient() {
          this.ambient = new THREE.AmbientLight(0xffffff, 0.03);
      }
      createSun() {
          this.sun = new THREE.SpotLight(0xffffff); // 0.1
          this.sun.intensity = 0.4;
          this.sun.distance = 100;
          this.sun.angle = Math.PI;
          this.sun.penumbra = 2.0;
          this.sun.decay = 1.0;
          this.sun.position.set(0, 50, 0);
      }
  }
  class World {
      constructor(opts) {
          this.opts = Object.assign({}, World.defaultOpts, opts);
          this.init();
      }
      init() {
          this.initScene();
          this.initCamera();
          this.initRenderer();
          this.addRenderer();
          window.addEventListener("resize", this.resizeHandler.bind(this));
      }
      initScene() {
          this.scene = new THREE.Scene();
      }
      initCamera() {
          this.camera = new THREE.PerspectiveCamera(
              this.opts.camFov,
              window.innerWidth / window.innerHeight,
              this.opts.camNear,
              this.opts.camFar
          );
          this.camera.position.set(
              this.opts.camPosition.x,
              this.opts.camPosition.y,
              this.opts.camPosition.z
          );
          this.camera.lookAt(this.scene.position);
          this.scene.add(this.camera);
      }
      initRenderer() {
          this.renderer = new THREE.WebGLRenderer({
              alpha: true,
              antialias: true,
              logarithmicDepthBuffer: true
          });
          this.renderer.setSize(window.innerWidth, window.innerHeight);
  
          this.renderer.shadowMap.enabled = true;
          this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      }
      addRenderer() {
          this.opts.container.appendChild(this.renderer.domElement);
      }
      resizeHandler() {
          this.renderer.setSize(window.innerWidth, window.innerHeight);
          this.camera.aspect = window.innerWidth / window.innerHeight;
          this.camera.updateProjectionMatrix();
      }
      sceneAdd(obj) {
          this.scene.add(obj);
      }
  }
  World.defaultOpts = {
      container: document.getElementById("bg_2"),
      camPosition: new THREE.Vector3(150, 200, 400),
      camFov: 6,
      camNear: 0.1,
      camFar: 800
  };
  class Composition {
      constructor(opts) {
          this.opts = Object.assign({}, Composition.defaultOpts, opts);
          this.tube = Tube({
              amount: this.opts.amount,
              radius: this.opts.radius,
              thickness: this.opts.thickness
          });
          this.tubes = this.createTubes();
      }
      createRow() {
          const radius = this.opts.radius + this.opts.offset;
          const geometry = new THREE.Geometry();
          for (let i = 0; i < this.opts.sideLength; i++) {
              const t = this.tube.clone();
              t.translate(i * radius * 2, 0, 0);
              geometry.merge(t);
          }
          return geometry;
      }
      createTubes() {
          const row = this.createRow();
          const radius = this.opts.radius + this.opts.offset;
          const geometry = new THREE.Geometry();
  
          for (let i = 0; i < this.opts.sideLength; i++) {
              const r = row.clone();
              r.translate(0, 0, i * radius * 2);
              geometry.merge(r);
          }
          geometry.center();
          const bufferGeometry = new THREE.BufferGeometry().fromGeometry(geometry);
          const materials = [
              new THREE.MeshStandardMaterial({
                  color: 0x333333,
                  roughness: 1.0,
                  metalness: 0.0,
                  emissive: 0x000000,
                  flatShading: true,
                  side: THREE.DoubleSide
              }),
              new THREE.MeshStandardMaterial({
                  color: 0x333333,
                  roughness: 0.6,
                  metalness: 0.0,
                  emissive: 0x000000,
                  flatShading: true,
                  side: THREE.DoubleSide
              })
          ];
          const mesh = new THREE.Mesh(bufferGeometry, materials);
          return mesh;
      }
  }
  Composition.defaultOpts = {
      sideLength: 10,
      amount: 15,
      radius: 6,
      thickness: 2,
      offset: 0.3
  };
  function createShape({ innerRadius = 4, outerRadius = 6, fineness = 30 }) {
      const outer = getPath(outerRadius, fineness, false);
      const baseShape = new THREE.Shape(outer);
      const inner = getPath(innerRadius, fineness, true);
      const baseHole = new THREE.Path(inner);
      baseShape.holes.push(baseHole);
      return baseShape;
  }
  const getPath = (radius, fineness, reverse) => {
      const c = radius * 0.55191502449;
      const path = new THREE.CurvePath();
      path.curves = [
          new THREE.CubicBezierCurve(
              new THREE.Vector2(0, radius),
              new THREE.Vector2(c, radius),
              new THREE.Vector2(radius, c),
              new THREE.Vector2(radius, 0)
          ),
          new THREE.CubicBezierCurve(
              new THREE.Vector2(radius, 0),
              new THREE.Vector2(radius, -c),
              new THREE.Vector2(c, -radius),
              new THREE.Vector2(0, -radius)
          ),
          new THREE.CubicBezierCurve(
              new THREE.Vector2(0, -radius),
              new THREE.Vector2(-c, -radius),
              new THREE.Vector2(-radius, -c),
              new THREE.Vector2(-radius, 0)
          ),
          new THREE.CubicBezierCurve(
              new THREE.Vector2(-radius, 0),
              new THREE.Vector2(-radius, c),
              new THREE.Vector2(-c, radius),
              new THREE.Vector2(0, radius)
          )
      ];
      const points = path.getPoints(fineness);
      if (reverse) points.reverse();
      return points;
  };
  function Tube({ amount = 4, radius = 6, thickness = 2 }) {
      const shape = createShape({
          innerRadius: radius - thickness,
          outerRadius: radius,
          fineness: 14
      });
      const props = {
          amount: amount,
          bevelEnabled: true,
          bevelThickness: 0.3,
          bevelSize: 0.2,
          bevelSegments: 1
      };
      const geometry = new THREE.ExtrudeGeometry(shape, props);
      geometry.center();
      geometry.computeVertexNormals();
      for (var i = 0; i < geometry.faces.length; i++) {
          var face = geometry.faces[i];
          if (face.materialIndex == 1) {
              for (var j = 0; j < face.vertexNormals.length; j++) {
                  face.vertexNormals[j].z = 0;
                  face.vertexNormals[j].normalize();
              }
          }
      }
      geometry.rotateX(Math.PI * 0.5);
      geometry.rotateZ(Math.PI);
      return geometry;
  }
  const app = new App();
  
}

const bg4 = () =>{
  // Interstellar Three JS
  var renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.shadowMap.enabled = false;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.shadowMap.needsUpdate = true;


  document.getElementById("bg4").appendChild( renderer.domElement );
  window.addEventListener('resize', onWindowResize, false);
  function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
  }
  var camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 500 );
  var scene = new THREE.Scene();
  var cameraRange = 3;

  var setcolor = 0x010101;

  scene.background = new THREE.Color(setcolor)
  scene.fog = new THREE.Fog(setcolor, 2.5, 3.5);

  //-------------------------------------------------------------- SCENE

  var sceneGruop = new THREE.Object3D();
  var particularGruop = new THREE.Object3D();
  var modularGruop = new THREE.Object3D();

  function generateParticle(num, amp = 2) {
  var gmaterial = new THREE.MeshPhysicalMaterial({color:0xFFFFFF, side:THREE.DoubleSide});

  var gparticular = new THREE.CircleGeometry(0.2,5);

  for (var i = 1; i < num; i++) {
      var pscale = 0.001+Math.abs(mathRandom(0.03));
      var particular = new THREE.Mesh(gparticular, gmaterial);
      particular.position.set(mathRandom(amp),mathRandom(amp),mathRandom(amp));
      particular.rotation.set(mathRandom(),mathRandom(),mathRandom());
      particular.scale.set(pscale,pscale,pscale);
      particular.speedValue = mathRandom(1);

      particularGruop.add(particular);
  }
  }
  generateParticle(2000, 2);

  sceneGruop.add(particularGruop);
  scene.add(modularGruop);
  scene.add(sceneGruop);

  function mathRandom(num = 1) {
  var setNumber = - Math.random() * num + Math.random() * num;
  return setNumber;
  }

  //------------------------------------------------------------- INIT

  //------------------------------------------------------------- CAMERA
  camera.position.set(0, 0, cameraRange);
  var cameraValue = false;
  function cameraSet() {
    if (!cameraValue) {
        TweenMax.to(camera.position, 1, {z:cameraRange,ease:Power4.easeInOut});
        cameraValue = true;
    } else {
        TweenMax.to(camera.position, 1, {z:cameraRange,  x:0, y:0, ease:Power4.easeInOut});
        INTERSECTED = null;
        cameraValue = false;
    }
  }

  //------------------------------------------------------------- SCENE
  var ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.1);
  //scene.add(ambientLight);

  var light = new THREE.SpotLight(0xb4981d, 3);
  light.position.set(5, 5, 2);
  light.castShadow = true;
  light.shadow.mapSize.width = 10000;
  light.shadow.mapSize.height = light.shadow.mapSize.width;
  light.penumbra = 0.5;

  var lightBack = new THREE.PointLight(0xb4981d, 1);
  lightBack.position.set(0, -3, -1);

  scene.add(sceneGruop);
  scene.add(light);
  scene.add(lightBack);

  var rectSize = 2;
  var intensity = 100;
  var rectLight = new THREE.RectAreaLight( 0x004357, intensity,  rectSize, rectSize );
  rectLight.position.set( 0, 0, 1 );
  rectLight.lookAt( 0, 0, 0 );
  scene.add( rectLight )

  rectLightHelper = new THREE.RectAreaLightHelper( rectLight );
  //scene.add( rectLightHelper );

  //------------------------------------------------------------- RAYCASTER
  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2(), INTERSECTED;
  var intersected;

  function onMouseMove(event) {
  // event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }
  function onMouseDown(event) {
  onMouseMove(event);
  raycaster.setFromCamera(mouse, camera);
  var intersected = raycaster.intersectObjects(modularGruop.children);
  if (intersected.length > 0) {
      cameraValue = false;
      if (INTERSECTED != intersected[0].object) {
      if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
      
      INTERSECTED = intersected[0].object;
      INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
      INTERSECTED.material.emissive.setHex(0xFFFF00);
      //INTERSECTED.material.map = null;
      //lightBack.position.set(INTERSECTED.position.x,INTERSECTED.position.y,INTERSECTED.position.z);
      
      TweenMax.to(camera.position, 1, {
          x:INTERSECTED.position.x,
          y:INTERSECTED.position.y,
          z:INTERSECTED.position.z+3,
          ease:Power2.easeInOut
      });
      
      } else {
      if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
      INTERSECTED = null;
      
      }
  }
  // console.log(intersected.length);
  }
  function onMouseUp(event) {
  
  }

  window.addEventListener('mousedown', onMouseDown, false);
  window.addEventListener('mouseup', onMouseUp, false);
  window.addEventListener('mousemove', onMouseMove, false);

  //------------------------------------------------------------- RENDER
  var uSpeed = 0.1;
  function animate() {
  var time = performance.now() * 0.0003;
  requestAnimationFrame(animate);
  //---
  for (var i = 0, l = particularGruop.children.length; i<l; i++) {
      var newObject = particularGruop.children[i];
      newObject.rotation.x += newObject.speedValue/10;
      newObject.rotation.y += newObject.speedValue/10;
      newObject.rotation.z += newObject.speedValue/10;
      //---
      //newObject.position.y = Math.sin(time) * 3;
  };
  
  for (var i = 0, l = modularGruop.children.length; i<l; i++) {
      var newCubes = modularGruop.children[i];
      newCubes.rotation.x += 0.008;
      newCubes.rotation.y += 0.005;
      newCubes.rotation.z += 0.003;
      //---
      newCubes.position.x = Math.sin(time * newCubes.positionZ) * newCubes.positionY;
      newCubes.position.y = Math.cos(time * newCubes.positionX) * newCubes.positionZ;
      newCubes.position.z = Math.sin(time * newCubes.positionY) * newCubes.positionX;
  }
  //---
  particularGruop.rotation.y += 0.005;
  //---
  modularGruop.rotation.y -= ((mouse.x * 4) + modularGruop.rotation.y) * uSpeed;
  modularGruop.rotation.x -= ((-mouse.y * 4) + modularGruop.rotation.x) * uSpeed;
  camera.lookAt(scene.position);
  renderer.render( scene, camera );  
  }

  animate();
}

const bg5 = () =>{
  // Three JS
  window.addEventListener('load', init, false);
  function init() {
  console.log('Init Functions');
  createWorld();
  createLights();
  createBoat();
  createGrid();
  createOcean();
  animation();
  }
  var Theme = {
  //_dark:0xFFFFFF,
  _dark:0x010101,   // Background
  _cont:0xFFD3D3,   // Lines
  _blue:0x000FFF,
  _red:0xF00000,      //
  _cyan:0x00FFFF,   // Material
  _white:0x019DB0   // Lights
  }
  var scene, camera, renderer, container;
  var _width, _height;
  var _ambientLights, _lights, _rectAreaLight;
  var _ocean;
  var _boatGroup = new THREE.Object3D();
  //--------------------------------------------------------------------
  function createWorld() {
  _width = window.innerWidth;
  _height= window.innerHeight;
  //---
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(Theme._dark, 5, 20);
  scene.background = new THREE.Color(Theme._dark);
  //---
  camera = new THREE.PerspectiveCamera(20, _width/_height, 1, 1000);
  camera.position.set(0,2,10);
  //---
  renderer = new THREE.WebGLRenderer({antialias:true, alpha:false});
  renderer.setSize(_width, _height);
  renderer.shadowMap.enabled = true;
  //---
  document.getElementById("bg5").appendChild(renderer.domElement);
  //---
  window.addEventListener('resize', onWindowResize, false);
  }
  function onWindowResize() {
  _width = window.innerWidth;
  _height = window.innerHeight;
  renderer.setSize(_width, _height);
  camera.aspect = _width / _height;
  camera.updateProjectionMatrix();
  }
  //--------------------------------------------------------------------
  function createLights() {
  _ambientLights = new THREE.HemisphereLight(Theme._cont, Theme._white, 2);
  _backlight = new THREE.PointLight(Theme._white, 1);
  _backlight.position.set(-5,-20,-20);
  _rectAreaLight = new THREE.RectAreaLight(Theme._white, 20, 3, 3);
  _rectAreaLight.position.set(2,2,-20);
  //---
  _rectAreaLightHelper = new THREE.RectAreaLightHelper(_rectAreaLight);
  //---
  _frontlight = new THREE.PointLight(Theme._white, 0.1);
  _frontlight.position.set(0,2,-2);
  scene.add(_backlight);
  scene.add(_ambientLights);
  scene.add(_rectAreaLight);
  scene.add(_frontlight);
  //scene.add(_rectAreaLightHelper);
  }
  //--------------------------------------------------------------------
  boatElement = function() {
  var boatGeo = new THREE.CubeGeometry();
  var boatMat = new THREE.MeshStandardMaterial({color:Theme._white});
  this.boat = new THREE.Object3D();
  this.boat = new THREE.Mesh(boatGeo, boatMat);
  this.boat.castShadow = true;
  this.boat.vel = 1+Math.random()*4;
  this.boat.amp = 1+Math.random()*6;
  this.boat.pos = Math.random()*.2;
  // this.boat.add(this.boat);
  }
  boatElement.prototype.movePosition = function(moveValue = 1) {
  this.boat.position.x = -Math.random() * moveValue + Math.random() * moveValue;
  this.boat.position.z = -Math.random() * moveValue + Math.random() * moveValue;
  this.boat.rotation.y = (Math.random()*360) * Math.PI / 180;
  }
  boatElement.prototype.sizeElement = function(sizeValue = 1) {
  this.boat.scale.z = this.boat.scale.x = Math.random() * sizeValue;
  this.boat.scale.y = 0.5+Math.random() * (sizeValue * 2);
  }
  function createBoat(boatValue = 5) {
  for (var i = 0; i<boatValue; i++){
      var _boatElementItem = new boatElement();
      _boatElementItem.movePosition(5);
      _boatElementItem.sizeElement();
      _boatGroup.add(_boatElementItem.boat);
  };
  scene.add(_boatGroup);
  console.log('Hello Boat');
  }
  oceanElement = function(wirefr = true, geo_frag = 25) {
  var geo_size = 25;
  var geo = new THREE.PlaneGeometry(geo_size,geo_size,geo_frag,geo_frag);
  geo.mergeVertices();
  this.mesh = new THREE.Object3D();
  var l = geo.vertices.length;
  this.waves = [];
  //---
  for (var i = 0; i<l; i++) {
      var v = geo.vertices[i];
      this.waves.push({
      y:v.y,
      x:v.x,
      z:v.z,
      ang:Math.PI*2,
      amp:Math.random()*(0.2),
      speed:0.03+Math.random()*0.05
      });
  };
  var wmat = new THREE.MeshPhysicalMaterial({color:Theme._white, wireframe:true, transparent:false, opacity:1 });
  var mat = new THREE.MeshPhysicalMaterial({color:Theme._white, transparent:true, opacity:0.85, wireframe:false});
  this.wire = new THREE.Mesh(geo, wmat);
  this.mesh = new THREE.Mesh(geo, mat);
  if (wirefr) this.mesh.add(this.wire);
  // this.mesh.add(this.mesh);
  this.mesh.reseivedShadow = true;
  this.mesh.rotation.x = -90 * Math.PI / 180;
  }
  oceanElement.prototype.moveVertices = function() {
  var verts = this.mesh.geometry.vertices;
  var l = verts.length;
  //---
  for (var i= 0; i<l; i++) {
      var v = verts[i];
      var vpros = this.waves[i];
      v.x = vpros.x + Math.cos(vpros.ang)*vpros.amp;
      v.y = vpros.y + Math.sin(vpros.ang/2)*vpros.amp;
      v.z = vpros.z + Math.cos(vpros.ang/3)*vpros.amp;
      vpros.ang += vpros.speed;
  };
  this.mesh.geometry.verticesNeedUpdate = true;
  this.mesh.geometry.morphTargetsNeedUpdate = true;
  }
  function createOcean() {
  _ocean = new oceanElement();
  _ocean.mesh.scale.set(1,1,1);
  scene.add(_ocean.mesh);
  }
  function createGrid(_gridY = -1) {
  var gridHelper = new THREE.GridHelper(20, 20);
  gridHelper.position.y = _gridY;
  scene.add(gridHelper);
  }
  //--------------------------------------------------------------------
  function animation() {
  var time = Date.now()*0.003;
  //---
  camera.lookAt(scene.position);
  _rectAreaLight.lookAt(scene.position);
  //---
  _ocean.moveVertices();
  for(var i = 0, l = _boatGroup.children.length; i<l; i++) {
      var _boatChildrens = _boatGroup.children[i];
      _boatChildrens.rotation.z = (Math.sin(time / _boatChildrens.vel) * _boatChildrens.amp) * Math.PI / 180;
      _boatChildrens.rotation.x = (Math.cos(time) *_boatChildrens.vel) * Math.PI / 180;
      _boatChildrens.position.y = Math.sin(time / _boatChildrens.vel) * _boatChildrens.pos;
  }
  //_ocean.mesh.rotation.z += 0.002;
  //---
  scene.rotation.y += 0.001;
  requestAnimationFrame(animation);
  renderer.render(scene, camera);
  }
}

bg1()
bg2()
bg4()
bg5()