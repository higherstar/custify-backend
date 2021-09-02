import Joi from '@hapi/joi'
import { objectId } from "./custom.validator"

export class CompanyValidation {
  public createCompany = {
    body: Joi.object().keys({
      name: Joi.string().required(),
      stageId: Joi.string().custom(objectId).required()
    }),
  }

  public updateCompany = {
    params: Joi.object().keys({
      id: Joi.string().custom(objectId).required(),
    }),
    body: Joi.object().keys({
      name: Joi.string().required(),
    }),
  }

  public getCompany = {
    params: Joi.object().keys({
      id: Joi.string().custom(objectId).required(),
    })
  }

  public deleteCompany = {
    params: Joi.object().keys({
      id: Joi.string().custom(objectId).required(),
    }),
  }

  public moveCompany = {
    params: Joi.object().keys({
      id: Joi.string().custom(objectId).required(),
    }),
    body: Joi.object().keys({
      position: Joi.number().required(),
      toStageId: Joi.string().custom(objectId),
    }),
  }
}
