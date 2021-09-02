import mongoose, { Model, Schema } from 'mongoose'

import { toJSON } from './plugins'
import { ICompany } from '../definitions/interfaces/company.interface'

const companySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  stageId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Stage'
  }
},
{
  timestamps: true,
})

// add plugin that converts mongoose to json
companySchema.plugin(toJSON)

/**
 * @typedef Company
 */
interface ICompanyModel extends Model<ICompany> {
}

export const Company: ICompanyModel = mongoose.model('Company', companySchema) as any
