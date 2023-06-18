import Preview from '@/components/common/dragDrop/Preview';
import { checkImgFileType } from '@/utils/checkByRegExp';
import { handleToastError } from '@/utils/handleToast';
import { ChangeEvent, useEffect, useState } from 'react';

interface DragDrapProps {
  imgFile: File | null;
  handleImgFile: (file: File) => void;
  id: string;
}

const DragDrap = ({ imgFile, handleImgFile, id }: DragDrapProps) => {
  const [imgUrl, setImgUrl] = useState<string>('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const newFile = e.target?.files?.[0];
      if (newFile) {
        checkImgFileType(newFile);
        handleImgFile(newFile);
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
      <Preview imgUrl={imgUrl} handleImgFile={handleImgFile} id={id} />
      <input
        style={{ display: 'none' }}
        type="file"
        id={id}
        accept=".png, .jpeg, .jpg .wepb"
        multiple={false}
        onChange={onChange}
      />
    </>
  );
};

export default DragDrap;
