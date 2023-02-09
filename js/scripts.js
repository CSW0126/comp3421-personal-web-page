const my_title_init = () =>{
    var my_title = document.getElementById('my_title');

    var typewriter = new Typewriter(my_title, {
    loop: true,
    delay: 50,
    });

    typewriter
    .pauseFor(200)
    .typeString('App Developer')
    .pauseFor(1000)
    .deleteChars(13)
    .typeString('Software Engineer')
    .pauseFor(1000)
    .deleteChars(17)
    .typeString('Full-Stack Developer')
    .pauseFor(1000)
    .start();
}

const init = () =>{
    my_title_init();
}



// let scene, camera , renderer, starGeo, stars;
// const init = () =>{
//     scene = new THREE.Scene();
//     camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
//     camera.position.z = 1;
//     camera.rotation.x = Math.PI/2;

//     renderer = new THREE.WebGLRenderer();
//     renderer.setSize( window.innerWidth, window.innerHeight );
//     document.getElementById('three_bg').appendChild(renderer.domElement ) 

//     starGeo = new THREE.Geometry();
//     for(let i = 0; i<6000; i++){
//         star = new THREE.Vector3(
//             Math.random() * 600 -300,
//             Math.random() * 600 -300,
//             Math.random() * 600 -300   
//         )
//         starGeo.vertices.push(star)
//     }
//     let sprite = new THREE.TextureLoader().load('../assets/star.png')
//     let starMeterial = new THREE.PointsMaterial({
//         color: 0xaaaaaa,
//         size: 0.7,
//         map: sprite
//     })

//     stars = new THREE.Points(starGeo, starMeterial)
//     animate()
// }


// const animate = () => {
//     requestAnimationFrame( animate );
//     renderer.render( scene, camera );
// };

init();
AOS.init();