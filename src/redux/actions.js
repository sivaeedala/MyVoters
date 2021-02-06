export const LOGIN_USER = "LOGIN_USER";
export const LOADING = "LOADING";

export function loginUser(userName, ward, village) {
  return {
    type: LOGIN_USER,
    payload: {
      userName: userName,
      ward: ward,
      village: village,
    },
  };
}

export function loading() {
  return {
    type: LOADING,
    payload: true,
  };
}
