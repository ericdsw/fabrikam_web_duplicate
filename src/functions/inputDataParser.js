
export const parseIn = (inputObject, inputSchema) => {

  for (const key in inputSchema) {

      // Skip invalid entries
      if (!(key in inputSchema) || !(key in inputObject)) {
          continue;
      }

      switch (inputSchema[key].type) {
          case 'array':
              inputObject[key] = inputObject[key].join(',');
              break;
          case 'json':
              inputObject[key] = JSON.stringify(inputObject[key]);
              break;
          case 'number':
              const value = parseFloat(inputObject[key]);
              const defaultNumberVal = parseFloat(inputSchema[key].default);
              if (Number.isNaN(value)) {
                  if (Number.isNaN(defaultNumberVal)) {
                      inputObject[key] = ''
                  } else {
                      inputObject[key] = defaultNumberVal;
                  }
              } else {
                  inputObject[key] = value
              }
              break;
          default:
              const defaultVal = inputSchema[key].default;
              if (!inputObject[key] && typeof(defaultValue) !== 'undefined') {
                  inputObject[key] = defaultVal;
              }
              break;
      }
  }
  return inputObject;
}

export const parseOut = (outputObject, inputSchema) => {

  // Make sure were are not passing the ID
  if ('id' in outputObject) {
      delete outputObject['id'];
  }

  for (const key in outputObject) {

      if (!(key in inputSchema)) {
          continue;
      }

      switch (inputSchema[key].type) {
          case 'array':
              outputObject[key] = outputObject[key].replace(/\s/g,'')
                  .split(',');
              break;
          case 'json':
              outputObject[key] = JSON.parse(
                  outputObject[key].replace(/'/g,'"')
              );
              break;
          case 'number':
              outputObject[key] = parseFloat(outputObject[key]);
              break;
          default:
              break;
      }
  }
  return outputObject;
}

export const getMissingRequired = (object, inputSchema) => {
  const returnArray = [];
  for (const key in inputSchema) {
      const curValue = object[key];

      if (inputSchema[key].required) {
          switch(inputSchema[key].type) {
              case 'boolean':
                  break;
              case 'number':
                  // Prevent 0 from being treated as "nothing there"
                  const numberValue = parseFloat(curValue);
                  if (typeof(numberValue) !== "number" || Number.isNaN(numberValue)) {
                      returnArray.push(key);
                  }
                  break;
              default:
                  if (!curValue) {
                      returnArray.push(key);
                  }
                 break;
          }
      }

  }
  return returnArray;
}
