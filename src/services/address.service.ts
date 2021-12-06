import { ResponseError } from "../errors/responseError";
import addressModel, { AddressStatus } from "../models/address.model";

export async function getAddresses() {
  const addresses = await addressModel.find();
  
  return addresses;
}

export async function getLastUpdatedAddressDate() {
  const address = await addressModel.findOne().sort({updatedAt: 'desc'});
  
  // If the database is empty Thu, 01 Jan 1970 00:00:00 GMT will be returned
  const updatedAt = new Date(address ? address.updatedAt : 0).toUTCString();

  return updatedAt;
}

export async function getAddressById(id: string) {
  const address = await addressModel.findById(id);
  
  if(!address) {
    throw new ResponseError("The requested address could not be found", 404);
  }

  return address;
}

export async function createAddress(data: any) {
  const address = await addressModel.create(data);

  return address;
}

export async function updateAddress(id: string, data: any) {
  const address = await getAddressById(id);
  
  if(
    address.status === AddressStatus.NOT_INTERESTED 
    || address.status === AddressStatus.INTERESTED
  ) {
    throw new ResponseError("The address can only be modified if status is either 'null' or 'not at home'", 403);
  }

  return await addressModel.findByIdAndUpdate(address._id, data, {returnDocument: 'after'});
}

export async function deleteAddress(id: string) {
  const address = await getAddressById(id);

  try {
    await addressModel.findByIdAndDelete(address._id);
  }
  catch {
    throw new ResponseError("Resource conflict occured please try again later.", 409);
  }
}