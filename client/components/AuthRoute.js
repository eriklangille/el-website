import { useContext, useEffect, Fragment } from 'react';
import { UserContext } from '../utils/UserContext';
import Router from 'next/router';

const AuthRoute = (props) => {
  const user = useContext(UserContext);

  useEffect(() => {
    renderRedirect();
  }, [user]);
  
  const renderRedirect = () => {
    if (!user.auth.isAuthenticated && !user.auth.loading) {
      Router.push('/login');
    }
  };

  return (
    <Fragment>
      {user.auth.isAuthenticated === true ? props.children : <div style={{'margin': 'auto', height: '100vh', padding: '40%', fontWeight: 'bold'}}>Unauthorized</div>}
    </Fragment>
  );
};

export default AuthRoute;