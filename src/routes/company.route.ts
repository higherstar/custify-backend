import { Router } from 'express'

import validate from '../middlewares/validate'
import { CompanyController } from '../controllers/company.controller'
import { CompanyValidation } from '../validations/company.validation'

export class CompanyRoute {
  public router: Router
  private companyValidation: CompanyValidation
  private companyController: CompanyController

  constructor() {
    this.router = Router()
    this.companyValidation = new CompanyValidation()
    this.companyController = new CompanyController()
    this.routes()
  }

  public routes(): void {
    this.router.route('/')
      .get(this.companyController.getCompanies)
      .post(validate(this.companyValidation.createCompany), this.companyController.createCompany)

    this.router.route('/move/:id')
      .post(validate(this.companyValidation.moveCompany), this.companyController.moveCompany)

    this.router.route('/:id')
      .get(validate(this.companyValidation.getCompany), this.companyController.getCompany)
      .patch(validate(this.companyValidation.updateCompany), this.companyController.updateCompany)
      .delete(validate(this.companyValidation.deleteCompany), this.companyController.deleteCompany)
  }
}
