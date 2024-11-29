import { Request, Response } from "express";
import prisma from "../config/db";

const getAllPots = async (req: Request, res: Response) => {
  try {
    const pots = await prisma.pot.findMany({
      orderBy: { name: "asc" },
    });

    res.json({
      error: false,
      body: pots,
    });
  } catch (error) {
    res.status(500);
    console.error(error);
  }
};

const createPot = async (req: Request, res: Response) => {
  try {
    const pot = req.body;
    const newPot = await prisma.pot.create({ data: pot });
    res.status(200).json({ error: false, body: newPot });
  } catch (error) {
    res.status(500);
    console.error(error);
  }
};

const potController = {
  getAllPots,
  createPot,
};

export default potController;
