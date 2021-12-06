import { Request, Response } from "express";
import { 
  createAddress, 
  deleteAddress, 
  getAddressById, 
  getAddresses, 
  getLastUpdatedAddressDate, 
  updateAddress 
} from "../services/address.service";

export async function getAddressesHandler(req: Request, res: Response) {
  const addresses = await getAddresses();

  let updatedAt = await getLastUpdatedAddressDate();

  res.append('Last-Modified', updatedAt)
    .status(200)
    .json(addresses);
}

export async function getAddressHandler(req: Request, res: Response) {
  const address = await getAddressById(req.params.id);

  res.append('Last-Modified', (new Date(address.updatedAt)).toUTCString())
    .status(200)
    .json(address);
}

export async function createAddressHandler(req: Request, res: Response) {
  const address = await createAddress({
    'country': req.body.country,
    'city': req.body.city,
    'street': req.body.street,
    'postalcode': req.body.postalcode,
    'number': req.body.number,
    'numberAddition': req.body.numberAddition
  });

  res.append('Location', `/address/${address.id}`)
    .status(201)
    .json(address);
}

export async function updateAddressHandler(req: Request, res: Response) {
  let address = await updateAddress(req.params.id, {
    'status': req.body.status,
    'email': req.body.email,
    'name': req.body.name
  });

  res.status(200).json(address);
}

export async function deleteAddressHandler(req: Request, res: Response) {
  await deleteAddress(req.params.id);

  res.sendStatus(204);
}