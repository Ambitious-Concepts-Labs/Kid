import React, { lazy, Suspense } from "react";

const ForgotPasswordForm = lazy(() => import("../../components/Form/Auth/ForgotPasswordForm"));

function ForgotPasswordScreen() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ForgotPasswordForm />
      </Suspense>
    </div>
  );
}

export default ForgotPasswordScreen;
