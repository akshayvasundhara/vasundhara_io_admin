// api.js

export const getServerURL = () => {
  switch (process.env.REACT_APP_NODE_ENV) {
    case 'production':
      return `${process.env.REACT_APP_BASE_URL_PRODUCTION}api/v1/admin/`;
    case 'test':
      return `${process.env.REACT_APP_BASE_URL_TEST}api/v1/admin/`;
    default:
      return `${process.env.REACT_APP_BASE_URL}admin/`;
  }
};

export const getImageURL = () => {
  // Assuming images are stored at the root in all environments
  // Adjust the path if images are stored at a different path
  switch (process.env.REACT_APP_NODE_ENV) {
    case 'production':
      return process.env.REACT_APP_BASE_URL_PRODUCTION;
    case 'test':
      return process.env.REACT_APP_BASE_URL_TEST;
    default:
      return process.env.REACT_APP_BASE_URL;
  }
};