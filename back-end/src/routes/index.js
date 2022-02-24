import { testRoute } from "./testRoute";
import { signUpRoute } from "./signUpRoute";
import { logInRoute } from "./logInRoute";
import { updateUserInfoRoute } from "./updateUserInfoRoute";
import { verifyEmailRoute } from "./verifyEmailRoute";
import { forgotPasswordRoute } from "./forgotPasswordRoute";
import { resetPasswordRoute } from "./resetPasswordRoute";
import { getGoogleOauthUrlRoute } from "./getGoogleOauthUrlRoute";
import { googleOauthCallbackRoute } from "./googleOauthCallbackRoute";
import { testEmailRoute } from "./testEmailRoute";

export const routes = [
  updateUserInfoRoute,
  logInRoute,
  signUpRoute,
  testRoute,
  verifyEmailRoute,
  forgotPasswordRoute,
  resetPasswordRoute,
  getGoogleOauthUrlRoute,
  googleOauthCallbackRoute,
  //   testEmailRoute,
];
