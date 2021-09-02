import mongoose, { Model, Schema } from 'mongoose'

import { toJSON } from './plugins'
import { IStage } from '../definitions/interfaces/stage.interface'

const stageSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  companies: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Company'
    }
  ]
},
{
  timestamps: true,
})

// add plugin that converts mongoose to json
stageSchema.plugin(toJSON)

/**
 * @typedef Stage
 */
interface IStageModel extends Model<IStage> {
}

export const Stage: IStageModel = mongoose.model('Stage', stageSchema) as any
