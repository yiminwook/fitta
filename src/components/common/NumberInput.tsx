import { ChangeEvent, RefObject, useCallback, useState } from 'react';

interface NumberInputProps {
  className?: string;
  name: string;
  ref?: RefObject<HTMLInputElement> | null;
  pattern?: RegExp | string;
  maxLength: number;
  placeholder?: string;
}

const NumberInput = ({
  className = '',
  ref = null,
  pattern = '',
  name,
  maxLength,
  placeholder = '',
}: NumberInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target) return;
      const value = e.target.value.replace(/[^0-9]/g, '');
      if (pattern === '') {
        return setInputValue(() => value);
      }
      setInputValue(() => value.replace(pattern, `$1-$2-$3`));
    },
    [inputValue],
  );

  return (
    <input
      type="text"
      className={className}
      ref={ref}
      name={name}
      onChange={onChange}
      value={inputValue}
      maxLength={maxLength}
      placeholder={placeholder}
    />
  );
};

export default NumberInput;
