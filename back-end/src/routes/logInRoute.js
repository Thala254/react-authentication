import jwt from "jsonwebtoken";
import {
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
} from "amazon-cognito-identity-js";
import { awsUserPool } from "../util/awsUserPool";
import { getDbConnection } from "../db";

export const logInRoute = {
  path: "/api/login",
  method: "post",
  handler: async (req, res) => {
    const { email, password } = req.body;

    const cognitoUser = new CognitoUser({ Username: email, Pool: awsUserPool });
    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: async (result) => {
        const db = getDbConnection("react-auth-db");
        const user = await db.collection("users").findOne({ email });

        const { _id: id, isVerified, info } = user;

        jwt.sign(
          { id, isVerified, email, info },
          process.env.JWT_SECRET,
          {
            expiresIn: "2d",
          },
          (err, token) => {
            if (err) {
              res.sendStatus(500);
            }

            res.status(200).json({ token });
          }
        );
      },
      onFailure: (err) => {
        console.log("Error authenticating", err);
        res.sendStatus(401);
      },
    });
  },
};
