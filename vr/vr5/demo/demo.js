'use strict';

/* eslint-env es6 */

class Demo {

    static get CAMERA_SETTINGS () {
        return {
            viewAngle: 40,
            near: 0.1,
            far: 10000
        };
    }

    constructor () {
        this._width;
        this._height;
        this._renderer;
        this._camera;
        this._aspect;
        this._settings;
        this._texture;
        this._box;
        this._container = document.querySelector('#container');

        this.clearContainer();
        this.createRenderer();

        this._onResize = this._onResize.bind(this);
        this._update = this._update.bind(this);
        this._onResize();

        this.createScene();
        this.createCamera();
        this.createMeshes();
        this.createLights();
        this.createFog();

        this._addEventListeners();
        requestAnimationFrame(this._update);
    }

    _update () {
        if (typeof this._texture !== 'undefined') {
            this._texture.offset.y	+= 0.008;
            this._texture.offset.y	%= 1;
            this._texture.needsUpdate = true;

            // move the camera back and forth
            var seconds		= Date.now() / 1000;
            var radius		= 0.70;
            var angle		= Math.sin(0.75 * seconds * Math.PI) / 4;
            //angle	= (seconds*Math.PI)/4;
            this._camera.position.x	= Math.cos(angle - Math.PI/2) * radius;
            this._camera.position.y	= Math.sin(angle - Math.PI/2) * radius;
            this._camera.rotation.z	= angle;
        }
        this._render();
    }

    _render () {
        this._renderer.render(this._scene, this._camera);
        requestAnimationFrame(this._update);
    }

    _onResize () {
        this._width = window.innerWidth;
        this._height = window.innerHeight;
        this._aspect = this._width / this._height;

        this._renderer.setSize(this._width, this._height);

        if (!this._camera) {
            return;
        }

        this._camera.aspect = this._aspect;
        this._camera.updateProjectionMatrix();
    }

    _addEventListeners () {
        window.addEventListener('resize', this._onResize);
    }

    clearContainer () {
        this._container.innerHTML = '';
    }

    createRenderer () {
        this._renderer = new THREE.WebGLRenderer({
            antialias: true, //ładniejszy output
            preserveDrawingBuffer : true //allow screenshot
        });
        //this._renderer.setClearColor( 0x000000, 1);
        this._renderer.setSize( window.innerWidth, window.innerHeight );
        this._container.appendChild(this._renderer.domElement);
    }

    createCamera () {
        this._settings = Demo.CAMERA_SETTINGS;
        this._camera = new THREE.PerspectiveCamera(
            this._settings.viewAngle,
            this._aspect,
            this._settings.near,
            this._settings.far
        );
        //this._camera.position.set(0, 0, 7);
        //this._camera.lookAt(this._scene.position)
    }

    createScene () {
        this._scene = new THREE.Scene();
    }

    createMeshes () {
        var geometry = new THREE.CylinderGeometry( 1, 1, 30, 32, 1, true );
        new THREE.TextureLoader().load( '/r34117y.github.io/img/flower-1.jpg', function (texture) {
            this._texture = texture;
            this._texture.wrapT	= THREE.RepeatWrapping;
            var material = new THREE.MeshLambertMaterial({color : 0xFFFFFF, map : this._texture});
            var mesh = new THREE.Mesh( geometry, material );
            mesh.rotation.x	= Math.PI/2;
            mesh.flipSided	= true;
            this._scene.add( mesh );
        }.bind(this));
    }

    createLights() {
        var light1, light2, light3, light4;
        if (typeof this._scene === 'undefined') {
            console.log("Próba inicjalizacji świateł bez inicjalizacji sceny");
        }
        light1 = new THREE.DirectionalLight( 0xff8000, 1.5 );
        light1.position.set( 1, 1, 0 ).normalize();
        this._scene.add( light1 );

        light2 = new THREE.DirectionalLight( 0xff8000, 1.5 );
        light2.position.set( -1, 1, 0 ).normalize();
        this._scene.add( light2 );

        light3 = new THREE.PointLight( 0x44FFAA, 15, 25 );
        light3.position.set( 0, -3, 0 );
        this._scene.add( light3 );

        light4 = new THREE.PointLight( 0x44FFAA, 15, 25 );
        light4.position.set( 3, 3, 0 );
        this._scene.add( light4 );
    }

    createFog() {
        if (typeof this._scene === 'undefined') {
            console.log("Próba inicjalizacji świateł bez inicjalizacji sceny");
        }

        //this._scene.add(new THREE.FogExp2( 0x000000, 0.15 ));
    }
}