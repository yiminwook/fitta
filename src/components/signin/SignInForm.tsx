import { FormEvent, useCallback, useState } from 'react';
import signin from '@/components/signin/SignIn.module.scss';
import { SignInBodyData } from '@/components/signin/SignInFormSection';
import { useInput } from '@/hooks/useInput';

interface SignInFormProps {
  handleSignIn: ({ email, password }: SignInBodyData) => void;
}

const SignInForm = ({ handleSignIn }: SignInFormProps) => {
  const [emailInputValue, _setEmailInputValue, onChangeSetEmailInputValue] = useInput('');
  const [passwordInputValue, _setPasswordInputValue, onChangeSetPasswordInputValue] = useInput('');
  const [isShowEmailCautionLetter, setIsShowEmailCautionLetter] = useState(false);
  const [isShowPasswordCautionLetter, setIsShowPasswordCautionLetter] = useState(false);

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      setIsShowEmailCautionLetter(() => false);
      setIsShowPasswordCautionLetter(() => false);

      const email = emailInputValue.trim();
      const password = passwordInputValue.trim();

      if (!email) setIsShowEmailCautionLetter(() => true);
      if (!password) setIsShowPasswordCautionLetter(() => true);
      if (!(email && password)) return;
      handleSignIn({ email, password });
    },
    [emailInputValue, passwordInputValue, isShowEmailCautionLetter, isShowPasswordCautionLetter],
  );

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor={signin['email']}>Email</label>
        <input
          id={signin['email']}
          type="email"
          placeholder="구글 이메일을 입력해주세요"
          value={emailInputValue}
          onChange={onChangeSetEmailInputValue}
        />
        <p className={isShowEmailCautionLetter ? signin['show'] : ''}>이메일이 입력되지 않았습니다.</p>
      </div>
      <div>
        <label htmlFor={signin['password']}>Password</label>
        <input
          id={signin['password']}
          type="password"
          placeholder="패스워드를 입력해주세요"
          value={passwordInputValue}
          onChange={onChangeSetPasswordInputValue}
        />
        <p className={isShowPasswordCautionLetter ? signin['show'] : ''}>비밀번호가 입력되지 않았습니다.</p>
      </div>
      <div>
        <button type="submit">로그인</button>
      </div>
    </form>
  );
};

export default SignInForm;
