import React, { useReducer } from "react";
import MkdSDK from "./utils/MkdSDK";

export const AuthContext = React.createContext();

// If you want to persit authentication and role, you can set this as corresponding values
//const auth = localStorage.getItem("auth"
//const role = localStorage.getItem("role")

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  role: null,
};

const reducer = (state, action) => {
;
  switch (action.type) {
    case "LOGIN":
      //TODO
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        role: action.payload.role,
        isAuthenticated: action.payload.isAuthenticated,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        role: null,
        token: null
      };
    default:
      return state;
  }
};

let sdk = new MkdSDK();

export const tokenExpireError = (dispatch, errorMessage) => {
  const role = localStorage.getItem("role");
  if (errorMessage === "TOKEN_EXPIRED") {
    dispatch({
      type: "LOGOUT",
    });
    window.location.href = "/" + role + "/login";
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  React.useEffect(() => {
    //TODO
    const checkTokenExpiry = async () => {
      const res = await sdk.check(state.role);

      console.log(res)

      if (state?.token && res?.status !==200) {
        tokenExpireError(dispatch, "TOKEN_EXPIRED");
      }
    };

    if (state.token) {
    checkTokenExpiry();
      
    }
  }, [state.token]);


  // If you want to persit authentication and role, you can uncomment this and line 6 above
  // React.useEffect(() => { 
  //   localStorage.setItem("auth", state.isAuthenticated);
  //   localStorage.setItem("role", state.role);
  //   }, [state.role, state.isAuthenticated])



  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
