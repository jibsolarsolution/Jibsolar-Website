import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBusinessInfo extends Document {
  userId: mongoose.Types.ObjectId;
  monthlyPowerBill?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BusinessInfoSchema: Schema<IBusinessInfo> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User', index: true },
    monthlyPowerBill: { type: String, required: false, trim: true },
  },
  {
    timestamps: true,
    autoIndex: process.env.NODE_ENV !== 'production',
  }
);

// Indexes for query performance
BusinessInfoSchema.index({ userId: 1 });

const BusinessInfo: Model<IBusinessInfo> =
  mongoose.models.BusinessInfo || mongoose.model<IBusinessInfo>('BusinessInfo', BusinessInfoSchema, 'business_info');

export default BusinessInfo;
