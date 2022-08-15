export default interface Puzzle {
  puzzleId: string;
  fen: string;
  moves: number;
  rating: number;
  ratingDeviation: number;
  popularity: number;
  plays: number;
  themes: string[];
  gameUrl: string;
  openingFamily?: string;
  openingVariation?: string;
}
