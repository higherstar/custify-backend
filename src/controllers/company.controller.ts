import { Request, Response } from 'express'
import httpStatus from 'http-status'

import { catchAsync } from '../utils'
import { CompanyService } from '../services/company.service'
import { CompanyRepository } from '../repositories/company.repository'

export class CompanyController {
  private companyService: CompanyService
  private companyRepository: CompanyRepository

  constructor() {
    this.companyService = new CompanyService()
    this.companyRepository = new CompanyRepository()
  }

  public getCompanies = catchAsync(async (req: Request, res: Response) => {
    const result = await this.companyService.getCompanies()
    res.status(httpStatus.OK).json(result)
  })

  public getCompany = catchAsync(async (req: Request, res: Response) => {
    const result = await this.companyRepository.findById(req.params.id)
    res.status(httpStatus.OK).json(result)
  })

  public createCompany = catchAsync(async (req: Request, res: Response) => {
    const result = await this.companyService.createCompany(req.body)
    res.status(httpStatus.OK).json(result)
  })

  public updateCompany = catchAsync(async (req: Request, res: Response) => {
    const result = await this.companyRepository.updateCompanyById(req.params.id, req.body)
    res.status(httpStatus.OK).json(result)
  })

  public deleteCompany = catchAsync(async (req: Request, res: Response) => {
    await this.companyService.deleteCompany(req.params.id)
    res.status(httpStatus.NO_CONTENT).json()
  })

  public moveCompany = catchAsync(async (req: Request, res: Response) => {
    const result = await this.companyService.moveCompany(req.params.id, req.body.position, req.body.toStageId)
    res.status(httpStatus.OK).json(result)
  })
}
