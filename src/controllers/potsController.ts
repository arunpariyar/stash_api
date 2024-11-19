import { Request, Response } from "express";
import prisma from "../config/db";

const getAllPots = async (req: Request, res: Response) => {
  try {
    const pots = await prisma.pot.findMany();

    res.json({
      error: false,
      body: pots,
    });
  } catch (error) {
    res.status(500);
    console.error(error);
  }
};

const potController = {
  getAllPots,
};

export default potController;
