'use strict';

{
  const canvas=document.getElementById('canvas');
  const context=canvas.getContext('2d');

  const img=new Image();
  img.src="tekihei.png";
  img.addEventListener('load', ()=>{
    context.drawImage(img, 0, 0);
  });

  const currentColor=document.getElementById('currentColor');
  const currentHex=document.getElementById('currentHex');
  const currentRGBA=document.getElementById('currentRGBA');

  function rgbToHex(r, g, b)
  {
    const hexR=Number(r).toString(16).padStart(2, '0');
    const hexG=Number(g).toString(16).padStart(2, '0');
    const hexB=Number(b).toString(16).padStart(2, '0');
    return `${hexR}${hexG}${hexB}`;
  }

  // カーソル上の色を表示
  canvas.addEventListener('mousemove', (e)=>{
    const pixel=context.getImageData(e.layerX, e.layerY, 1, 1);
    const data=pixel.data;
    const rgba=`rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3]/255})`;

    currentColor.style.backgroundColor=rgba;
    currentHex.textContent=`Hex: #${rgbToHex(data[0], data[1], data[2])}`;
    currentRGBA.textContent=`RGBA: ${rgba}`;
  });

  // 選択した色を追加
  const pickedColors=document.getElementById('pickedColors');
  canvas.addEventListener('click', (e)=>{
    const pixel=context.getImageData(e.layerX, e.layerY, 1, 1);
    const data=pixel.data;
    const rgba=`rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3]/255})`;

    // 色
    const container=document.createElement('div'); container.classList.add('container');
    const color=document.createElement('div'); color.classList.add('color');
    color.style.background=rgba;

    // カラーコード
    const info=document.createElement('div'); info.classList.add('info');
    const hexElem=document.createElement('p');
    const rgbaElem=document.createElement('p');

    hexElem.textContent=`Hex: #${rgbToHex(data[0], data[1], data[2])}`;
    rgbaElem.textContent=`RGBA: ${rgba}`;

    // 追加
    pickedColors.appendChild(container);
    container.appendChild(color);
    container.appendChild(info);
    info.appendChild(hexElem);
    info.appendChild(rgbaElem);
  });

}
