import React, { useState } from "react";
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
import axios from "axios";

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

  const onSubmit = async (
    values: { email: any; password: any },
    { resetForm, setSubmitting }: any
  ) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/login", {
        email: values.email,
        password: values.password,
      });

      if (response.data && response.data.result === "error") {
        throw new Error(response.data.data);
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
