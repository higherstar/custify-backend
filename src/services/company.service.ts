import httpStatus from 'http-status'

import { CompanyRepository } from '../repositories/company.repository'
import { ApiError } from '../utils'
import { StageRepository } from '../repositories/stage.repository'
import { StageService } from './stage.service'

export class CompanyService {
  private companyRepository: CompanyRepository
  private stageRepository: StageRepository
  private stageService: StageService

  constructor() {
    this.companyRepository = new CompanyRepository()
    this.stageRepository = new StageRepository()
    this.stageService = new StageService()
  }

  public getCompanies = async () => {
    return this.companyRepository.findAll()
  }

  public createCompany = async (companyBody) => {
    const stage = await this.stageRepository.findById(companyBody.stageId)
    if (!stage)
      throw new ApiError(httpStatus.BAD_REQUEST, 'Stage not found')

    const company = await this.companyRepository.createCompany(companyBody)
    await this.stageService.addCompany(stage.id, company.id)
    return company
  }

  public deleteCompany = async (id) => {
    const company = await this.companyRepository.findById(id)
    if (!company)
      throw new ApiError(httpStatus.BAD_REQUEST, 'Company not found')

    const stage = await this.stageRepository.findById(company.stageId)
    if (!stage)
      throw new ApiError(httpStatus.BAD_REQUEST, 'Stage not found')

    await this.stageService.removeCompany(stage.id, company.id)
    await company.remove()
  }

  public moveCompany = async (companyId, position, toStageId) => {
    const company = await this.companyRepository.findById(companyId)
    if (!company)
      throw new ApiError(httpStatus.BAD_REQUEST, 'Company not found')

    await this.stageService.moveCompany(company, position, toStageId)

    if (toStageId !== company.stageId) {
      company.stageId = toStageId
      await company.save()
    }

    return company
  }
}
