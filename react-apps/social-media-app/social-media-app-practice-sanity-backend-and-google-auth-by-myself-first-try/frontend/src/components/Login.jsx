import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { client } from '../sanityClient';

const Login = () => {
  const navigate = useNavigate();

  const responseMessage = message => {
    const decodedGoogleResponse = jwtDecode(message.credential);

    localStorage.setItem('user', JSON.stringify(decodedGoogleResponse));

    const { name, picture, sub } = decodedGoogleResponse;

    const sanityDocument = {
      _id: sub,
      _type: 'user',
      userName: name,
      picture: picture,
    };

    client.createIfNotExists(sanityDocument).then(() => {
      navigate('/', { replace: true });
    });
  };
  return (
    <div>
      <h2>google login</h2>
      <GoogleLogin
        onSuccess={responseMessage}
        onError={() => {
          console.log('Login failed');
        }}
      />
    </div>
  );
};

export default Login;
