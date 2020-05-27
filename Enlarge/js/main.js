'use strict';

{
  const canvas=document.getElementById('tutorial');
  const context=canvas.getContext('2d');

  // const img=document.getElementById('image');
  const img=new Image();
  img.src="tekihei.png";
  img.addEventListener('load', ()=>{
    context.drawImage(img, 0, 0);
  });

  const zoomContext=document.getElementById('zoom').getContext('2d');
  canvas.addEventListener('mousemove', (e)=>{
    console.log(e.layerX);
    console.log(e.layerY);

    const zoomSize=20;
    zoomContext.drawImage(
      img,
      e.layerX-zoomSize/2, e.layerY-zoomSize/2, zoomSize, zoomSize,  
      0, 0, 100, 100
    );
  });
}
