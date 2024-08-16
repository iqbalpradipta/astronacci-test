import express from "express";
import AuthController from "../Controllers/Auth";
import UserController from "../Controllers/User";
import ArtikelController from "../Controllers/Artikel";
import VideoController from "../Controllers/Video";
import { upload } from "../Middlewares/uploadFile";
import { authorizationUrl } from "../Middlewares/Oauth2";
import JWTAuth from "../Middlewares/JWTAuth";
import passport from "passport";

const Routes = express.Router();

// AUTH
Routes.post("/users/register", AuthController.Register);
Routes.post("/users/admin", AuthController.RegisterSuperAdmin);
Routes.post("/users/login", AuthController.Login);

// AUTH GOOGLE
Routes.get("/auth/google", (req, res: express.Response) => {
  res.redirect(authorizationUrl);
});
Routes.get("/auth/google/callback", AuthController.LoginWithGoogle);

// AUTH FACEBOOK
Routes.get("/auth/facebook", passport.authenticate('facebook', { scope: ['email', 'public_profile'] }))
Routes.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { failureRedirect: '/login', session: false }), 
  AuthController.LoginWithFacebook
);

// USER
Routes.get("/users", JWTAuth.authenticateJWT(['admin']), UserController.GetAllUsers);
Routes.get(`/users/:id`, JWTAuth.authenticateJWT(['member', 'super member', 'vip' ,'admin']), UserController.GetUserById);
Routes.patch("/users/:id", JWTAuth.authenticateJWT(['member', 'super member', 'vip' ,'admin']) , upload.single("image"), UserController.UpdateUser);
Routes.delete("/users/:id", UserController.DeleteUsers);

// ARTIKEL
Routes.get("/artikel", JWTAuth.authenticateJWT(['member', 'super member', 'vip' ,'admin']), ArtikelController.GetAllArtikel);
Routes.get("/artikel/:id", JWTAuth.authenticateJWT(['member', 'super member', 'vip' ,'admin']), ArtikelController.GetArtikelById);
Routes.post("/artikel",  JWTAuth.authenticateJWT(['admin']), upload.single("image"), ArtikelController.CreateArtikel);
Routes.patch("/artikel/:id", JWTAuth.authenticateJWT(['admin']), upload.single("image"), ArtikelController.UpdateArtikel);
Routes.delete("/artikel/:id",  JWTAuth.authenticateJWT(['admin']), ArtikelController.DeleteArtikel);

// VIDEO
Routes.get("/video", JWTAuth.authenticateJWT(['member', 'super member', 'vip' ,'admin']), VideoController.GetAllVideo);
Routes.get("/video/:id", JWTAuth.authenticateJWT(['member', 'super member', 'vip' ,'admin']), VideoController.GetVideoById);
Routes.post("/video", upload.single("image"), VideoController.CreateVideo);
Routes.patch("/video/:id", upload.single("image"), VideoController.UpdateVideo);
Routes.delete("/video/:id", VideoController.DeleteVideo);

export default Routes;
