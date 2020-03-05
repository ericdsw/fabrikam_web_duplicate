

export const createProviderModel = {

        parameters: {
            nombre: {
            label: 'Nombre',
            type: 'text',
            required: true
          },
          identificacion: {
            label: 'Identificacion',
            type: 'text',
            required: true
          },
          telefono: {
            label: 'Teléfono',
            type: 'phone',
            required: true,
            rules: {
              "phone": true
            }
          },
          correo: {
            label: 'Email',
            type: 'email',
            required: true,
            rules: {
              "email": true
            }
          },
          direccion: {
            label: 'Dirección',
            type: 'text',
            required: true
          }
        }

}