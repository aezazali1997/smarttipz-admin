export const calProfileRating = (videos)=>{
  if (videos.length===0){
    return 0;
  }
  if(Array.isArray(videos) && videos.length>0){
      let sum=0;
      const TOTAL=videos.length;
    for(let i=0; i<TOTAL; i++){
      sum+=Number(videos[i].avgRating);
    }
    return (sum/TOTAL);
}
}