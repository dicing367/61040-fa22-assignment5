// import type {HydratedDocument, Types} from 'mongoose';
// import type {User} from './model';
// import UserModel from './model';

import type {HydratedDocument, Types} from 'mongoose';
import type {Rating} from './model';
import RatingModel from './model';

/**
 * This file contains a class with functionality to interact with ratings stored
 * in MongoDB. Feel free to add additional operations in this file.
 *
 * Note: HydratedDocument<User> is the output of the RatingModel() constructor,
 * and contains all the information in Rating. https://mongoosejs.com/docs/typescript.html
 */
class RatingCollection {
  /**
   * Add a rating to the collection
   *
   * @param {string} authorId - The id of the user
   * @param {string} freetId - The id of the freet
   * @return {Promise<HydratedDocument<Rating>>} - The newly created Rating
   */
  static async addOne(authorId: Types.ObjectId | string, freetId: Types.ObjectId | string): Promise<HydratedDocument<Rating>> {
      const rating = new RatingModel({
        authorId,
        freetId,
        warnings: new Array<[string, string]> // implement this fully later
        });
      await rating.save(); // Saves rating to MongoDB
      return rating.populate('authorId');
  }

  /**
   * Find a rating by freetId.
   *
   * @param {string} freetId - The freetId of the freet to find
   * @return {Promise<HydratedDocument<User>> | Promise<null>} - The user with the given username, if any
   */
  static async findOneByFreetId(freetId: Types.ObjectId | string): Promise<HydratedDocument<Rating>> {
    return RatingModel.findOne({freetId: freetId});
  }

  // /**
  //  * Update user's information
  //  *
  //  * @param {string} userId - The userId of the user to update
  //  * @param {Object} userDetails - An object with the user's updated credentials
  //  * @return {Promise<HydratedDocument<User>>} - The updated user
  //  */
  // static async updateOne(userId: Types.ObjectId | string, userDetails: any): Promise<HydratedDocument<User>> {
  //   const user = await UserModel.findOne({_id: userId});
  //   if (userDetails.password) {
  //     user.password = userDetails.password as string;
  //   }

  //   if (userDetails.username) {
  //     user.username = userDetails.username as string;
  //   }

  //   await user.save();
  //   return user;
  // }

  /**
   * Delete a rating from the collection.
   *
   * @param {string} ratingId - The ratingId of user to delete
   * @return {Promise<Boolean>} - true if the rating has been deleted, false otherwise
   */
  static async deleteOne(ratingId: Types.ObjectId | string): Promise<boolean> {
    const rating = await RatingModel.deleteOne({_id: ratingId});
    return rating !== null;
  }

  /**
   * Find all ratings by userId
   * `GET /api/doxxshield?author=USERNAME/summary`
   *
   * @param {string} username - User for which the summary is generated
   * @return {Promise<HydratedDocument<Rating>[]> | Promise<null>} - The user with the given username, if any
   */
   static async findAllByUsername(username: Types.ObjectId | string): Promise<HydratedDocument<Rating>[]> {
    return RatingModel.find({userId: username});
  }

  
}

export default RatingCollection;
