import { SignIn, SignUp } from "@clerk/clerk-react";

export const SignInPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignIn
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
        afterSignInUrl="/redirect"
      />
    </div>
  );
};

export const SignUpPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignUp
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
        afterSignUpUrl="/redirect"
      />
    </div>
  );
};
