export const bankAccountUpdateModel = {

    parameters: {

        idCuentaBancaria: {
            type: "hidden"
        },
        numeroCuenta: {
            label: 'Número de Cuenta',
            type: 'text',
            required: true
        },
        tipoCuenta: {
            label: 'Tipo de Cuenta',
            type: 'text',
            required: true
        },
        pais: {
            label: 'País',
            type: 'text',
            required: true
        },
        banco: {
            label: 'Banco',
            type: 'text',
            required: true
        },
        titularCuenta: {
            label: 'Titular de la Cuenta',
            type: 'text',
            required: true
        }
    }

}