import React, { useContext, useState } from "react";
import {
  Avatar,
  TextField,
  Button,
  Box,
  Container,
  useTheme,
  Stack,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { Link as ReactLink } from "react-router-dom";
import { GlobalContext } from "../../App";
import CryptoJS from "crypto-js";

export const hash = (string: string) => {
  return CryptoJS.SHA256(string).toString();
};

const backend = process.env.REACT_APP_BACKEND;

export const login_cookie = async () => {
  const response = await fetch(`${backend}/user`, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (response.status != 400) {
    const temp = await response.json();
    return temp;
  } else {
    return null;
  }
};

const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const initialValues = {
    email: "",
    password: "",
    remember: false,
  };
  const validationSchema = yup.object().shape({
    email: yup.string().email("Please enter valid email").required("Required"),
    password: yup.string().required("Required"),
  });

  const { user, setUser } = useContext(GlobalContext);

  const onSubmit = async (
    values: { email: any; password: any },
    { resetForm, setSubmitting }: any
  ) => {
    try {
      const response = await fetch(`${backend}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: values.email,
          password: hash(values.password),
        }),
      });

      const content = response.json();

      const userResponse = await fetch(`${backend}/user`, {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (userResponse.status != 400) {
        const temp = await userResponse.json();
        console.log(temp);
        setUser(temp.data);
      } else {
        setUser(null);
      }

      resetForm();
      setSubmitting(false);
    } catch (error: any) {
      setErrorMessage(error.message);
      setErrorAlert(true);
    }
  };

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
        {errorAlert && (
          <Alert severity="error" onClose={() => setErrorAlert(false)}>
            {errorMessage}
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
                  gridColumn: "span 2",
                  color: colors.blueAccent[500],
                  "& label.Mui-focused": {
                    color: colors.blueAccent[500],
                  },
                }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                value={values.password}
                onChange={handleChange}
                placeholder="Enter password"
                name="password"
                required
                margin="normal"
                helperText={<ErrorMessage name="password" />}
                sx={{
                  gridColumn: "span 2",
                  color: colors.blueAccent[500],
                  "& label.Mui-focused": {
                    color: colors.blueAccent[500],
                  },
                }}
              />
              <Field
                as={FormControlLabel}
                name="remember"
                control={
                  <Checkbox
                    sx={{
                      color: `${colors.blueAccent[500]}`,
                      "&.Mui-checked": {
                        color: `${colors.blueAccent[500]}`,
                      },
                    }}
                  />
                }
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: `${colors.blueAccent[500]}`,
                }}
              >
                Sign In
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
      <Stack direction={"row"}>
        <Button
          component={ReactLink}
          to="/registration"
          sx={{ color: `${colors.greenAccent[400]}`, pb: "16px" }}
        >
          Don't have an account?
        </Button>
      </Stack>
    </Container>
  );
};

export default Login;
