import React, { lazy, Suspense } from "react";

const SignUpForm = lazy(() => import("../../components/Form/Auth/SignUpForm"));

function SignUpScreen() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <SignUpForm />
      </Suspense>
    </div>
  );
}

export default SignUpScreen;
