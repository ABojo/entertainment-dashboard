const validators = {
  username: (str: string) => {
    if (str) return true;
  },
  password: (str: string) => {
    return str.length > 5;
  },
};

export default validators;
