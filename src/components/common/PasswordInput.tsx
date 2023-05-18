import { ChangeEvent, useCallback, useState } from 'react';
import passwordInput from '@/components/common/PasswordInput.module.scss';
import { checkSpecialCharacter } from '@/utils/checkSpecialCharacter';
import SpeechBubble from '@/components/common/SpeechBubble';

interface PasswordInputProps {
  className?: string;
  passwordName: string;
  passwordCheckName: string;
  placeholder?: string;
}

const PasswordInput = ({ className = '', passwordName, passwordCheckName, placeholder = '' }: PasswordInputProps) => {
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [excludeSpecialCharacter, setExcludeSpecialCharacter] = useState(false);
  const [underLength, setUnderLength] = useState(false);
  const [misMatch, setmisMatch] = useState(false);

  const onChangePassoword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setExcludeSpecialCharacter(() => checkSpecialCharacter(value) === false);
      //8글자 이상
      setUnderLength(() => value.length < 8);
      setPassword(() => e.target.value);
    },
    [password],
  );

  const onChangePasswordCheck = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPasswordCheck(() => e.target.value);
      setmisMatch(() => e.target.value !== password);
      console.log(misMatch);
    },
    [password],
  );

  const onCloseIncludeSpecialCharacter = useCallback(() => {
    setExcludeSpecialCharacter(() => false);
  }, [excludeSpecialCharacter]);

  const onCloseUnderLength = useCallback(() => {
    setUnderLength(() => false);
  }, [underLength]);

  const onCloseMisMatch = useCallback(() => {
    setmisMatch(() => false);
  }, [misMatch]);

  return (
    <>
      <label htmlFor={passwordName}>비밀번호</label>
      <div className={passwordInput['passwordWapper']}>
        <input
          type="password"
          className={className}
          name={passwordName}
          onChange={onChangePassoword}
          value={password}
        />
        {excludeSpecialCharacter ? (
          <SpeechBubble
            className={passwordInput['passwordRoule']}
            iconColor="#ffa500"
            message="특수문자를 포함시켜주세요"
            onClose={onCloseIncludeSpecialCharacter}
          />
        ) : null}
        {underLength ? (
          <SpeechBubble
            className={passwordInput['passwordRoule']}
            iconColor="#ffa500"
            message="8글자이상이어야 합니다."
            onClose={onCloseUnderLength}
          />
        ) : null}
      </div>
      <label htmlFor={passwordCheckName}>비밀번호확인</label>
      <div className={passwordInput['passwordWapper']}>
        <input
          type="password"
          onChange={onChangePasswordCheck}
          name={passwordCheckName}
          value={passwordCheck}
          placeholder={placeholder}
        />
        {misMatch ? (
          <SpeechBubble
            className={passwordInput['misMatchMessage']}
            iconColor="#ffa500"
            message="일치하지 않습니다."
            onClose={onCloseMisMatch}
          />
        ) : null}
      </div>
    </>
  );
};

export default PasswordInput;
