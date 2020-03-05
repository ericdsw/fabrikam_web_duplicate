

export const createArticleModel = {

    parameters: {
        nombre: {
        label: 'Nombre',
        type: 'text',
        required: true
      },
      IdTipoArticulo: {
        label: 'Tipo artículo',
        type: 'dropdown',
        elements: {
            '1': 'Hogar',
            '2': 'Ferreteria'
        },
        required: true
      },
      descArticulo: {
        label: 'Descripción',
        type: 'textarea',
        required: true
      },
      caracteristicas: {
        label: 'Características',
        type: 'textarea',
        required: true
      },
      precioVenta: {
        label: 'precio',
        type: 'number',
        required: true
      }
    }
    
}

export const updateArticleModel = {
  parameters: {
    idArticulo: {
      type: "hidden"
    },
    nombre: {
    label: 'Nombre',
    type: 'text',
    required: true
  },
  idTipoArticulo: {
    label: 'Tipo artículo',
    type: 'dropdown',
    elements: {
        '1': 'Hogar',
        '2': 'Ferreteria'
    },
    required: true
  },
  descArticulo: {
    label: 'Descripción',
    type: 'textarea',
    required: true
  },
  caracteristicas: {
    label: 'Características',
    type: 'textarea',
    required: true
  },
  precioVenta: {
    label: 'precio',
    type: 'number',
    required: true
  },
  estado: {
    label: "Estado",
    type: "boolean"
  }
}
}