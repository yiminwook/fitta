import Preview from '@/components/common/dragDrop/Preview';
import { checkImgFileType } from '@/utils/checkByRegExp';
import { handleToastError } from '@/utils/handleToast';
import { ChangeEvent, useEffect, useState } from 'react';

const DragDrap = () => {
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState<string>('');

  const handleSaveImage = (file: File) => {
    setImgFile(() => file);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const newFile = e.target?.files?.[0];
      if (newFile) {
        checkImgFileType(newFile);
        handleSaveImage(newFile);
      }
    } catch (error) {
      handleToastError(error);
    }
  };

  useEffect(() => {
    if (!imgFile) return;
    const newImgURL = URL.createObjectURL(imgFile);
    setImgUrl(() => newImgURL);

    return () => URL.revokeObjectURL(imgUrl);
  }, [imgFile]);

  return (
    <>
      <Preview imgUrl={imgUrl} handleSaveImage={handleSaveImage} />
      <input
        style={{ display: 'none' }}
        type="file"
        id="image-file-input"
        accept=".png, .jpeg, .jpg .wepb"
        multiple={false}
        onChange={onChange}
      />
    </>
  );
};

export default DragDrap;
