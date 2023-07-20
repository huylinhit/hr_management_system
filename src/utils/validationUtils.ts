export const validateEmail = (email: any) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: any) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
  return passwordRegex.test(password);
};

export const validateCitizenID = (citizenID: any) => {
  const citizenIDRegex = /^\d{12}$/;
  return citizenIDRegex.test(citizenID);
};
