import { Request, Response } from "express";
import prisma from "../config/db";

const getAllTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await prisma.transaction.findMany();

    res.send({
      error: false,
      body: transactions,
    });
  } catch (error) {
    res.status(500);
    console.error(error);
  }
};

const transactionsController = {
  getAllTransactions,
};

export default transactionsController;

// TODO this code can be used later for calculating total expense and income for another api route
// const income = transactions.reduce((acc, current) => {
//   if (current.amount > 0) {
//     return acc + current.amount;
//   }
//   return acc;
// }, 0);

// const expense = transactions.reduce((acc, current) => {
//   if (current.amount < 0) {
//     return acc + current.amount;
//   }
//   return acc;
// }, 0);
// console.log({ income, expense });
