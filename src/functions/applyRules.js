
export default function applyRules(value, rules, sourceData = {}) {

  let error = null;

  for (const ruleName in rules) {
    switch(ruleName) {
      case 'minSize':
        if (typeof value === 'string') {
          if (value.length < rules[ruleName]) {
            return `Value must be at least ${rules[ruleName]} characters long`;
          }
        } else if (typeof value === 'number') {
          if (value < rules[ruleName]) {
            return `Value must be at last ${rules[ruleName]}`;
          }
        }
        break;
      case 'maxSize':
        if (typeof value === 'string') {
          if (value.length > rules[ruleName]) {
            return `Value cannot be longer than ${rules[ruleName]} characters`;
          }
        } else if (typeof value === 'number') {
          return `Value cannot be more than ${rules[ruleName]}`;
        }
        break;
      case 'email':
        if (typeof value === 'string') {
          if (!validateEmail(value)) {
            return `Please provide a valid email`
          }
        }
        break;
        case 'phone':
          if (typeof value === 'string') {
            if (!validatePhone(value)) {
              return `Please provide a valid phone`
            }
          }
          break;
      case 'match':
        const matchedValueKey = rules[ruleName];
        const matchedValue = sourceData[matchedValueKey];
        if (value !== matchedValue) {
          return `Value must match the ${matchedValueKey} field`;
        }
        break;
      default:
        break;
    }
  }

  return error;
}

function validatePhone(phoneString) {
  var re = /^\d+$/;
  return re.test(String(phoneString).toLocaleLowerCase());
}


function validateEmail(emailString) {
  var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return re.test(String(emailString).toLocaleLowerCase());
}