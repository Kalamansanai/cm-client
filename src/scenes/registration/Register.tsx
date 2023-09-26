import { Visibility, VisibilityOff } from "@mui/icons-material";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import { ErrorMessage, Formik } from "formik";
import { useState } from "react";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { SendRegister } from "../../apis/user_api";
import Header from "../../components/Header";
import { useSnackbar } from "../../components/SnackbarContext";
import { tokens } from "../../theme";

const Register = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [errorAlert, setErrorAlert] = useState("");
  const [loading, setLoading] = useState(false);
  const redColor = colors.redAccent[500];
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const [errorMessage, setErrorMessage] = useState("");
  const registrationSchema = yup.object().shape({
    name: yup
      .string()
      .required("Username is required.")
      .test("length", "Must be 5-20 characters long", (value) =>
        Boolean(value && value.length >= 5 && value.length <= 20),
      )
      .test("start", "Cannot start with a dot or underscore", (value) =>
        Boolean(value && !/^[_\.]/.test(value)),
      )
      .test("end", "Cannot end with a dot or underscore", (value) =>
        Boolean(value && !/[_\.]$/.test(value)),
      )
      .test(
        "consecutive",
        "Cannot contain consecutive dots or underscores",
        (value) => Boolean(value && !/([_\.])\1/.test(value)),
      ),
    email: yup
      .string()
      .required("Required")
      .test("valid-email", "Please enter a valid email address.", (value) => {
        const emailRegex =
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return emailRegex.test(value || "");
      }),
    password: yup
      .string()
      .required("Please Enter your password")
      .test("min-length", "Must be at least 8 characters long", (value) =>
        Boolean(value && value.length >= 8),
      )
      .test(
        "uppercase",
        "Must contain at least one uppercase character",
        (value) => Boolean(value && /[A-Z]/.test(value)),
      )
      .test(
        "lowercase",
        "Must contain at least one lowercase character",
        (value) => Boolean(value && /[a-z]/.test(value)),
      )
      .test("number", "Must contain at least one number", (value) =>
        Boolean(value && /[0-9]/.test(value)),
      ),
    passwordrpt: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Required"),
  });

  const initialValues = {
    name: "",
    email: "",
    password: "",
    passwordrpt: "",
  };

  const onSubmit = async (values: any) => {
    setLoading(true);
    try {
      const { passwordrpt, ...requestData } = values;

      const response = await SendRegister(requestData);

      if (response.result === "error") {
        throw new Error(response.data);
      } else if (response.result === "ok") {
        setErrorMessage("Succesful registration!");
        setErrorAlert("ok");
        showSnackbar("Succesful registration!", "success");
        navigate("/login");
      }
    } catch (error: any) {
      setErrorMessage(error.message);
      setErrorAlert("error");
    }
    setLoading(false);
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRe, setShowPasswordRe] = useState(false);

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
          <PersonAddAltOutlinedIcon />
        </Avatar>
        <Header
          title="Sign Up"
          subtitle="Sign Up an User Profile"
          align={"center"}
        />
        {errorAlert === "error" && (
          <Alert severity="error" onClose={() => setErrorAlert("")}>
            {errorMessage}
          </Alert>
        )}
        {errorAlert === "ok" && (
          <Alert severity="success" onClose={() => setErrorAlert("")}>
            {errorMessage}
          </Alert>
        )}
        <Formik
          onSubmit={onSubmit}
          initialValues={initialValues}
          validationSchema={registrationSchema}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    variant="filled"
                    type="text"
                    label="Name"
                    value={values.name}
                    onChange={handleChange}
                    placeholder="Enter name"
                    name="name"
                    margin="normal"
                    helperText={
                      <ErrorMessage name="name">
                        {(msg: string | null | undefined) => {
                          if (msg) {
                            return (
                              <span style={{ color: redColor }}>{msg}</span>
                            );
                          }
                          return (
                            <span style={{ color: redColor }}>Required</span>
                          );
                        }}
                      </ErrorMessage>
                    }
                    sx={{
                      gridColumn: "span 2",
                      color: colors.blueAccent[500],
                      "& label.Mui-focused": {
                        color: colors.blueAccent[500],
                        zIndex: 0,
                      },
                      "& label": {
                        zIndex: 0,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
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
                    helperText={
                      <ErrorMessage name="email">
                        {(msg: string | null | undefined) => {
                          if (msg) {
                            return (
                              <span style={{ color: redColor }}>{msg}</span>
                            );
                          }
                          return (
                            <span style={{ color: redColor }}>Required</span>
                          );
                        }}
                      </ErrorMessage>
                    }
                    sx={{
                      gridColumn: "span 2",
                      color: colors.blueAccent[500],
                      "& label.Mui-focused": {
                        color: colors.blueAccent[500],
                        zIndex: 0,
                      },
                      "& label": {
                        zIndex: 0,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
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
                    helperText={
                      <ErrorMessage name="password">
                        {(msg: string | null | undefined) => {
                          if (msg) {
                            return (
                              <span style={{ color: redColor }}>{msg}</span>
                            );
                          }
                          return (
                            <span style={{ color: redColor }}>Required</span>
                          );
                        }}
                      </ErrorMessage>
                    }
                    sx={{
                      gridColumn: "span 2",
                      color: colors.blueAccent[500],
                      "& label.Mui-focused": {
                        color: colors.blueAccent[500],
                        zIndex: 0,
                      },
                      "& label": {
                        zIndex: 0,
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
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="filled"
                    type={showPasswordRe ? "text" : "password"}
                    label="Password again"
                    value={values.passwordrpt}
                    onChange={handleChange}
                    placeholder="Enter password again"
                    name="passwordrpt"
                    required
                    margin="normal"
                    helperText={
                      <ErrorMessage name="passwordrpt">
                        {(msg: string | null | undefined) => {
                          if (msg) {
                            return (
                              <span style={{ color: redColor }}>{msg}</span>
                            );
                          }
                          return (
                            <span style={{ color: redColor }}>Required</span>
                          );
                        }}
                      </ErrorMessage>
                    }
                    sx={{
                      gridColumn: "span 2",
                      color: colors.blueAccent[500],
                      "& label.Mui-focused": {
                        color: colors.blueAccent[500],
                        zIndex: 0,
                      },
                      "& label": {
                        zIndex: 0,
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPasswordRe(!showPasswordRe)}
                          >
                            {showPasswordRe ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <Stack
                direction={"row"}
                justifyContent="space-between"
                spacing={2}
                marginY={2}
                display="flex"
              >
                <Button
                  component={ReactLink}
                  to="/login"
                  sx={{
                    color: `${colors.greenAccent[400]}`,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Already have an account?
                </Button>
                {loading ? (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: `${colors.greenAccent[500]}`,
                      // position: "absolute",
                      // top: "50%",
                      // left: "50%",
                      // marginTop: "-12px",
                      // marginLeft: "-12px",
                    }}
                  />
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ backgroundColor: `${colors.blueAccent[500]}` }}
                  >
                    Create New User
                  </Button>
                )}
              </Stack>
            </form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default Register;
