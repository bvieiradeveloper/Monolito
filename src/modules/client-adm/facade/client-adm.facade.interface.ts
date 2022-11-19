export interface AddClientFacadeInputDto{
    id?: string;
    name: string;
    email: string;
    document: string;
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
}

export interface FindClientFacadeInputDto{
    clientId: string
}

export interface FindClienFacadeOutputDto{
    id: string;
    name: string;
    email: string;
    document: string;
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
    createdAt: Date;
    updatedAt: Date;
}

export default interface ClientAdmFacadeInterface{
    add(input: AddClientFacadeInputDto): Promise<void>;
    find(input: FindClientFacadeInputDto): Promise<FindClienFacadeOutputDto>;
}