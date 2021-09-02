import { Router } from 'express'

import validate from '../middlewares/validate'
import { StageController } from '../controllers/stage.controller'
import { StageValidation } from '../validations/stage.validation'

export class StageRoute {
  public router: Router
  private stageValidation: StageValidation
  private stageController: StageController

  constructor() {
    this.router = Router()
    this.stageValidation = new StageValidation()
    this.stageController = new StageController()
    this.routes()
  }

  public routes(): void {
    this.router.route('/')
      .get(this.stageController.getStages)
      .post(validate(this.stageValidation.createStage), this.stageController.createStage)

    this.router.route('/:id')
      .patch(validate(this.stageValidation.updateStage), this.stageController.updateStage)
      .delete(validate(this.stageValidation.deleteStage), this.stageController.deleteStage)
  }
}
