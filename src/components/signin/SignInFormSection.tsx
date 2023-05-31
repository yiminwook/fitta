import { FcGoogle } from 'react-icons/fc';
import signin from '@/components/signin/SignIn.module.scss';
import SignInForm from '@/components/signin/SignInForm';
import axios from 'axios';
import { envConfig } from '@/configs';
import { customAxios, handleAxiosError } from '@/models/customAxios';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

const { REACT_APP_SERVER_URL } = envConfig();

export interface SignInBodyData {
  email: string;
  password: string;
}

const SignInFormSection = () => {
  const [searchParams] = useSearchParams();

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
      const response = await customAxios.get<{ url: string }>('/auth/sign');
      const {
        data: { url },
      } = response;
      console.log(url);
      window.location.href = url;
    } catch (error) {
      console.error(error);
      handleAxiosError(error);
    }
  };

  //localhost:3000/signin 로그인주소
  //accounts.google.com/o/oauth2/auth/oauthchooseaccount?client_id=1066949619421-eaklsqedvp59pe0oba00a5h2qkiifhrk.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fsignin&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile

  const sendCode = async (code: string) => {
    try {
      console.log('CODE >>>>', code);
      const response = await customAxios.get<{ url: string }>(
        `/login/oauth2/code/google?code=${encodeURIComponent(
          code,
        )}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fsignin`,
      );
      const { data } = response;
      console.log('DATA >>>>', data);
    } catch (error) {
      console.error(error);
      handleAxiosError(error);
    }
  };

  useEffect(() => {
    const code = searchParams.get('code');
    console.log(code);
    if (code === undefined || code === null) return;
    sendCode(code);
  }, [searchParams]);

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
