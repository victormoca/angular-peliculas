import { HttpParams } from "@angular/common/http";

export function convertToHttpParams(obj: any): HttpParams {
    let httpParams: HttpParams = new HttpParams();
    
    for(let propiedad in obj){
        if(obj.hasOwnProperty(propiedad)){
            httpParams =  httpParams.append(propiedad, obj[propiedad]);
        }
    }

    return httpParams;
}