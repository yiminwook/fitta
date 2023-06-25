import { CSSProperties } from 'react';
import { BiSearch } from 'react-icons/bi';

interface SearchButtonProps {
  style?: CSSProperties;
  className?: string;
  size: string;
  onClick: () => void;
}
const SearchButton = ({ style, className = '', size, onClick }: SearchButtonProps) => {
  return (
    <button type="button" onClick={onClick} style={{ ...style }} className={className}>
      <BiSearch size={size} color="inherit" />
    </button>
  );
};

export default SearchButton;
