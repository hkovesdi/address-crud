import { body, param } from "express-validator";
import  mongoose  from "mongoose";
import { AddressStatus } from "../models/address.model";

export function addressIdValidator() {
  return [
    // The ID has to be a valid mongoose ObjectId
    param('id')
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('The id param should be a valid ObjectId.'),
  ];
}

export function getAddressValidator() {
  return addressIdValidator();
}

export function createAddressValidator() {
  return [
    // Country has to be a non empty ISO31661 Alpha 2 compliant string
    body('country')
      .notEmpty()
      .isISO31661Alpha2()
      .withMessage('The country field should be a valid Alpha-2 code from ISO 3166-1'),

    // The city has to be a non empty string
    body('city')
      .isString()
      .notEmpty(),

    // The street has to be a non empty string
    body('street')
      .isString()
      .notEmpty(),

    // The postalcode has to be an exactly 5 character long string that only contains digits
    body('postalcode')
      .isString()
      .isLength({min: 5, max: 5})
      .withMessage('The postalcode field should be exactly 5 characters long')
      .matches(/^\d{5}$/)
      .withMessage('The postalcode field can only contain digits'),

    // The number has to be a positive integer
    body('number')
      .isInt({gt: 0})
      .withMessage('The number field should be positive integer'),

    // The number addition has to be a string (can be empty aswell)
    body('numberAddition').isString(),
  ];
}

export function updateAddressValidator() {
  return [
    ...addressIdValidator(),
    // The status has to be of type AddressStatus enum
    body('status')
      .isIn(Object.values(AddressStatus))
      .withMessage(`The status field must be one of the following: ${Object.values(AddressStatus)}`),

    // The email is optional but if present has to be a valid email address
    body('email')
      .optional()
      .isEmail()
      .withMessage('The email field should be a valid email address.'),

    //The name is optional but if present has to be a string
    body('name')
      .optional()
      .isString()
  ];
}

export function deleteAddressValidator() {
  return addressIdValidator();
}