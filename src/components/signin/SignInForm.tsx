import { FormEvent, useCallback, useState } from 'react';
import signin from '@/components/signin/SignIn.module.scss';
import { useInput } from '@/hooks/useInput';

interface SignInFormProps {
  handleSignIn: ({ email, password, isOwner }: { email: string; password: string; isOwner: boolean }) => void;
}

const SignInForm = ({ handleSignIn }: SignInFormProps) => {
  const [emailInputValue, _setEmailInputValue, onChangeSetEmailInputValue] = useInput('');
  const [passwordInputValue, _setPasswordInputValue, onChangeSetPasswordInputValue] = useInput('');
  const [isShowEmailCautionLetter, setIsShowEmailCautionLetter] = useState(false);
  const [isShowPasswordCautionLetter, setIsShowPasswordCautionLetter] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

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
      handleSignIn({ email, password, isOwner });
    },
    [emailInputValue, passwordInputValue, isShowEmailCautionLetter, isShowPasswordCautionLetter, isOwner],
  );

  const handleIsOwner = useCallback(() => {
    setIsOwner((pre) => !pre);
  }, [setIsOwner, isOwner]);

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="email"
          placeholder="구글 이메일을 입력해주세요"
          value={emailInputValue}
          onChange={onChangeSetEmailInputValue}
        />
        <p className={[signin['caution'], isShowEmailCautionLetter ? signin['show'] : ''].join(' ')}>
          이메일이 입력되지 않았습니다.
        </p>
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          placeholder="패스워드를 입력해주세요"
          value={passwordInputValue}
          onChange={onChangeSetPasswordInputValue}
        />
        <p className={[signin['caution'], isShowPasswordCautionLetter ? signin['show'] : ''].join(' ')}>
          비밀번호가 입력되지 않았습니다.
        </p>
      </div>
      <div>
        <span>사업자로 로그인하기</span>
        <input type="checkbox" onChange={handleIsOwner} />
      </div>
      <div>
        <button
          type="submit"
          onClick={() => {
            // toast.success('success!!');
          }}
        >
          로그인
        </button>
      </div>
    </form>
  );
};

export default SignInForm;
