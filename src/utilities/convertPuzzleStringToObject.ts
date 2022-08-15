import Puzzle from '@/types/Puzzle';

export default function convertPuzzleStringToObject(puzzleString: string): Puzzle {
  const [
    puzzleId,
    fen,
    moves,
    rating,
    ratingDeviation,
    popularity,
    plays,
    themes,
    gameUrl,
    openingFamily,
    openingVariation,
  ] = puzzleString.split(',');

  return {
    fen,
    gameUrl,
    moves: moves.split(' ').length,
    openingFamily: openingFamily || undefined,
    openingVariation,
    plays: parseInt(plays, 10),
    popularity: parseInt(popularity, 10),
    puzzleId,
    rating: parseInt(rating, 10),
    ratingDeviation: parseInt(ratingDeviation, 10),
    themes: themes.split(' '),
  };
}
