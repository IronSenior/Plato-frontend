  
import jose from "jose";
import jwt from "jsonwebtoken";
import { isLoginResponse, isCredentials, isJwtPayload } from "../../../utils/auth";
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions, User } from 'next-auth';
import Providers from 'next-auth/providers';
import axios from "axios";


const options = {
  session: {
    jwt: true,
  },
  callbacks: {
    session: async (session, user) => {
      /* 
        Here user is the jwt returned by the jwt callback
      */ 
      session.access_token = user.access_token;
      session.userId = user.userId
      session.user = {
        name: user.username,
        email: user.usermail,
        image: null,
      }
      return session;
    },
    jwt: async (token, user, account, profile, isNewUser) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.userId = profile.userObject.userId;
        token.usermail = profile.userObject.usermail;
        token.username = profile.userObject.username;
        token.access_token = profile.access_token;
      }
      return Promise.resolve(token);
    },
  },
  secret: process.env.NODE_JWT_SECRET,
  jwt: {
    secret: process.env.NODE_JWT_SECRET,
    encode: async ({ secret, token, maxAge }) => {
      const signingOptions: jose.JWT.SignOptions = {
        expiresIn: `${maxAge}s`,
        algorithm: 'HS512',
      };

      return jose.JWT.sign(token, secret, signingOptions);
    },
    // @ts-expect-error: Error in InitOptions declaration
    decode: async ({ secret, token, maxAge }) => {
      if (!token) return null;

      const verificationOptions = {
        maxTokenAge: `${maxAge}s`,
        algorithms: ['RS256', 'HS256', 'RS512', 'HS512'],
      };

      return jose.JWT.verify(token, secret, verificationOptions);
    },
  },
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        usermail: { label: 'Email', type: 'email' },
        password: { label: 'Contraseña', type: 'password' },
      },
      authorize: async (credentials): Promise<User> => {
        try {
          if (!isCredentials(credentials)) {
            console.error('next-auth - missing attributes in credentials');
            return Promise.resolve(null);
          }

          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_PLATO_API_URL}/user/login/`,
            credentials
          );

          if (!isLoginResponse(res.data)) {
            console.error(
              'next-auth - missing attributes in login response',
              JSON.stringify(res.data)
            );
            return Promise.resolve(null);
          }
          const verify = jwt.verify(
            res.data.access_token,
            process.env.NODE_JWT_SECRET
          );

          if (!isJwtPayload(verify)) {
            console.error(
              'next-auth - missing attributes in response payload',
              JSON.stringify(verify)
            );
            return Promise.resolve(null);
          }

          return Promise.resolve({
            userObject: res.data.user,
            access_token: res.data.access_token,
          });
        } catch (e) {
          console.error('next-auth - error in credentials');
          console.error(e);
          return Promise.resolve(null);
        }
      },
    }),
  ],
  pages: {
    singIn: "/login",
  },
  debug: process.env.NODE_ENV === 'development',
} as NextAuthOptions;

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);