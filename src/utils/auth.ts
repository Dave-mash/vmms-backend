import axios from 'axios';

export const githubLogin = async (access_token) => {
  // const access_token = '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';
  const githubProfileURL = 'https://api.github.com/user';
  const headers = {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${access_token}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
  };
  const response = await axios.get(githubProfileURL, headers);
  console.log(':::::::::::: >>>>>>>> ', response?.data);

  return response;
};
