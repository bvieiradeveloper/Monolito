import UseCaseInterface from "../../@shared/usecase/use-case.inteface";
import InvoiceFacadeInterface from "./invoice-facade.interface";
import { GenerateInvoiceFacadeInputDto, FindInvoiceFacadeInputDto, FindInvoiceFacadeOutputDto } from './invoice-facade.interface';


export interface UseCasesProps {
    generateUseCase: UseCaseInterface;
    findUseCase: UseCaseInterface;
  }

export default class InvoiceFacade implements InvoiceFacadeInterface{
    
    private _generateInvoice: UseCaseInterface;
    private _findInvoice: UseCaseInterface;
    
    constructor(usecasesProps: UseCasesProps) {
        this._generateInvoice = usecasesProps.generateUseCase;
        this._findInvoice = usecasesProps.findUseCase;
      }

    generateInvoice(input: GenerateInvoiceFacadeInputDto): Promise<void> {
        return this._generateInvoice.execute(input);
    }
     findInvoice(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto> {
         return this._findInvoice.execute(input);
    }
}