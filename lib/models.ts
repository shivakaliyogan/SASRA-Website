import mongoose, { Schema, Document, model, models } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  role?: string;
  family?: Array<{ name: string; relation: string }>;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  address: { type: String },
  role: { type: String, default: "devotee" },
  family: [{ name: { type: String, required: true }, relation: { type: String, required: true } }],
  createdAt: { type: Date, default: Date.now }
});

export interface IBooking extends Document {
  id: string;
  name: string;
  devoteeName: string;
  date: Date;
  amount: string;
  gotram?: string;
  status: string;
  email: string;
  createdAt: Date;
}

const BookingSchema = new Schema<IBooking>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  devoteeName: { type: String, required: true },
  date: { type: Date, required: true },
  amount: { type: String, required: true },
  gotram: { type: String },
  status: { type: String, default: "Confirmed" },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export interface IDonation extends Document {
  id: string;
  category: string;
  amount: string;
  date: Date;
  status: string;
  paymentMethod: string;
  email: string;
  createdAt: Date;
}

const DonationSchema = new Schema<IDonation>({
  id: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  amount: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, default: "Paid" },
  paymentMethod: { type: String, required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const User = models.User || model<IUser>("User", UserSchema);
export const Booking = models.Booking || model<IBooking>("Booking", BookingSchema);
export const Donation = models.Donation || model<IDonation>("Donation", DonationSchema);

export interface IBookLending extends Document {
  id: string;
  email: string;
  bookName: string;
  category: string;
  borrowedDate: Date;
  dueDate: Date;
  status: string;
}

const BookLendingSchema = new Schema<IBookLending>({
  id: { type: String, required: true },
  email: { type: String, required: true },
  bookName: { type: String, required: true },
  category: { type: String },
  borrowedDate: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
  status: { type: String, default: "Borrowed" }
});

export const BookLending = models.BookLending || model<IBookLending>("BookLending", BookLendingSchema);
