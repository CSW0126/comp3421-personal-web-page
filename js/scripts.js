//title typing effect
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

//nav css control
const nav_css_control = () =>{
    const navLi = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            let sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 65) {
                current = section.getAttribute('id');
            }
        });
        navLi.forEach(li => {
            li.classList.replace("text-white", "text-gray-400")
            li.classList.replace("dark:text-white", 'dark:text-gray-400')
            document.querySelector('nav ul li a[href*= ' + current + ']').classList.replace("text-gray-400", "text-white")
            document.querySelector('nav ul li a[href*= ' + current + ']').classList.replace("dark:text-gray-400", "dark:text-white")
        });
    });

}

//btn onclick
document.getElementById("github_btn").onclick = function() {
    window.open(
        "https://github.com/CSW0126", "_blank");
};
document.getElementById("linkedIn_btn").onclick = function() {
    window.open(
        "https://www.linkedin.com/in/donald-cheung-36293b241/", "_blank"
    )
};
document.getElementById("tg_btn").onclick = function() {
    window.open(
        "https://t.me/wing0126","_blank"
    )
};

document.getElementById("unity_btn").onclick = function() {
    window.open(
        "https://www.youtube.com/watch?v=A6s3nRVm89k&ab_channel=ArthasKeW","_blank"
    )
};

document.getElementById("gameMaker_btn").onclick = function() {
    window.open(
        "https://github.com/CSW0126/2D-Game-Project","_blank"
    )
};

document.getElementById("NFT_btn").onclick = function() {
    window.open(
        "https://github.com/CSW0126/COMP3334_GroupProject-NFT-Marketplace","_blank"
    )
};

document.getElementById("Monopoly_btn").onclick = function() {
    window.open(
        "https://github.com/CSW0126/SE_Monopoly","_blank"
    )
};

document.getElementById("diet_app_btn").onclick = function() {
    window.open(
        "https://github.com/CSW0126/Mobile-Diet-App-comp-4342-project","_blank"
    )
};

document.getElementById("fyp_btn").onclick = function() {
    window.open(
        "https://github.com/CSW0126/Simulation-Game-for-Algorithm-Trading","_blank"
    )
};

document.getElementById("auction_house_btn").onclick = function() {
    window.open(
        "https://github.com/CSW0126/auction_house_project","_blank"
    )
};

//init
const init = () =>{
    my_title_init();
    nav_css_control();
    AOS.init();
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