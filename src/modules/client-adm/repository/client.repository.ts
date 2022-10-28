import Id from '../../@shared/domain/value-object/id.value-object';
import Client from '../domain/client-adm.entity';
import clientAdmEntity from '../domain/client-adm.entity';
import ClientGateway from '../gateway/client.gateway';
import ClientModel from './client.model';
export default class ClientRepository implements ClientGateway{
    async add(client: clientAdmEntity): Promise<void> {
        const input = {
            id: client.id.id,
            name: client.name,
            email: client.email,
            address: client.address,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        };

        await ClientModel.create(input);
    }

    async find(clientId: string): Promise<clientAdmEntity> {
       const client = await ClientModel.findOne({where:{id: clientId}});

       const output = new Client({
        id: new Id(client.id),
        name: client.name,
        email: client.email,
        address: client.address,
        createdAt: client.createdAt,
        updatedAt: client.updatedAt,
       }); 

       return output;
    }
    
} 