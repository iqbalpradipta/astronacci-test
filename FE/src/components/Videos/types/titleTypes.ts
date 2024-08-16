export interface ITitleVideo {
    id?: number;
    video?: string;
    title?: string
}

export interface IVideoResponse {
    data: ITitleVideo[];
    messages: string;
    status: string;
  }