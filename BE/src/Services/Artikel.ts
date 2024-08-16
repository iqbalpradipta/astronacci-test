import { Prisma, PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();

export default new (class ArtikelService {
  async GetAllArtikel(tier: string) {
    try {
      let limit: number | undefined;

      switch (tier) {
        case "member":
          limit = 3;
          break;
        case "super member":
          limit = 10;
          break;
        case "vip":
          limit = undefined; 
          break;
        case "admin":
          limit = undefined; 
          break;
        default:
          limit = 0; 
          break;
      }

      const getData = await prisma.artikel.findMany({
        relationLoadStrategy: "join",
        select: {
          id: true,
          title: true,
          postDate: true,
          content: true,
          image: true,
          author: true,
        },
        take: limit,
      });

      return {
        status: "success",
        messages: "success get all Artikels",
        data: getData,
      };
    } catch (error) {
      throw error;
    }
  }

  async GetArtikelById(id: number) {
    try {
      const getData = await prisma.artikel.findUnique({
        relationLoadStrategy: "join",
        select: {
          id: true,
          title: true,
          postDate: true,
          content: true,
          image: true,
          author: true,
        },
        where: {
          id: id,
        },
      });

      if (!getData?.id) {
        return {
          status: "failed",
          messages: "failed get Artikel",
        };
      } else {
        return {
          status: "success",
          messages: "success get Artikel",
          data: getData,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async CreateArtikel(data: Prisma.ArtikelCreateInput) {
    try {
      const createData = await prisma.artikel.create({
        data,
      });

      return {
        status: "success",
        messages: "Success create Artikel",
        data: createData,
      };
    } catch (error) {
      throw error;
    }
  }

  async UpdateArtikel(id: number, data: Prisma.ArtikelUpdateInput) {
    try {
      const searchArtikel = await prisma.artikel.findFirst({
        where: {
          id: id,
        },
      });

      if (searchArtikel) {
        const updateData = await prisma.artikel.update({
          where: {
            id: id,
          },
          data: {
            title: data.title,
            postDate: data.postDate,
            content: data.content,
            image: data.image,
          },
        });

        return {
          status: "success",
          messages: "success update Artikel",
          data: updateData,
        };
      } else {
        return {
          status: "failed",
          messages: `Artikel with id = ${id} not found!`,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async DeleteArtikel(id: number) {
    try {
      const ArtikelDelete = await prisma.artikel.findFirst({
        where: {
          id,
        },
      });

      if (ArtikelDelete?.id) {
        await prisma.artikel.delete({
          where: {
            id: id,
          },
        });

        return {
          status: "success",
          messages: "success delete Artikel",
        };
      } else {
        return {
          status: "failed",
          messages: `failed delete artikel with id = ${id}`,
        };
      }
    } catch (error) {
      throw error;
    }
  }
})();
