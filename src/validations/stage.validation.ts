import Joi from '@hapi/joi'

export class StageValidation {
  public createStage = {
    body: Joi.object().keys({
      name: Joi.string().required(),
    }),
  }

  public updateStage = {
    params: Joi.object().keys({
      id: Joi.string().required(),
    }),
    body: Joi.object().keys({
      name: Joi.string().required(),
    }),
  }

  public deleteStage = {
    params: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }
}
