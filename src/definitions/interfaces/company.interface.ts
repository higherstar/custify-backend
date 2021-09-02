import { IDocument } from './document.interface'
import { TObjectId } from './common'
import { IStage } from './stage.interface'

export interface ICompany extends IDocument {
  name: string
  stageId: TObjectId | IStage
}
