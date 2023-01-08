import { Request, Response } from 'express'

export const getInfo = async (req: Request, res: Response) => {
  res.status(200).json({
    todo: 'todo',
  })
}
