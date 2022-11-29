const rules = {
  required: val => !!val || 'Field is required',
  email: val => {
    if (val) {
      return val.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g) || 'Invalid email pattern'
    }

    return true;
  }
}

export default rules;