import AddClientUseCase from './add-client.usecase';
const mockRepository = () =>{
  return{
    add: jest.fn(),
    find: jest.fn(),
  }
}

describe("Add client usecase unit test", () =>{

    it("Should add a new client", async () =>{
        
        const clientRepository =  mockRepository();

        const addClientUseCase = new AddClientUseCase(clientRepository);
    
        const input = {
            name: "Client 1",
            email: "xx@gmil.com",
            address: "Mr John Smith. 132, My Street, Kingston, New York 12401"
        }
        var result = await addClientUseCase.execute(input);
    
        expect(clientRepository.add).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toEqual("Client 1");
        expect(result.address).toEqual("Mr John Smith. 132, My Street, Kingston, New York 12401");
        expect(result.email).toEqual("xx@gmil.com");
    });
});