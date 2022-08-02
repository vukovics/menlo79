export interface IShow {
  id: Number;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  runtime: number;
  averageRuntime: number;
  premiered: string;
  ended: Date;
  officialSite: string;
  schedule: ISchedule;
  rating: IRating;
  weight: number;
  network: string;
  webChannel: IWebChannel;
  dvdCountry: null;
  externals: IExternals;
  image: IImage;
  summary: string;
  updated: number;
  _links: I_links;
  previousepisode: IPreviousepisode;
}

export interface IPreviousepisode {
  href: string;
}
export interface I_links {
  self: ISelf;
}
export interface ISelf {
  href: string;
}
export interface ISchedule {
  time: TimeRanges;
  days: string[];
}

export interface IRating {
  average: null;
}

export interface IWebChannel {
  id: number;
  name: string;
  country: null;
  officialSite: null;
}

export interface IExternals {
  tvrage: null;
  thetvdb: number;
  country: null;
  imdb: string;
}

export interface IImage {
  medium: string;
  original: string;
}
