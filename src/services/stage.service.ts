import httpStatus from 'http-status'

import { StageRepository } from '../repositories/stage.repository'
import { ApiError } from '../utils'
import { CompanyRepository } from '../repositories/company.repository'
import { ICompany } from '../definitions/interfaces/company.interface'

export class StageService {
  private stageRepository: StageRepository
  private companyRepository: CompanyRepository

  constructor() {
    this.stageRepository = new StageRepository()
    this.companyRepository = new CompanyRepository()
  }

  public getStages = async () => {
    return this.stageRepository.findAll()
  }

  public deleteStage = async (id) => {
    const stage = await this.stageRepository.findById(id)

    if (!stage)
      throw new ApiError(httpStatus.BAD_REQUEST, 'Stage not found')

    if (stage.companies && stage.companies.length > 0) {
      await this.companyRepository.removeCompanies(stage.companies)
    }
    await stage.remove()
  }

  public addCompany = async (stageId, companyId) => {
    const stage = await this.stageRepository.findById(stageId)
    if (!stage)
      throw new ApiError(httpStatus.BAD_REQUEST, 'Stage not found')

    stage.companies.push(companyId)
    await stage.save()
  }

  public removeCompany = async (stageId, companyId) => {
    const stage = await this.stageRepository.findById(stageId)
    if (!stage)
      throw new ApiError(httpStatus.BAD_REQUEST, 'Stage not found')

    const companies = [...stage.companies]
    stage.companies = companies.filter((id) => id != companyId)
    await stage.save()
  }

  public moveCompany = async (company: ICompany, position, toStageId) => {
    const stage = await this.stageRepository.findById(company.stageId)
    if (!stage)
      throw new ApiError(httpStatus.BAD_REQUEST, 'Stage not found')

    const companies = [...stage.companies]
    const newCompanyList = companies.filter((id) => id != company.id)

    if (toStageId === stage.id) {
      newCompanyList.splice(position, 0, company.id)
      stage.companies = [...newCompanyList]
      await stage.save()
    } else {
      const toStage = await this.stageRepository.findById(toStageId)

      if (!toStage)
        throw new ApiError(httpStatus.BAD_REQUEST, 'Stage not found')

      stage.companies = [...newCompanyList]
      await stage.save()

      toStage.companies.splice(position, 0, company.id)
      await toStage.save()
    }
  }
}
