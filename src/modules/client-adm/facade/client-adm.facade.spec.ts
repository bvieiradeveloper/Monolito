import { Sequelize } from "sequelize-typescript";
import ClientModel from "../repository/client.model";
import ClientRepository from '../repository/client.repository';
import AddClientUseCase from '../usecase/add-client/add-client.usecase';
import ClientAdmFacade from './client-adm.facade';
import FindClientUseCase from '../usecase/find-client/find-client.usecase';
import ClientAdmFacadeFactory from '../factory/facade.factory';

describe("Client repository unit test",()=>{
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
          });
      
          await sequelize.addModels([ClientModel]);
          await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close();
    });

    it("Should add a client", async()=>{

        var facade = ClientAdmFacadeFactory.create();

        facade.add({
            id: "1",
            name: "Client 1",
            email: "xx@gmil.com",
            address: "Mr John Smith. 132, My Street, Kingston, New York 12401"
        });

        var result = await ClientModel.findOne({where: {id: "1"}});

        expect(result.id).toBeDefined();
        expect(result.name).toEqual("Client 1");
        expect(result.address).toEqual("Mr John Smith. 132, My Street, Kingston, New York 12401");
        expect(result.email).toEqual("xx@gmil.com");
    });

    it("Should find a client", async()=>{

       var facade = ClientAdmFacadeFactory.create();
         
        await ClientModel.create({
            id: "1",
            name: "Client 1",
            email: "xx@gmil.com",
            address: "Mr John Smith. 132, My Street, Kingston, New York 12401",
            createdAt: Date.now(),
            updatedAt: Date.now(),
        });

        var result = await facade.find({clientId: "1"});

        expect(result.id).toBeDefined();
        expect(result.name).toEqual("Client 1");
        expect(result.address).toEqual("Mr John Smith. 132, My Street, Kingston, New York 12401");
        expect(result.email).toEqual("xx@gmil.com");
    });
});