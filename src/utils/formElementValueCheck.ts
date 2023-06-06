import { PASSWORD_LENGTH } from '@/consts';
import { SignUpMemberData, SignUpOwnerData } from '@/types/userData';
import { checkSpecialCharacter } from './checkSpecialCharacter';

export const formPasswordCheck = <T extends HTMLFormElement>({
  currentTarget,
  password,
  passwordConfirm,
}: {
  currentTarget: T;
  password: string;
  passwordConfirm: string;
}) => {
  if (password !== passwordConfirm) {
    currentTarget.password.classList.add('empty');
    currentTarget.passwordConfirm.classList.add('empty');
    throw new Error('비밀번호가 일치하지 않습니다.');
  }

  if (checkSpecialCharacter(password) !== true) {
    currentTarget.password.classList.add('empty');
    throw new Error('특수문자를 1개이상 넣어주세요');
  }

  if (password.length < PASSWORD_LENGTH) {
    currentTarget.password.classList.add('empty');
    throw new Error(`${PASSWORD_LENGTH}글자 이상이어야 합니다.`);
  }
};

export const formElementValueCheck = <T extends HTMLFormElement, U>({
  currentTarget,
  data,
}: {
  currentTarget: T;
  data: SignUpMemberData | SignUpOwnerData | any;
}) => {
  Object.entries(data as unknown as Record<string, string>).forEach(([name, value]) => {
    const target = currentTarget[name] as unknown as HTMLElement;
    if (!target) return;
    if (value === '') {
      target.classList.add('empty');
      throw new Error(`입력되지않았습니다.`);
    } else {
      target.classList.remove('empty');
      return;
    }
  });
};
