/** 특수문자 1개이상일때 true */
export const checkSpecialCharacter = (string: string) => {
  return /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g.test(string);
};

export const checkImgFileType = (file: File | null) => {
  if (file === null) throw new Error('파일이 없습니다.');
  if (/(jpe?g|png|webp)/i.test(file.type) === false) {
    throw new Error('지원되지 않는 이미지입니다.');
  }
};
