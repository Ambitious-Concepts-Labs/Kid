import React, { lazy, Suspense } from "react";

const LoginForm = lazy(() => import("../../components/Form/Auth/LoginForm"));

function LoginScreen() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}

export default LoginScreen;
