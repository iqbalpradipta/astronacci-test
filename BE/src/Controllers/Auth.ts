import { Request, Response } from "express";
import bcrypt from "bcrypt";
import AuthService from "../Services/Auth";
import { AuthSchema } from "../utils/validation/AuthValidation";
import { authorizationUrl, oauth2Client } from "../Middlewares/Oauth2"
import { google } from "googleapis"


export default new (class AuthController {
  async Register(req: Request, res: Response) {
    try {
      const data = req.body;
      data.password = req.body.password;
      data.email = req.body.email;
      data.image =
        "https://i.pinimg.com/564x/51/52/2c/51522cadab912c00e6fdcd6cd729a10c.jpg";

      data.password = bcrypt.hashSync(req.body.password, 10);

      const response = await AuthService.Register(data);

      if (response.status == "failed") {
        res.status(500).json(response);
      } else {
        res.status(200).json(response);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async RegisterSuperAdmin(req: Request, res: Response) {
    try {
      const data = req.body;
      data.email = req.body.email;
      data.image = "https://i.pinimg.com/564x/51/52/2c/51522cadab912c00e6fdcd6cd729a10c.jpg";
      data.tier = "admin"

      // const { error, value } = AuthSchema.validate(data);
      // if (error) {
      //   return res.status(400).json({ error: error.details[0].message });
      // }

      data.password = bcrypt.hashSync(req.body.password, 10);

      const response = await AuthService.RegisterSuperAdmin(data);

      if (response.status == "failed") {
        res.status(500).json(response);
      } else {
        res.status(200).json(response);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async Login(req: Request, res: Response) {
    try {
      const data = req.body;

      const response = await AuthService.Login(data);

      if (response.status == "failed") {
        res.status(400).json(response);
      } else {
        res.status(200).json(response);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  async LoginWithGoogle(req: Request, res: Response) {
    try {
      const { code } = req.query;

      const { tokens } = await oauth2Client.getToken(code as string);

      oauth2Client.setCredentials(tokens);

      const oauth2 = google.oauth2({
        auth: oauth2Client,
        version: "v2",
      });

      const { data } = await oauth2.userinfo.get();
      if (!data) {
        return res.json({
          data: data
        });
      }


      const userInput = {
        fullName: data.name || '',       
        userName: `${data.given_name?.toLowerCase()}${data.family_name?.toLowerCase()}` || '',       
        password: bcrypt.hashSync(`${Date.now() + Math.round(Math.random() * 1e9)}`, 10),  
        email: data.email || '',
        image: data.picture || '',
      };

      const response = await AuthService.LoginWithGoogle(userInput)

      res.redirect(`http://localhost:5173/login?token=${response.token}`)

    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  async LoginWithFacebook(req: Request, res: Response) {
    try {
      const data = req.user;

      if (!data) {
        return res.json({
          data: data
        });
      }

      console.log(data)

      const userInput = {
        fullName: data.displayName || '',       
        userName: `${data.name.givenName?.toLowerCase()}${data.familyName?.toLowerCase()}` || '',       
        password: bcrypt.hashSync(`${Date.now() + Math.round(Math.random() * 1e9)}`, 10),  
        email: data.emails[0].value || '',
        image: data.photos[0].value || '',
      };

      const response = await AuthService.LoginWithFacebook(userInput);


      res.redirect(`http://localhost:5173/login?token=${response.token}`)

    } catch (error) {
      console.log(error);
      res.status(500).json({ status: 'error', messages: 'Internal Server Error' });
    }
  }
})();
