import { IDocument } from './document.interface'
import { TObjectId } from './common'
import { ICompany } from './company.interface'

export interface IStage extends IDocument {
  name: string
  companies: (TObjectId | ICompany)[]
}
