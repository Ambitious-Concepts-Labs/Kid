import React, { lazy, Suspense } from "react";

const ResetPasswordForm = lazy(() => import("../../components/Form/Auth/ResetPasswordForm"));

function ResetPasswordScreen() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}

export default ResetPasswordScreen;
