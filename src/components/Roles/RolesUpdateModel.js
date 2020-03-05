



export const updateRolesModel = {

    parameters: {
        idRole: {
        type: "hidden"
      },
      descRole: {
        label: 'Descripción de Rol',
        type: 'text',
        required: true
      },
      estado: {
        label: "Estado",
        type: "boolean"
      }
     
    }

}