export function errorToArrayMessage(e: any): string[] {
    let result: string[] = [];
    
    for(const key in e.error.errors) {
        result.push(e.error.errors[key]);
    }

    return result;
}

export function extraerErroresIdentity(obj: any) : string[] {
    let mensajesError: string[] = [];

    for (let i = 0; i < obj.error.length; i++) {
        const element = obj.error[i];
        mensajesError.push(element.description);
    }
    return mensajesError;
}