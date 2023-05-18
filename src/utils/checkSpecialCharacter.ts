/** 특수문자 1개이상일때 true */
export const checkSpecialCharacter = (string: string) => {
  return /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g.test(string);
};
