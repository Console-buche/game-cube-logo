const vertexShader = `
          // attribute vec3 col;
          attribute float stepIndex;
          varying vec3 vCol;
          varying vec2 vUv;
          varying float vStepIndex;
          varying vec3 vNormal;

          void main() {
            vCol = color;
            vNormal = normalize(normalMatrix * normal);  
            vStepIndex = stepIndex;
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `;

const fragmentShader = `

uniform bool uIsFlat;
    uniform float uLength;
    uniform vec3 uFlatColor;
    uniform float uStep;
    uniform float uTime;
    varying vec2 vUv;
    varying vec3 vCol;
    varying vec3 vNormal;
    varying float vStepIndex;

    void main() {

      //WIP: lighting
      //TODO: geometry has same normal for all faces, thus lighting is global and unrelated to transformed vertices as
      //seen here. Todo before implementing lighting, just compute the normals of the transformed faces.

      float segmentSize = 1.; 
      float f = fract(vUv.y * uLength); // Position within the segment
      float lineThickness = .05; // Black strips size

      float alpha = 1. - smoothstep(uStep - 1.0, uStep, vStepIndex);
      vec3 flatColor = uFlatColor;

      vec3 mixedCol = uIsFlat ? flatColor : mix(flatColor, vCol, uTime) ;
      vec4 color = vec4(mixedCol, alpha);


      // gradient
      if (f < segmentSize - lineThickness || vUv.y > 1.-lineThickness) {
        gl_FragColor = color; 
      }

      if ((vUv.y < .05 ||vUv.y > .95 || vUv.x < .05 || vUv.x > .95)) { 
        gl_FragColor = mix(vec4(.0, 0.0, 0.0, 0.0), vec4(mixedCol, 1.0), uTime); // Draw black line
      }
    }
`;

export const shader = { vertexShader, fragmentShader };
