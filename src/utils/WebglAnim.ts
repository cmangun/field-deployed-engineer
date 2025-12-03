import gsap from "gsap";
import $ from "jquery";

export function slidePrevTransitionStart() {
  $('.tp-slider-dot').find('.swiper-pagination-bullet').each(function () {
    if (!$(this).hasClass("swiper-pagination-bullet-active")) {
      $('#trigger-slides .swiper-slide-active').find('div').first().each(function () {
        if (!$(this).hasClass("active")) {
          $(this).trigger('click');
        }
      });

      $('#trigger-slides .swiper-slide-duplicate-active').find('div').first().each(function () {
        if (!$(this).hasClass("active")) {
          $(this).trigger('click');
        }
      });
    }
  });
}

export function slideNextTransitionStart() {
  $('.tp-slider-dot').find('.swiper-pagination-bullet').each(function () {
    if (!$(this).hasClass("swiper-pagination-bullet-active")) {
      $('#trigger-slides .swiper-slide-active').find('div').first().each(function () {
        if (!$(this).hasClass("active")) {
          $(this).trigger('click');
        }
      });

      $('#trigger-slides .swiper-slide-duplicate-active').find('div').first().each(function () {
        if (!$(this).hasClass("active")) {
          $(this).trigger('click');
        }
      });
    }
  });
}

export function verTextFragment() {
  const vertex =
    "varying vec2 vUv; void main() {  vUv = uv;  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );	}";
  const fragment = `
		varying vec2 vUv;
	
		uniform sampler2D currentImage;
		uniform sampler2D nextImage;
		uniform sampler2D disp;
		uniform float dispFactor;
		uniform float effectFactor;
		uniform vec4 resolution;
	
		void main() {
	
			vec2 uv = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
	
			vec4 disp = texture2D(disp, uv);
			vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y);
			vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);
			vec4 _currentImage = texture2D(currentImage, distortedPosition);
			vec4 _nextImage = texture2D(nextImage, distortedPosition2);
			vec4 finalTexture = mix(_currentImage, _nextImage, dispFactor);
	
			gl_FragColor = finalTexture; }`;

  return { vertex, fragment };
}

interface WebGLContext {
  isRunning: boolean;
  material: {
    uniforms: {
      nextImage: {
        value: unknown; 
        needsUpdate: boolean;
      };
      currentImage: {
        value: unknown; 
        needsUpdate: boolean;
      };
      dispFactor: {
        value: number;
      };
    };
  };
  textures: unknown[]; 
}
export function addEvents(webGL: WebGLContext): void {
  const triggerSlide: HTMLElement[] = Array.from(
    document.getElementById("trigger-slides")!.querySelectorAll(".slide-wrap")
  );
  webGL.isRunning = false;

  triggerSlide.forEach((el: HTMLElement) => {
    el.addEventListener("click", () => {
      if (!webGL.isRunning) {
        webGL.isRunning = true;

        document
          .getElementById("trigger-slides")!
          .querySelectorAll(".active")[0].className = "";
        el.className = "active";

        const slideId = parseInt(el.dataset.slide || "0", 10);

        webGL.material.uniforms.nextImage.value = webGL.textures[slideId];
        webGL.material.uniforms.nextImage.needsUpdate = true;

        gsap.to(webGL.material.uniforms.dispFactor, {
          duration: 1,
          value: 1,
          ease: "Sine.easeInOut",
          onComplete: () => {
            webGL.material.uniforms.currentImage.value = webGL.textures[slideId];
            webGL.material.uniforms.currentImage.needsUpdate = true;
            webGL.material.uniforms.dispFactor.value = 0.0;
            webGL.isRunning = false;
          },
        });
      }
    });
  });
}