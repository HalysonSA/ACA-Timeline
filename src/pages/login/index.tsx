import SignInForm from '@/components/loginCard/form';
import SignUpForm from '@/components/registrationCard/form';
import { useMediaQuery } from '@chakra-ui/react';

const SignIn = () => {
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

  return (
    <div className="flex flex-row min-h-screen min-w-screen bg-cyan-800">
      <div className="w-full md:w-2/5 min-h-screen bg-neutral-100">
        <div className="flex items-center justify-center w-full h-full">
          <div className="flex flex-col  my-10 w-11/12 md:w-4/5 bg-white shadow-2xl rounded-2xl md:h-11/12 min-h-min max-h-max">
            <div className="flex flex-col items-center justify-center w-full h-1/2">
              <SignInForm />
            </div>
          </div>
        </div>
      </div>
      {isLargerThan768 && <SignUpForm />}
    </div>
  );
};

export default SignIn;
