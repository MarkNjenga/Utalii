import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Logout = () => {
  const history = useHistory();

  useEffect(() => {
    localStorage.removeItem('auth');
    history.push('/login');
  }, [history]);

  return (
    <div>
      <h2>Logout</h2>
    </div>
  );
};

export default Logout;
