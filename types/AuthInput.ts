interface AuthInput {
  isValid: boolean;
  value: string;
  attributes: {
    name: string;
    type: string;
    id: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
}

export default AuthInput;
