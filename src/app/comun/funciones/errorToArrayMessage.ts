export function errorToArrayMessage(e: any): string[] {
    let result: string[] = [];
    
    for(const key in e.error.errors) {
        result.push(e.error.errors[key]);
    }

    return result;
}