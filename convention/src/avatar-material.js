import * as THREE from 'three';
export function tintClothing(material,gender,color,{skin=null,hair=null}={}){
  material.onBeforeCompile=shader=>{
    Object.assign(shader.uniforms,{clothingColor:{value:new THREE.Color(color)},skinColor:{value:new THREE.Color(skin||'#ffffff')},hairColor:{value:new THREE.Color(hair||'#ffffff')}});
    shader.vertexShader='attribute vec2 horizonMask; varying vec2 vHorizonMask;\n'+shader.vertexShader;
    shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvHorizonMask=horizonMask;');
    shader.fragmentShader='uniform vec3 clothingColor; uniform vec3 skinColor; uniform vec3 hairColor; varying vec2 vHorizonMask;\n'+shader.fragmentShader;
    const clothes=gender==='female'?'diffuseColor.g > 0.12 && diffuseColor.r > diffuseColor.b*2.2 && diffuseColor.g > diffuseColor.b*2.2 && abs(diffuseColor.r-diffuseColor.g)<0.3':'vHorizonMask.x < 0.2 && diffuseColor.r > 0.035 && diffuseColor.g < diffuseColor.r*0.55 && diffuseColor.b < diffuseColor.r*0.75';
    const skinTest='vHorizonMask.x>0.4 && diffuseColor.r>0.018 && diffuseColor.r>diffuseColor.g*1.12 && diffuseColor.r<diffuseColor.g*4.5 && diffuseColor.g>diffuseColor.b*1.05';
    shader.fragmentShader=shader.fragmentShader.replace('#include <map_fragment>',`#include <map_fragment>
      if (${clothes}) { float shade=max(diffuseColor.r,diffuseColor.g); diffuseColor.rgb=clothingColor*(0.22+shade*1.15); }
      ${skin?`else if (${skinTest}) { float shade=clamp(dot(diffuseColor.rgb,vec3(.3,.59,.11))/${gender==='female'?'.065':'.34'},.28,1.4); diffuseColor.rgb=skinColor*shade; }`:''}
      ${hair?'if(vHorizonMask.y>.35 && max(diffuseColor.r,max(diffuseColor.g,diffuseColor.b))<.16){float shade=.4+dot(diffuseColor.rgb,vec3(.3,.59,.11))*3.;diffuseColor.rgb=hairColor*shade;}':''}
    `);
  };
  material.customProgramCacheKey=()=>`${gender}-${!!skin}-${!!hair}`;
}
