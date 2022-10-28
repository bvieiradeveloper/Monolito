import Id from '../../../@shared/domain/value-object/id.value-object';
import Client from '../../domain/client-adm.entity';
import FindClientUseCase from './find-client.usecase';
const client = new Client({
    id: new Id("1"),
    name: "Client 1",
    email: "xx@gmil.com",
    address: "Mr John Smith. 132, My Street, Kingston, New York 12401"
})

const mockClientRepository = () =>{
    return{
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(client))
    }
}
describe("Find client usecase unit test", () => {
    it("Should find a client", async () =>{
        const clientRepository = mockClientRepository();
        const useCase = new FindClientUseCase(clientRepository);

        const response = await useCase.execute({clientId: "1"});

        expect(clientRepository.find).toHaveBeenCalled();
        expect(response.id).toEqual("1");
        expect(response.name).toEqual("Client 1");
        expect(response.email).toEqual("xx@gmil.com");
        expect(response.address).toEqual("Mr John Smith. 132, My Street, Kingston, New York 12401");
    })
})