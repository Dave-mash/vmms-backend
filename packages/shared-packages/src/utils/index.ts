import { getTsid } from 'tsid-ts';

export const generateTSID = () => {
  const string = getTsid().toString();

  return string;
};
