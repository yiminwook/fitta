import { ChangeEvent, useCallback, useState } from 'react';
import passwordInput from '@/components/common/PasswordInput.module.scss';
import { checkSpecialCharacter } from '@/utils/checkByRegExp';
import SpeechBubble from '@/components/common/SpeechBubble';
import { PASSWORD_LENGTH } from '@/consts';

interface PasswordInputProps {
  className?: string;
  passwordName: string;
  passwordConfirmName: string;
  placeholder?: string;
}

const PasswordInput = ({
  className = '',
  passwordName,
  passwordConfirmName,
  placeholder = `특수문자 1개 / ${PASSWORD_LENGTH}글자이상 포함`,
}: PasswordInputProps) => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [excludeSpecialCharacter, setExcludeSpecialCharacter] = useState(false);
  const [underLength, setUnderLength] = useState(false);
  const [misMatch, setmisMatch] = useState(false);

  const onChangePassoword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/\s/g, '');
      setExcludeSpecialCharacter(() => checkSpecialCharacter(value) === false);
      //8글자 이상
      setUnderLength(() => value.length < PASSWORD_LENGTH);
      setPassword(() => value);
    },
    [password],
  );

  const onChangePasswordConfirm = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/\s/g, '');
      setPasswordConfirm(() => value);
      setmisMatch(() => value !== password);
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
          placeholder={placeholder}
          value={password}
        />
        {excludeSpecialCharacter ? (
          <SpeechBubble
            className={passwordInput['passwordRule']}
            iconColor="#ffa500"
            message="특수문자를 포함시켜주세요"
            onClose={onCloseIncludeSpecialCharacter}
          />
        ) : null}
        {underLength ? (
          <SpeechBubble
            className={passwordInput['passwordRule']}
            iconColor="#ffa500"
            message={`${PASSWORD_LENGTH}글자이상이어야 합니다.`}
            onClose={onCloseUnderLength}
          />
        ) : null}
      </div>
      <label htmlFor={passwordConfirmName}>비밀번호확인</label>
      <div className={passwordInput['passwordWapper']}>
        <input
          type="password"
          onChange={onChangePasswordConfirm}
          name={passwordConfirmName}
          value={passwordConfirm}
          // placeholder={placeholder}
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
