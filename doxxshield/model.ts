import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {Freet} from '../freet/model';
import type {User} from '../user/model';

/**
 * This file defines the properties stored in DoxxShield
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for DoxxShield on the backend

export type Rating = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  userId: Types.ObjectId;
  freetId: Types.ObjectId;
  warnings: Array<[string, string]>;
};

// Mongoose schema definition for interfacing with a MongoDB table
// Users stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const RatingSchema = new Schema({
  // The user
  userId: {
    // Use Types.ObjectId outside of the schema
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  // The user's freet
  freetId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Freet'
  },
  // a list of warnings for compromising info in the freet
  warnings: {
    type: Array<[string, string]>,
    required: true
  }
});

const RatingModel = model<Rating>('Rating', RatingSchema);
export default RatingModel;
