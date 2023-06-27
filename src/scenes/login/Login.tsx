import React from "react";
import {
  Grid,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
  Box,
  Container,
  useTheme,
  createTheme,
  ThemeProvider,
  Stack,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import { ColorModeContext, tokens } from "../../theme";
import { Link as ReactLink } from "react-router-dom";

const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const initialValues = {
    username: "",
    password: "",
    remember: false,
  };
  const validationSchema = yup.object().shape({
    username: yup.string().email("Please enter valid email").required("Required"),
    password: yup.string().required("Required"),
  });

  const onSubmit = (
    values: any,
    props: { resetForm: () => void; setSubmitting: (arg0: boolean) => void }
  ) => {
    //SEND IT TO THE
    setTimeout(() => {
      props.resetForm();
      props.setSubmitting(false);
    }, 2000);
  };

  function handleChange(arg0: string, arg1: number): void {
    throw new Error("Function not implemented.");
  }

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
        <Header title="Sign In" subtitle="Sign in an User Profile" align={"center"} />
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          {({ values, handleChange, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                required
                variant="filled"
                type="text"
                label="Username"
                onChange={handleChange}
                value={values.username}
                placeholder="Enter username"
                name="username"
                margin="none"
                helperText={<ErrorMessage name="username" />}
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
                onChange={handleChange}
                value={values.password}
                placeholder="Enter username"
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
                sx={{ mt: 3, mb: 2, backgroundColor: `${colors.blueAccent[500]}` }}
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
