import type { NextApiRequest, NextApiResponse } from 'next';

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
      // call localhost:30000/v1/crossword/generate
      // return the string[][] of the crossword
      const { word } = req.body;
      console.log(word);
      const url = 'http://localhost:30000/v1/crossword/clues/generate_for_word';
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify( { 'word': word } ),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
      const data = await response.json();
      console.log(data);
      res.status(200).json(JSON.stringify(data));
  } catch (error : any) {
    res.status(500).json({ statusCode: 500, message: error.message });
  }
}
