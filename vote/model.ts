import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {Freet} from '../freet/model';
import type {User} from '../user/model';

/**
 * This file defines the properties stored in Tables
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for Tables on the backend

export type Table = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  tablename: string;
  users: Array<User>;
  admin: User;
  mods: Array<User>;
  freets: Array<Freet>;
};

// Mongoose schema definition for interfacing with a MongoDB table
// Users stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const TableSchema = new Schema({
  // a list of users in the table
  tablename: {
    type: String,
    required: true
  },
  // a list of users in the table
  users: {
    type: Array<User>,
    required: true
  },
  admin: {
    // Use Types.ObjectId outside of the schema
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  // a list of mods in the table
  mods: {
    type: Array<User>,
    required: true
  },
  // a list of freets in the table
  freets: {
    type: Array<Freet>,
    required: true
  }
});

const TableModel = model<Table>('Table', TableSchema);
export default TableModel;
