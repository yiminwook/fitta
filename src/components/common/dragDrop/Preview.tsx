import { checkImgFileType } from '@/utils/checkByRegExp';
import { handleToastError } from '@/utils/handleToast';
import { DragEvent } from 'react';

interface PreviewProps {
  imgUrl: string;
  handleSaveImage: (file: File) => void;
}
const Preview = ({ imgUrl, handleSaveImage }: PreviewProps) => {
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
      handleSaveImage(file);
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
      <label htmlFor="image-file-input" onDrop={onDrop} onDragOver={onDragOver}>
        <span className="blind">이미지 업로드</span>
        <img src={imgUrl} alt="preview" />
      </label>
    </>
  );
};

export default Preview;
