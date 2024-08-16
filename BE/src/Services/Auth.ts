import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import express from 'express'

const prisma = new PrismaClient();

export default new (class AuthServices {
  async Register(data: Prisma.UserCreateInput) {
    try {
      const findData = await prisma.user.findFirst({
        where: {
          email: data.email,
        },
      });

      if (!findData?.email) {
        const dataUsers = await prisma.user.create({
          data,
        });
        return {
          status: "success",
          messages: "Create data Success",
          data: dataUsers,
        };
      }

      return {
        status: "failed",
        messages: `Email ${data.email} already exist !`,
      };
    } catch (error) {
      throw error;
    }
  }

  async RegisterSuperAdmin(data: Prisma.UserCreateInput) {
    try {
      const findData = await prisma.user.findFirst({
        where: {
          email: data.email,
        },
      });

      if (!findData?.email) {
        const dataUsers = await prisma.user.create({
          data,
        });
        return {
          status: "success",
          messages: "Create data Super Admin Success",
          data: dataUsers,
        };
      }

      return {
        status: "failed",
        messages: `Email ${data.email} already exist !`,
      };
    } catch (error) {
      throw error;
    }
  }

  async Login(data: Prisma.UserCreateInput) {
    try {
      const dataUsers = await prisma.user.findFirst({
        where: {
          email: data.email,
        },
      });

      const comparePswd = await bcrypt.compare(
        data.password,
        String(dataUsers?.password)
      );

      if (!dataUsers?.email || comparePswd == false) {
        return {
          status: "failed",
          messages: `Email or Password ${data.email} is wrong! please try again!`,
        };
      } else {
        const token = Jwt.sign(
          {
            data: {
              id: dataUsers.id,
              fullName: dataUsers.fullName,
              userName: dataUsers.userName,
              email: dataUsers.email,
              image: dataUsers.image,
              tier: dataUsers.tier,
            },
          },
          `${process.env.TOKEN_SECRET}`,
          { expiresIn: "1h" }
        );
        return {
          status: "success",
          messages: "Login Success",
          token,
        };
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async LoginWithGoogle(data: Prisma.UserCreateInput) {
    try {
      let dataUsers = await prisma.user.findFirst({
        where: {
          email: data.email,
        },
      });

      if (!dataUsers) {
        dataUsers = await prisma.user.create({
          data: {
            fullName: data.fullName,
            userName: data.userName,
            email: data.email,
            image: data.image,
            password: data.password,
          },
        });
      }

      const token = Jwt.sign(
        {
          data: {
            id: dataUsers.id,
            fullName: dataUsers.fullName,
            userName: dataUsers.userName,
            email: dataUsers.email,
            image: dataUsers.image,
            tier: dataUsers.tier,
          },
        },
        `${process.env.TOKEN_SECRET}`,
        { expiresIn: "1h" }
      );

      return {
        status: "success",
        messages: "Login Success",
        token,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async LoginWithFacebook(data: Prisma.UserCreateInput) {
    try {
      let dataUsers = await prisma.user.findFirst({
        where: {
          email: data.email,
        },
      });

      if (!dataUsers) {
        dataUsers = await prisma.user.create({
          data: {
            fullName: data.fullName,
            userName: data.userName,
            email: data.email,
            image: data.image,
            password: data.password,
          },
        });
      }

      const token = Jwt.sign(
        {
          data: {
            id: dataUsers.id,
            fullName: dataUsers.fullName,
            userName: dataUsers.userName,
            email: dataUsers.email,
            image: dataUsers.image,
            tier: dataUsers.tier,
          },
        },
        `${process.env.TOKEN_SECRET}`,
        { expiresIn: "1h" }
      );

      //   return res.redirect(`http://localhost:5173/auth-success?token=${token}`)

      return {
        status: "success",
        messages: "Login Success",
        token,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
})();
