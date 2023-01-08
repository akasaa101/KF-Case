import { Request, Response } from 'express'

export const createOutages = async (req: Request, res: Response) => {
  res.status(200).json({
    todo: 'todo',
  })
}
