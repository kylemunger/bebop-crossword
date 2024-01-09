import type { NextApiRequest, NextApiResponse } from 'next';

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
      // call localhost:30000/v1/crossword/generate
      // return the string[][] of the crossword
      const { words } = req.body;
      const url = 'http://localhost:30000/v1/crossword/generate';
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify( words ),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
      const data = await response.json();

      // return response.json().grid;
      res.status(200).json(JSON.stringify(data.grid));
  } catch (error : any) {
    res.status(500).json({ statusCode: 500, message: error.message });
  }
}
