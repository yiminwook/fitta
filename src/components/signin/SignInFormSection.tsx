import { FcGoogle } from 'react-icons/fc';
import signin from '@/components/signin/SignIn.module.scss';
import SignInForm from '@/components/signin/SignInForm';
import axios from 'axios';
import { getEnv } from '@/utils/getEnv';
import { REACT_APP_SERVER_URL } from '@/consts';

export interface SignInBodyData {
  email: string;
  password: string;
}

const SignInFormSection = () => {
  const handleSignIn = async ({ email, password }: SignInBodyData) => {
    try {
      console.log(email, password);
      const serverUrl = getEnv(REACT_APP_SERVER_URL);
      const response = await axios.post(`${serverUrl}/members`, { email, password }, { withCredentials: true });
      console.log('res  >>>>', response);
      if (response) console.log('data  >>>>', response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getSignUpUrl = () => {
    console.log('get url');
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
