'use strict';

{
  const canvas=document.getElementById('canvas');
  const context=canvas.getContext('2d');

  const img1=new Image();
  img1.src="tekihei.png";

  const img2=new Image();
  img2.src="carrot_whitebackground.png";
  
  let loadCount=0;
  img1.addEventListener('load', ()=>{
    // context.drawImage(img1, 0, 0);
    loadCount++;
    console.log('tekihei', loadCount);
    if(loadCount===2) change();
  });

  img2.addEventListener('load', ()=>{
    // context.drawImage(img2, 200, 0);
    loadCount++;
    console.log('carrot', loadCount);
    if(loadCount===2) change();
  });

  // 行・列の個数(奇数)
  const NUM=49;
  const SIZE=img1.width/NUM;

  // 描く場所(左上の座標)
  const offsetX=0;
  const offsetY=0;

  // 一周期の大きさ
  const loopSize=NUM+(NUM-1);
  let counter=0;

  // 各マスの表示・非表示を管理する変数
  let flag=new Array(NUM);
  for(let i=0;i<NUM;i++){
    flag[i]=new Array(NUM).fill(false);
  }

  function change(){
    const curState=counter%loopSize;
    const range=(curState<loopSize/2? curState:loopSize-curState-1);
    for(let i=0, srcY=0;i<NUM;i++, srcY+=SIZE){
      for(let j=0, srcX=0;j<NUM;j++, srcX+=SIZE){
        // 中央からの距離
        const dist=Math.abs(i-parseInt(NUM/2))+Math.abs(j-parseInt(NUM/2));
        if(dist>range) continue;

        // dist<=rangeのものの表示を切り替える
        const dstX=offsetX+srcX;
        const dstY=offsetY+srcY;
        if(flag[i][j]===true){
          context.clearRect(dstX, dstY, SIZE, SIZE);
        }else{
          // 4周期のうち前半は画像1、後半は画像2を表示
          const img=((counter/loopSize)%4<2? img1:img2);
          context.drawImage(img, srcX, srcY, SIZE, SIZE, dstX, dstY, SIZE, SIZE);
        }
        flag[i][j]=!flag[i][j];
      }
    }
    counter++;
    let nextChangeTime=30;
    if(counter%loopSize==0){
      if(counter/loopSize%4==1 || counter/loopSize%4==3) nextChangeTime=200;
    }
    setTimeout(change, nextChangeTime);
  }
}
