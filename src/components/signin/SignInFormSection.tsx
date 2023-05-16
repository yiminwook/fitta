import { FcGoogle } from 'react-icons/fc';
import signin from '@/components/signin/SignIn.module.scss';
import SignInForm from '@/components/signin/SignInForm';

export interface SignInBodyData {
  email: string;
  password: string;
}

const SignInFormSection = () => {
  const handleSignIn = ({ email, password }: SignInBodyData) => {
    try {
      console.log(email, password);
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
