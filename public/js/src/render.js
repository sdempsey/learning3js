renderController = (function($) {
	var tests;
	
	/* 	"To actually be able to display anything with Three.js, we need three things:
		A scene, a camera, and a renderer so we can render the scene with the camera." 
	   		
	   		- http://threejs.org/docs/#Manual/Introduction/Creating_a_scene 		*/

	var scene, camera, renderer;
	
	function onDocumentReady() {
		var HEIGHT = window.innerHeight,
		 	WIDTH = window.innerWidth,
			aspectRatio = WIDTH / HEIGHT,
			fieldOfView = 75,
			nearPlane = 0.1,
			farPlane = 1000;

		scene = new THREE.Scene({antialias:true});
		
		/*	fieldOfView — Camera frustum vertical field of view.
			aspectRatio — Camera frustum aspect ratio.
			nearPlane — Camera frustum near plane.
			farPlane — Camera frustum far plane.	

			- http://threejs.org/docs/#Reference/Cameras/PerspectiveCamera

			In geometry, a frustum (plural: frusta or frustums) 
			is the portion of a solid (normally a cone or pyramid) 
			that lies between two parallel planes cutting it. -wikipedia.	*/

		camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
		
		//check for browser Support
		if (webGLSupport()) {
			//yeah?  Right on...
			renderer = new THREE.WebGLRenderer();

		} else {
			//No?  Well that's okay.
			renderer = new THREE.CanvasRenderer();
		}

		renderer.setSize(WIDTH, HEIGHT); //Full Screen Baby! Wooooooo!
		
		document.body.appendChild(renderer.domElement);
		
	}
	
	function webGLSupport() {
		/* 	The wizard of webGL only bestows his gifts of power
			to the worthy.  In this case, users with browsers who "get it".		*/

		try {
			var canvas = document.createElement("canvas");
			return !!(window.WebGLRenderingContext && (
				canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
			);
		} catch(e) {
			console.warn("Hey bro, for some reason we're not able to use webGL for this.  No biggie, we'll use canvas.");
			return false;
		}
	}

	
	$(onDocumentReady);
	
	tests = {
		webGLSupport : webGLSupport
	};	

	return tests;
})(jQuery);
