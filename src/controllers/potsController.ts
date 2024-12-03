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

const deletePot = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedPot = await prisma.pot.delete({
      where: {
        id,
      },
    });

    res
      .status(200)
      .json({ error: false, message: "Pot deleted successfully", deletedPot });
  } catch (error: unknown) {
    if (error instanceof Error) {
      if ((error as any).code === "P2025") {
        return res.status(404).json({
          error: true,
          message: "Pot cannot be found",
        });
      }
    }
  }
};

const potController = {
  getAllPots,
  createPot,
  deletePot,
};

export default potController;
