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

const getOnePot = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const pot = await prisma.pot.findUnique({ where: { id: id } });

    if (pot) {
      return res.json({
        error: false,
        body: pot,
      });
    }

    return res.status(404).json({
      error: true,
      message: "Pot Not Found",
    });
  } catch (error) {
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

const updatePot = async (req: Request, res: Response) => {
  const updates = req.body;
  const { id } = updates;
  console.log(id);

  try {
    const pot = await prisma.pot.findUnique({
      where: {
        id: id,
      },
    });

    if (pot) {
      const updatedPot = await prisma.pot.update({
        where: { id: id },
        data: updates,
      });

      res.status(200).json(updatedPot);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json("There was an unexpected problem!");
  }
};

const addMoneyToPot = async (req: Request, res: Response) => {
  const { id } = req.params;
  //TODO it import to make sure that this amount in not negative and when added doesn't exceed target of the pot
  const { amount } = req.body;

  try {
    const pot = await prisma.pot.findUnique({
      where: {
        id: id,
      },
    });
    if (pot) {
      const updatedTotal = Number(pot.total) + Number(amount);
      const updatedPot = await prisma.pot.update({
        where: { id: id },
        data: { ...pot, total: updatedTotal },
      });
      res.status(200).json(updatedPot);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json("There was an unexpected problem!");
  }
};

const withdrawFromPot = async (req: Request, res: Response) => {
  const { id } = req.params;
  //TODO it import to make sure that this amount in not more than the existing total
  const { amount } = req.body;

  try {
    const pot = await prisma.pot.findUnique({
      where: {
        id: id,
      },
    });
    if (pot) {
      const updatedTotal = Number(pot.total) - Number(amount);
      const updatedPot = await prisma.pot.update({
        where: { id: id },
        data: { ...pot, total: updatedTotal },
      });
      res.status(200).json(updatedPot);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json("There was an unexpected problem!");
  }
};

const potController = {
  getAllPots,
  createPot,
  deletePot,
  updatePot,
  getOnePot,
  addMoneyToPot,
  withdrawFromPot,
};

export default potController;
