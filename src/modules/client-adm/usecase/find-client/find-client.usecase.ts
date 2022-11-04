import ClientGateway from '../../gateway/client.gateway';
import { FindClientInputDto, FindClientOutputDto } from './find-client.usecase.dto';
export default class FindClientUseCase{
    _clientRepository: ClientGateway;

    constructor(clientRepository: ClientGateway){
        this._clientRepository = clientRepository;
    }

    async execute(input: FindClientInputDto) : Promise<FindClientOutputDto>{
        const client = await this._clientRepository.find(input.clientId);

        return {
            id: client.id.id,
            name: client.name,
            email: client.email,
            address: client.address,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt,
        }
    }

}