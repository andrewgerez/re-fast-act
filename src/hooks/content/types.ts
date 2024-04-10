export interface Content {
  adult: boolean;
  backdrop_paths: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface TMDB {
  page: number;
  results: Content[];
  total_pages: number;
  total_results: number;
}
