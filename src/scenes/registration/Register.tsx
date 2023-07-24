import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import { ErrorMessage, Formik } from "formik";
import { useState } from "react";
import { Link as ReactLink } from "react-router-dom";
import * as yup from "yup";
import { SendRegister } from "../../apis/user_api";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const Register = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [errorAlert, setErrorAlert] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const registrationSchema = yup.object().shape({
    name: yup
      .string()
      .required("Required")
      .max(10, "The username can't be longer than 10 characters"),
    email: yup.string().email("Please enter valid email").required("Required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
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
    try {
      const { passwordrpt, ...requestData } = values;

      const response = await SendRegister(requestData);

      if (response.result === "error") {
        throw new Error(response.data);
      } else if (response.result === "ok") {
        setErrorMessage("Succesful registration!");
        setErrorAlert("ok");
      }
    } catch (error: any) {
      setErrorMessage("");
      setErrorAlert("error");
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
                    helperText={<ErrorMessage name="name" />}
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
                    helperText={<ErrorMessage name="email" />}
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
                    type="password"
                    label="Password again"
                    value={values.passwordrpt}
                    onChange={handleChange}
                    placeholder="Enter password again"
                    name="passwordrpt"
                    required
                    margin="normal"
                    helperText={<ErrorMessage name="passwordrpt" />}
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

                <Button
                  type="submit"
                  variant="contained"
                  sx={{ backgroundColor: `${colors.blueAccent[500]}` }}
                >
                  Create New User
                </Button>
              </Stack>
            </form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default Register;
