import { google } from "googleapis"
import passport from 'passport'
import { Profile as FacebookProfile } from 'passport-facebook';
var FacebookStrategy = require('passport-facebook');

export const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'http://localhost:8000/api/v1/auth/google/callback'
)

const scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
]

export const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    include_granted_scopes: true,
})

export const oauth2facebook = passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID as string,
    clientSecret: process.env.FACEBOOK_APP_SECRET as string,
    callbackURL: "http://localhost:8000/api/v1/auth/facebook/callback",
    profileFields: ['id', 'emails', 'name', 'displayName', 'photos', 'gender', 'birthday', 'profileUrl']
  }, (
    accessToken: string,
    refreshToken: string,
    profile: FacebookProfile,
    done: (error: any, user?: Express.User | false | null) => void
  ) => {
    return done(null, profile);
  }));
  
  passport.serializeUser((user: Express.User, done: (err: any, id?: unknown) => void) => {
    done(null, user);
  });
  
  passport.deserializeUser((obj: unknown, done: (err: any, user?: Express.User | null) => void) => {
    done(null, obj as Express.User);
  });