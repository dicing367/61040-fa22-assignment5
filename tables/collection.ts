import type {HydratedDocument, Types} from 'mongoose';
import type {Table} from './model';
import TableModel from './model';
import type {User} from '../user/model'; 
import type {Freet} from '../freet/model'; 

/**
 * This file contains a class with functionality to interact with tables stored
 * in MongoDB. Feel free to add additional operations in this file.
 *
 * Note: HydratedDocument<User> is the output of the TableModel() constructor,
 * and contains all the information in User. https://mongoosejs.com/docs/typescript.html
 */
class TableCollection {
  /**
   * Add a Table to the collection
   *
   * @param {string} tablename - The name of the table
   * @param {User} admin - The admin of the table
   * @return {Promise<HydratedDocument<Table>>} - The newly created Table
   */
  static async addOne(tablename: string, admin: User): Promise<HydratedDocument<Table>> {
      const table = new TableModel({
        tablename,
        users: new Array<User>,
        admin,
        mods: new Array<User>,
        freets: new Array<Freet>
        });
      await table.save(); // Saves rating to MongoDB
      return table.populate('tablename');
  }

  /**
   * Find a table by tableId.
   *
   * @param {string} tableId - The tableId of the user to find
   * @return {Promise<HydratedDocument<Table>> | Promise<null>} - The Table with the given username, if any
   */
   static async findOneByTableId(tableId: Types.ObjectId | string): Promise<HydratedDocument<Table>> {
    return TableModel.findOne({_id: tableId});
  }

  /**
   * Find a table by tablename (case insensitive).
   *
   * @param {string} tablename - The tablename of the table to find
   * @return {Promise<HydratedDocument<Table>> | Promise<null>} - The table with the given tablename, if any
   */
  static async findOneByTable(tablename: string): Promise<HydratedDocument<Table>> {
    return TableModel.findOne({tablename: new RegExp(`^${tablename.trim()}$`, 'i')});
  }

  /**
   * Update table's information
   *
   * @param {string} tableId - The tableId of the table to update
   * @param {Object} tableDetails - An object with the updated table information
   * @return {Promise<HydratedDocument<Table>>} - The updated table
   */
  static async updateOne(tableId: Types.ObjectId | string, tableDetails: any): Promise<HydratedDocument<Table>> {
    const table = await TableModel.findOne({_id: tableId});
    if (tableDetails.tablename) {
        table.tablename = tableDetails.tablename as string;
    }

    if (tableDetails.users) {
        table.users = tableDetails.users as Array<User>; // might need to change this
    }

    if (tableDetails.admin) {
        table.admin = tableDetails.admin as User; // might need to change this
    }

    if (tableDetails.mods) {
        table.mods = tableDetails.mods as Array<User>; // might need to change this
    }

    if (tableDetails.freets) {
        table.freets = tableDetails.freets as Array<Freet>; // might need to change this
    }

    await table.save();
    return table;
  }

  /**
   * Delete a table from the collection.
   *
   * @param {string} tableId - The tableId of the table to delete
   * @return {Promise<Boolean>} - true if the table has been deleted, false otherwise
   */
  static async deleteOne(tableId: Types.ObjectId | string): Promise<boolean> {
    const table = await TableModel.deleteOne({_id: tableId});
    return table !== null;
  }
}

export default TableCollection;
