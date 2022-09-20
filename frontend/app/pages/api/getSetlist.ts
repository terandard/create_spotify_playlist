import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const query = req.query;
  const { url } = query;
  const response = await fetch('http://ruby-api:8080/api/scraping?url='+url)
  const result = await response.json()
  console.log(result)
  res.status(200).json(result)
}