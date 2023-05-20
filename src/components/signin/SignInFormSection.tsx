import { FcGoogle } from 'react-icons/fc';
import signin from '@/components/signin/SignIn.module.scss';
import SignInForm from '@/components/signin/SignInForm';
import axios from 'axios';
import { envConfig } from '@/configs';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const { REACT_APP_SERVER_URL } = envConfig();

export interface SignInBodyData {
  email: string;
  password: string;
}

const SignInFormSection = () => {
  const navigate = useNavigate();
  const handleSignIn = async ({ email, password }: SignInBodyData) => {
    try {
      console.log(email, password);
      const serverUrl = REACT_APP_SERVER_URL;
      const response = await axios.post(`${serverUrl}/members`, { email, password }, { withCredentials: true });
      console.log('res  >>>>', response);
      if (response) console.log('data  >>>>', response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getSignUpUrl = async () => {
    try {
      const { data } = await axios({
        method: 'GET',
        baseURL: `${REACT_APP_SERVER_URL}/auth/sign`,
        // headers: {
        //   'Access-Control-Allow-Origin': REACT_APP_SERVER_URL,
        //   'Access-Control-Allow-Credentials': 'true',
        // },
        withCredentials: true,
      });
      navigate(data);
      console.log(data);
    } catch (error) {
      console.error(error);
      toast.error('통신에러');
    }
  };

  return (
    <section className={signin['formSection']}>
      <h1>Sign In</h1>
      <div>
        <SignInForm handleSignIn={handleSignIn} />
        <div>
          <button onClick={getSignUpUrl} className={signin['googleSignUpButton']}>
            <span>
              <FcGoogle size={'2rem'} />
            </span>
            구글 이메일로 시작하기
          </button>
        </div>
      </div>
    </section>
  );
};

export default SignInFormSection;
