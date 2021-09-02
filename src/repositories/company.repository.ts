import httpStatus from 'http-status'

import { Company } from '../models/company.model'
import { ApiError } from '../utils'

export class CompanyRepository {

  constructor() {
  }

  public findById = async (id) => {
    return Company.findById(id)
  }

  public findAll = async () => {
    return Company.find()
  }

  public createCompany = async (companyBody) => {
    return Company.create(companyBody)
  }

  public updateCompanyById = async (id, updateBody) => {
    const company = await Company.findById(id)

    if (!company) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Company not found')
    }

    Object.assign(company, updateBody)
    await company.save()
    return company
  }

  public removeCompanyById = async (id) => {
    const company = await Company.findById(id)
    if (!company) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Company not found')
    }
    await company.remove()
  }

  public removeCompanies = async (ids) => {
    ids.forEach(id => {
      this.removeCompanyById(id)
    })
  }
}
