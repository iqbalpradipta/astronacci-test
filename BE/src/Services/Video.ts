import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default new (class VideoService {
  async GetAllVideo(tier: string) {
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

      const getData = await prisma.video.findMany({
        relationLoadStrategy: "join",
        select: {
          id: true,
          title: true,
          video: true,
          postDate: true,
          author: true,
        },
        take: limit,
      });

      return {
        status: "success",
        messages: "success get all Videos",
        data: getData,
      };
    } catch (error) {
      throw error;
    }
  }

  async GetVideoById(id: number) {
    try {
      const getData = await prisma.video.findUnique({
        relationLoadStrategy: "join",
        select: {
          id: true,
          title: true,
          video: true,
          postDate: true,
          author: true,
        },
        where: {
          id: id,
        },
      });

      if (!getData?.id) {
        return {
          status: "failed",
          messages: "failed get Video",
        };
      } else {
        return {
          status: "success",
          messages: "success get Video",
          data: getData,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async CreateVideo(data: Prisma.VideoCreateInput) {
    try {
      const createData = await prisma.video.create({
        data,
      });

      return {
        status: "success",
        messages: "Success create Video",
        data: createData,
      };
    } catch (error) {
      throw error;
    }
  }

  async UpdateVideo(id: number, data: Prisma.VideoUpdateInput) {
    try {
      const searchVideo = await prisma.video.findFirst({
        where: {
          id: id,
        },
      });

      if (searchVideo) {
        const updateData = await prisma.video.update({
          where: {
            id: id,
          },
          data: {
            title: data.title,
            video: data.video,
            postDate: data.postDate,
          },
        });

        return {
          status: "success",
          messages: "success update Video",
          data: updateData,
        };
      } else {
        return {
          status: "failed",
          messages: `Video with id = ${id} not found!`,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async DeleteVideo(id: number) {
    try {
      const VideoDelete = await prisma.video.findFirst({
        where: {
          id,
        },
      });

      if (VideoDelete?.id) {
        await prisma.video.delete({
          where: {
            id: id,
          },
        });

        return {
          status: "success",
          messages: "success delete Video",
        };
      } else {
        return {
          status: "failed",
          messages: `failed delete Video with id = ${id}`,
        };
      }
    } catch (error) {
      throw error;
    }
  }
})();
