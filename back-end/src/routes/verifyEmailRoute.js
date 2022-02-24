import { ObjectID } from "mongodb";
import jwt from "jsonwebtoken";
import { CognitoUser } from "amazon-cognito-identity-js";
import { awsUserPool } from "../util/awsUserPool";
import { getDbConnection } from "../db";

export const verifyEmailRoute = {
  path: "/api/verify-email",
  method: "put",
  handler: async (req, res) => {
    const { verificationString, email } = req.body;

    new CognitoUser({ Username: email, Pool: awsUserPool }).confirmRegistration(
      verificationString,
      true,
      async (err) => {
        if (err) {
          console.log("The email verification code is incorrect");
          return res
            .status(401)
            .json({ message: "The email verification code is incorrect" });
        }

        const db = getDbConnection("react-auth-db");
        const result = await db
          .collection("users")
          .findOneAndUpdate(
            { email },
            { $set: { isVerified: true } },
            { returnOriginal: false }
          );

        const { _id: id, info } = result.value;

        jwt.sign(
          { id, email, isVerified: true, info },
          process.env.JWT_SECRET,
          { expiresIn: "2d" },
          (err, token) => {
            if (err) return res.sendStatus(500);
            res.status(200).json({ token });
          }
        );
      }
    );
  },
};
