import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import { UserInfoPage } from "./pages/UserInfoPage";
import { PleaseVerifyEmailPage } from "./pages/PleaseVerifyEmailPage";
import { EmailVerificationLandingPage } from "./pages/EmailVerificationLandingPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { PasswordResetLandingPage } from "./pages/PasswordResetLandingPage";
import { PrivateRoute } from "./auth/PrivateRoute";

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <PrivateRoute path="/" exact component={UserInfoPage} />
        <Route
          path="/verify-email/:verificationString"
          component={EmailVerificationLandingPage}
        />
        <Route
          path="/reset-password/:passwordResetCode"
          component={PasswordResetLandingPage}
        />
        <Route path="/please-verify" component={PleaseVerifyEmailPage} />
        <Route path="/forgot-password" component={ForgotPasswordPage} />
        <Route path="/login" component={LogInPage} />
        <Route path="/signup" component={SignUpPage} />
      </Switch>
    </Router>
  );
};
