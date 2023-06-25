export const transferJsonInFormData = (object: Record<string, any>) => {
  return new Blob([JSON.stringify(object)], { type: 'application/json' });
};
