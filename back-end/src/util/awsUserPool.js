import { CognitoUserPool } from "amazon-cognito-identity-js";
import AWS, { CognitoIdentityCredentials } from "aws-sdk";
import fetch from "node-fetch";

global.fetch = fetch;

AWS.config.region = process.env.AWS_REGION;
AWS.config.credentials = new CognitoIdentityCredentials({
  IdentityPoolId: process.env.AWS_IDENTITY_POOL_ID,
});

const poolData = {
  UserPoolId: process.env.AWS_USER_POOL_ID,
  ClientId: process.env.AWS_CLIENT_ID,
};

export const awsUserPool = new CognitoUserPool(poolData);
