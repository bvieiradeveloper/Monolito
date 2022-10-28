export interface AddClientFacadeInputDto{
    id?: string;
    name: string;
    email: string;
    address: string;
}

export interface FindClientFacadeInputDto{
    clientId: string
}

export interface FindClienFacadeOutputDto{
    id: string;
    name: string;
    email: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
}

export default interface ClientAdmFacadeInterface{
    add(input: AddClientFacadeInputDto): Promise<void>;
    find(input: FindClientFacadeInputDto): Promise<FindClienFacadeOutputDto>;
}