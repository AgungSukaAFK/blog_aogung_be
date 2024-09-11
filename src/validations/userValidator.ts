export const userValidator = {
  validateInput(username: string | null, password: string | null) {
    const validateUsername =
      username && username.length >= 5 && username.length <= 50;
    const validatePassword =
      password && password.length >= 8 && password.length <= 50;

    return validatePassword && validateUsername;
  },
};
