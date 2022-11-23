export interface ICrearQrRes{
    url: string,
    blacklist: string;
}

export interface IQRDataScanned{
    nombre: string,
    rut: string,
    fecha_emision: string,
    valido_hasta: string,
    emisor: string,
    fecha_evento:string,
    id: string,
    escaneado: string
}

export interface IQRUpdateStatus{
    updatedStatus: string
}

export interface IUserDataObject{
    usuario: string,
    rol: string
}
export interface ILoginResponse{
    token:string
    userData: IUserDataObject,
    reason: string,
    code:string
}