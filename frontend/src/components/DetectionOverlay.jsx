import React, { useMemo } from 'react';

export default function DetectionOverlay({ imgRef, bestBox }){
  const dims = useMemo(()=>{
    if (!imgRef.current || !bestBox) return null;
    const img = imgRef.current;
    const w = img.naturalWidth; const h = img.naturalHeight;
    const rect = img.getBoundingClientRect();

    // HF DETR retorna box con xmin,ymin,xmax,ymax (en px del original)
    const scaleX = rect.width / w;
    const scaleY = rect.height / h;
    const x = bestBox.xmin * scaleX;
    const y = bestBox.ymin * scaleY;
    const bw = (bestBox.xmax - bestBox.xmin) * scaleX;
    const bh = (bestBox.ymax - bestBox.ymin) * scaleY;
    return { x, y, bw, bh };
  }, [imgRef, bestBox]);

  if (!dims) return null;
  return <div className="overlay"><div className="box" style={{ left:dims.x, top:dims.y, width:dims.bw, height:dims.bh }} /></div>;
}
