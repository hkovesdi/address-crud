import mongoose, { Document, Schema } from 'mongoose';

export enum AddressStatus {
  NOT_AT_HOME = "not at home",
  NOT_INTERESTED = "not interested",
  INTERESTED = "interested"
};

export interface AddressDocument extends Document {
  country: String,
  city: String,
  street: String,
  postalcode: String,
  number: Number,
  numberAddition: String,
  status?: AddressStatus,
  name?: String,
  email?: String,
  updatedAt: Date,
  createdAt: Date
}

const AddressSchema: Schema = new Schema(
  {
    country: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    street: {
      type: String,
      required: true
    },
    postalcode: {
      type: String,
      required: true
    },
    number: {
      type: Number,
      required: true
    },
    numberAddition: {
      type: String,
      nullable: false
    },
    status: {
      type: String,
      nullable: true,
      enum: [...Object.values(AddressStatus), null],
      default: null
    },
    name: {
      type: String,
      nullable: true,
      default: null
    },
    email: {
      type: String,
      nullable: true,
      default: null
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model<AddressDocument>('Address', AddressSchema);