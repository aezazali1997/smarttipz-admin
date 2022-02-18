export const calProfileRating = (videos)=>{
  if ( Array.isArray(videos) && videos.length===0){
    return 0;
  }
  if(Array.isArray(videos) && videos.length>0){
    let sum=0;
    videos= videos.filter(video=>video.avgRating!==0)
    const TOTAL=videos.length;
    for(let i=0; i<TOTAL; i++){
      sum+=Number(videos[i].avgRating);
    }
    let avg=(sum/TOTAL);
    return decimalSplitter(avg);
  }
}
export const decimalSplitter =(avg)=>{
    avg=Number(avg).toFixed(1)
    let dec=avg.split('.');
    if(Number(dec[1])>0 && Number(dec[1])<5){
      dec[1]='5';
    }
    return dec[0]+"."+dec[1];
}