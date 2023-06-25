import { checkImgFileType } from '@/utils/checkByRegExp';
import { handleToastError } from '@/utils/handleToast';
import { DragEvent } from 'react';

interface PreviewProps {
  id: string;
  className: string;
  imgUrl: string;
  handleImgFile: (file: File) => void;
}

const Preview = ({ id, className, imgUrl, handleImgFile: handleImgFile }: PreviewProps) => {
  const onDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    try {
      let file: File;
      if (e.dataTransfer.items && e.dataTransfer.items[0].getAsFile()) {
        file = e.dataTransfer.items[0].getAsFile()!;
      } else {
        file = e.dataTransfer.files[0];
      }
      checkImgFileType(file);
      handleImgFile(file);
    } catch (error) {
      handleToastError(error);
    }
  };

  const onDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('onover');
  };

  return (
    <>
      <label htmlFor={id} onDrop={onDrop} onDragOver={onDragOver} className={className}>
        <span className="blind">이미지 업로드</span>
        <img src={imgUrl ? imgUrl : ''} alt="preview-image" />
      </label>
    </>
  );
};

export default Preview;
