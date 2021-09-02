import { Request, Response } from 'express'
import httpStatus from 'http-status'

import { catchAsync } from '../utils'
import { StageService } from '../services/stage.service'
import { StageRepository } from '../repositories/stage.repository'

export class StageController {
  private stageService: StageService
  private stageRepository: StageRepository

  constructor() {
    this.stageService = new StageService()
    this.stageRepository = new StageRepository()
  }

  public getStages = catchAsync(async (req: Request, res: Response) => {
    const result = await this.stageService.getStages()
    res.status(httpStatus.OK).json(result)
  })

  public createStage = catchAsync(async (req: Request, res: Response) => {
    const result = await this.stageRepository.createStage(req.body)
    res.status(httpStatus.OK).json(result)
  })

  public updateStage = catchAsync(async (req: Request, res: Response) => {
    const result = await this.stageRepository.updateStageById(req.params.id, req.body)
    res.status(httpStatus.OK).json(result)
  })

  public deleteStage = catchAsync(async (req: Request, res: Response) => {
    await this.stageService.deleteStage(req.params.id)
    res.status(httpStatus.NO_CONTENT).json()
  })
}
