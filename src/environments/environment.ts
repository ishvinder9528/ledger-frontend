export const environment = {
  apiUrl: 'https://ledger-backend-txzo.onrender.com',
};

export const checkToken = () => {
  const istoken =
    localStorage.getItem('token') && localStorage.getItem('token') != undefined
      ? true
      : false;
  console.log(istoken, localStorage.getItem('token'));
  return istoken;
};
