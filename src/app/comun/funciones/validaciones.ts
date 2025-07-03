import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function ValidarLetraCapital(): ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
        const value = <string>control.value;
        const primerLetra = value[0];

        if(!value)return null;
        if(value.length === 0) return null;

        if(primerLetra.toUpperCase() != primerLetra){
            return {
                validarLetraCapital: {
                    mensaje: 'La primera letra debe ser mayuscula'
                },
            }
        }
        return null;
    }
}

export function ValidarFechaFutura(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = new Date(control.value);
        const today = new Date();
        if(!value) return null;
        
        if(value.getTime() > new Date().getTime()) {
            return {
                validarFechaFutura: {
                    mensaje: 'No puedes asigar una fecha futura'
                }
            }
        }

        return null;
    }
}
