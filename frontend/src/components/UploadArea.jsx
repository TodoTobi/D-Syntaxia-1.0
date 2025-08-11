import React, { useRef } from 'react';

export default function UploadArea({ onImage }){
  const inputRef = useRef(null);

  const onFile = (f) => {
    const reader = new FileReader();
    reader.onload = () => onImage(reader.result);
    reader.readAsDataURL(f);
  };

  return (
    <div className="card">
      <p>Sube una imagen (máx. 5MB). También sirve una foto desde el celu o Raspberry en producción.</p>
      <input ref={inputRef} type="file" accept="image/*" onChange={e=> e.target.files[0] && onFile(e.target.files[0])} />
    </div>
  );
}
