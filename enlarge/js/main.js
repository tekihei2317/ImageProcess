'use strict';

{
  const canvas=document.getElementById('tutorial');
  const context=canvas.getContext('2d');

  const img=document.getElementById('image');
  context.drawImage(img, 0, 0, 200, 200);

  const zoomContext=document.getElementById('zoom').getContext('2d');
  canvas.addEventListener('mousemove', (e)=>{
    console.log(e.layerX);
    console.log(e.layerY);

    /*
    const zoomImageData=context.getImageData(e.layerX, e.layerY, 10, 10);
    zoomContext.drawImage(zoomImageData, 0, 0, 100, 100);
    */
    const zoomSize=20;
    zoomContext.drawImage(
      img,
      e.layerX-zoomSize/2, e.layerY-zoomSize/2, zoomSize, zoomSize,  
      0, 0, 100, 100
    );
  });
}
