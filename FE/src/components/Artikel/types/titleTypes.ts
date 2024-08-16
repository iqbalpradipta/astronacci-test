export interface ITitleArtikel {
    id?: number;
    content?: string;
    title?: string
}

export interface IArtikelResponse {
    data: ITitleArtikel[];
    messages: string;
    status: string;
  }