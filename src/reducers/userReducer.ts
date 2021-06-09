const userReducer = (
  state: { username: string | null; password: string | null } = {
    username: "root",
    password: null,
  },
  action: { type: string; data: string | Record<string, any> }
) => {
  switch (action.type) {
    case "changeUsername":
      return { ...state, username: action.data };
    case "changePassword":
      return { ...state, password: action.data };
    default:
      return state;
  }
};
export const changeUsername = (username: string) => ({
  type: "changeUsername",
  data: username,
});
export const changePassword = (password: string) => ({
  type: "changePassword",
  data: password,
});
export default userReducer;
