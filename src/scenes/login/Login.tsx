import { Visibility, VisibilityOff } from "@mui/icons-material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import { ErrorMessage, Form, Formik } from "formik";
import { useContext, useState } from "react";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { ApiResponse } from "../../apis/api.util";
import { Login } from "../../apis/user_api";
import { GlobalContext } from "../../App";
import Header from "../../components/Header";
import { useSnackbar } from "../../components/SnackbarContext";
import { tokens } from "../../theme";

const LoginComponent = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loginSuccessfull, setLoginSuccessfull] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const { setUser } = useContext(GlobalContext);
  const initialValues = {
    email: "",
    password: "",
    remember: false,
  };

  const validationSchema = yup.object().shape({
    email: yup.string().email("Please enter valid email").required("Required"),
    password: yup.string().required("Required"),
  });

  const onSubmit = async (
    values: { email: any; password: any },
    { resetForm, setSubmitting }: any,
  ) => {
    try {
      setLoading(true);
      const response: ApiResponse = await Login(values);
      const user = response.Unwrap(setUser);
      console.log("UserResponse", response);
      if (user) {
        setUser(user);
      }
      setAlertMessage("Login was successful!");
      setAlert(true);
      resetForm();
      setSubmitting(false);
      setLoginSuccessfull(true);
      setLoading(false);
      showSnackbar("Succesful login!", "success");
      navigate("/dashboard");
    } catch (error: any) {
      setLoading(false);
      console.log("Error: ", error);
      if (error.message === "Failed to fetch") {
        setAlertMessage("Backend is down, please try again later.");
      } else {
        setAlertMessage("Invalid e-mail or password!");
      }
      setAlert(true);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        backgroundColor: `${colors.primary[400]}`,
        borderRadius: "10px",
      }}
    >
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center !important",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: `${colors.blueAccent[500]}` }}>
          <LockOutlinedIcon />
        </Avatar>
        <Header
          title="Sign In"
          subtitle="Sign in an User Profile"
          align={"center"}
        />
        {alert && (
          <Alert
            severity={loginSuccessfull ? "success" : "error"}
            onClose={() => {
              setAlert(false);
              setLoginSuccessfull(false);
            }}
          >
            {alertMessage}
          </Alert>
        )}
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ values, handleChange, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                required
                variant="filled"
                type="email"
                label="Email"
                value={values.email}
                onChange={handleChange}
                placeholder="Enter email"
                name="email"
                margin="normal"
                helperText={<ErrorMessage name="email" />}
                sx={{
                  color: colors.blueAccent[500],
                  "& label.Mui-focused": {
                    color: colors.blueAccent[500],
                    zIndex: 0,
                  },
                  "& label": {
                    zIndex: 0,
                  },
                  "& .MuiFilledInput-underline:after": {
                    borderColor: colors.blueAccent[500],
                  },
                }}
              />
              <TextField
                fullWidth
                variant="filled"
                type={showPassword ? "text" : "password"}
                label="Password"
                value={values.password}
                onChange={handleChange}
                placeholder="Enter password"
                name="password"
                required
                margin="normal"
                helperText={<ErrorMessage name="password" />}
                sx={{
                  color: colors.blueAccent[500],
                  "& label.Mui-focused": {
                    color: colors.blueAccent[500],
                    zIndex: 0,
                  },
                  "& label": {
                    zIndex: 0,
                  },
                  "& .MuiFilledInput-underline:after": {
                    borderColor: colors.blueAccent[500],
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Box sx={{ m: 1, position: "relative" }}>
                {loading ? (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: `${colors.greenAccent[500]}`,
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      marginTop: "-12px",
                      marginLeft: "-12px",
                    }}
                  />
                ) : (
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 3,
                      mb: 2,
                      backgroundColor: `${colors.blueAccent[600]}`,
                      ":hover": {
                        backgroundColor: colors.blueAccent[500],
                      },
                    }}
                  >
                    Sign In
                  </Button>
                )}
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
      <Stack direction={"row"} justifyContent="left" spacing={2} display="flex">
        <Button
          component={ReactLink}
          to="/registration"
          sx={{
            color: `${colors.greenAccent[400]}`,
            mb: "16px",
            display: "flex",
            alignItems: "center !important",
            alignContent: "center",
            ":hover": {
              color: colors.greenAccent[300],
            },
          }}
        >
          Don't have an account?
        </Button>
      </Stack>
    </Container>
  );
};

export default LoginComponent;
