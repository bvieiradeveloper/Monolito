import ProcessPaymentUseCase from "../usecase/process-payment.usecase";
import PaymentFacadeInterface from "./facade.interface";
import PaymentFacade from "./payment.facade";
import TransactionRepository from '../repository/transaction.repository';

export default class PaymentFacadeFactory {
    static create(): PaymentFacadeInterface {
      const repository = new TransactionRepository();
      const usecase = new ProcessPaymentUseCase(repository);
      const facade = new PaymentFacade(usecase);
      return facade;
    }
  }