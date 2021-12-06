import express from 'express';
import { 
  createAddressHandler, 
  deleteAddressHandler, 
  getAddressesHandler, 
  getAddressHandler, 
  updateAddressHandler 
} from './controllers/address.controller';
import { body, param } from 'express-validator';
import { validateRequest } from './middlewares/validateRequest';
import { AddressStatus } from './models/address.model';
import { ResponseError } from './errors/responseError';
import mongoose from 'mongoose';
import asyncHandler from "express-async-handler"

const router = express.Router();

router.get('/address', asyncHandler(getAddressesHandler));
router.get(
  '/address/:id',
  [
    param('id')
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('The id param should be valid.'),
  ],
  validateRequest,
  asyncHandler(getAddressHandler)
);
router.post(
  '/address',
  [
    body('country')
      .notEmpty()
      .isISO31661Alpha2()
      .withMessage('The country field should be a valid Alpha-2 code from ISO 3166-1'),
    body('city').isString().notEmpty(),
    body('street').isString().notEmpty(),
    body('postalcode')
    .isString()
    .isLength({min: 5, max: 5})
    .withMessage('The postalcode field should be exactly 5 characters long')
    .matches(/^\d{5}$/)
    .withMessage('The postalcode field can only contain digits'),
    body('number')
      .isInt({gt: 0})
      .withMessage('The number field should be positive integer'),
    body('numberAddition').isString(),
  ],
  validateRequest,
  asyncHandler(createAddressHandler)
);
router.patch(
  '/address/:id',
  [ 
    param('id')
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('The id param should be valid.'),
    body('status')
      .isIn(Object.values(AddressStatus))
      .withMessage(`The status field must be one of the following: ${Object.values(AddressStatus)}`),
    body('email')
      .optional()
      .isEmail()
      .withMessage('The email field should be a valid email address.'),
    body('name').optional().isString()
  ],
  validateRequest,
  asyncHandler(updateAddressHandler)
);
router.delete(
  '/address/:id',
  [
    param('id')
    .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
    .withMessage('The id param should be valid.'),
  ],
  validateRequest,
  asyncHandler(deleteAddressHandler)
);

router.all('*', (req, res) => {
  throw new ResponseError("Not found", 404);
});

export { router };

