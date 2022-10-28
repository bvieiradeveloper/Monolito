import ClientGateway from '../../gateway/client.gateway';
import { AddClientUseCaseInputDto, AddClientUseCaseOutputDto } from './add-client.usecase.dto';
import Client from '../../domain/client-adm.entity';
import Id from '../../../@shared/domain/value-object/id.value-object';
export default class AddClientUseCase{
    private _clientRepository : ClientGateway;

    constructor(clientRepository: ClientGateway) {
        this._clientRepository = clientRepository;
    }

    async execute(addClientUseCaseInputDto: AddClientUseCaseInputDto): Promise<AddClientUseCaseOutputDto>{

        const props = {
            id: new Id(addClientUseCaseInputDto.id) || new Id(),
            name: addClientUseCaseInputDto.name,
            email: addClientUseCaseInputDto.email,
            address: addClientUseCaseInputDto.address,
        }

        const client = new Client(props)

        await this._clientRepository.add(client)

        return {
            id: client.id.id,
            name: client.name,
            email: client.email,
            address: client.address,
            updatedAt: client.updatedAt,
            createdAt: client.createdAt
        }
    }
}