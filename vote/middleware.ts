import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import TableCollection from '../tables/collection';

/**
 * Checks if a table with tableId is req.params exists
 */
const isTableExists = async (req: Request, res: Response, next: NextFunction) => {
  const validFormat = Types.ObjectId.isValid(req.params.tableId);
  const table = validFormat ? await TableCollection.findOneByTableId(req.params.tableId) : '';
  if (!table) {
    res.status(404).json({
      error: {
        tableNotFound: `Table with table ID ${req.params.tableId} does not exist.`
      }
    });
    return;
  }

  next();
};

/**
 * Checks if the current user is the admin of the table whose tableId is in req.params
 */
const isValidTableModifier = async (req: Request, res: Response, next: NextFunction) => {
  const table = await TableCollection.findOneByTableId(req.params.tableId);
  const userId = table.admin._id;
  if (req.session.userId !== userId.toString()) {
    res.status(403).json({
      error: `Cannot modify the table due to insufficient permissions.`
    });
    return;
  }

  next();
};

export {
  isTableExists,
  isValidTableModifier
};
