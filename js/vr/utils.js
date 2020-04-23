function createCrosshair(cameraObj) {
    crosshair = new THREE.Mesh(
        new THREE.RingBufferGeometry( 0.02, 0.04, 32 ),
        new THREE.MeshBasicMaterial( {
            color: 0xffffff,
            opacity: 0.5,
            transparent: true
        } )
    );
    crosshair.position.z = - 2;
    cameraObj.add( crosshair );
}

function createBox()
{
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    return cube;
}