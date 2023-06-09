import gravatar from 'gravatar';

interface CreateDefaultProfileImageType {
  key: string;
  size?: string;
}

export const createDefaultProfileImage = ({ key, size = '30px' }: CreateDefaultProfileImageType) => {
  return gravatar.url(key, { s: size, d: 'retro' });
};
