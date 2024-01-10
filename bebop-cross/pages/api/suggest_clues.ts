import type { NextApiRequest, NextApiResponse } from 'next';

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
      // call localhost:30000/v1/crossword/generate
      // return the string[][] of the crossword
      const url = 'http://localhost:30000/v1/crossword/clues/generate_with_words';
      const response = await fetch(url, {
        method: 'GET',
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
