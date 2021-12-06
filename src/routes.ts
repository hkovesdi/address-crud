import express from 'express';
import { 
  createAddressHandler, 
  deleteAddressHandler, 
  getAddressesHandler, 
  getAddressHandler, 
  updateAddressHandler 
} from './controllers/address.controller';
import { validateRequest } from './middlewares/validateRequest';
import { ResponseError } from './errors/responseError';
import asyncHandler from "express-async-handler"
import { createAddressValidator, deleteAddressValidator, getAddressValidator, updateAddressValidator } from './validators/address.validator';

const router = express.Router();

router.get(
  '/address', 
  asyncHandler(getAddressesHandler)
);
router.get(
  '/address/:id',
  getAddressValidator(),
  validateRequest,
  asyncHandler(getAddressHandler)
);
router.post(
  '/address',
  createAddressValidator(),
  validateRequest,
  asyncHandler(createAddressHandler)
);
router.patch(
  '/address/:id',
  updateAddressValidator(),
  validateRequest,
  asyncHandler(updateAddressHandler)
);
router.delete(
  '/address/:id',
  deleteAddressValidator(),
  validateRequest,
  asyncHandler(deleteAddressHandler)
);

router.all('*', (req, res) => {
  throw new ResponseError("Not found", 404);
});

export { router };

