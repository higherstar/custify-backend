import httpStatus from 'http-status'

import { Stage } from '../models/stage.model'
import { ApiError } from '../utils'

export class StageRepository {

  constructor() {
  }

  public findById = async (id) => {
    return Stage.findById(id)
  }

  public findAll = async () => {
    return Stage
      .find()
      .populate('companies')
  }

  public createStage = async (stageBody) => {
    return Stage.create(stageBody)
  }

  public updateStageById = async (id, updateBody) => {
    const stage = await Stage.findById(id)

    if (!stage) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Stage not found')
    }

    Object.assign(stage, updateBody)
    await stage.save()
    return stage
  }
}
