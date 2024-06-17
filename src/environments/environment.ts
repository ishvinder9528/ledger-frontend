export const environment = {
  apiUrl: 'https://ledger-backend-txzo.onrender.com',
};

export const checkToken = () => {
  const token = localStorage.getItem('token');
  const expiry = localStorage.getItem('tokenExpiry');

  if (!token || !expiry) {
    return false;
  }

  const now = Date.now();
  if (now > parseInt(expiry, 10)) {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiry');
    return false;
  }

  return true;
};

export const getToken = () => {
  const token = localStorage.getItem('token');
  const expiry = localStorage.getItem('tokenExpiry');

  if (!token || !expiry) {
    return '';
  }

  const now = Date.now();
  if (now > parseInt(expiry, 10)) {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiry');
    return '';
  }
  console.log("token:", token);
  
  return token;
};