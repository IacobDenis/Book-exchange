import { blue, } from "@mui/material/colors";

export const palette = {
    palette: {
        primary: {
            main: blue["A100"],
            contrastText: "#fff",
        },
    },
    typography: {
        button: {
            marginBottom: "1rem",
            marginTop: "1rem",
            fontFamily: "Roboto Mono",
            fontWeight: 500,
        },
        h4: {
            fontFamily: "Roboto Mono",
            fontWeight: 500,
            fontSize: "1.5rem"
        },
        h5: {
            fontFamily: "Roboto Mono",
            fontWeight: 300,
            fontSize: "1.2rem"
        },
        body1: {
            fontFamily: "Inter",
        },
        h2: {
            fontFamily: "Roboto Mono",
            fontWeight: 500,
        },
        h3: {
            fontFamily: "Roboto Mono ",
            fontWeight: 500,
            fontSize: "1.8rem"
        },
        components: {
            MuiInput: {
                styleOverrides: {
                    input: {
                        fontFamily: 'Inter',
                        fontWeight: 300,
                        fontSize: 8,
                    },
                },
            },
        },

    },
    card: {
        maxWidth: 330,
        margin: "auto",
    },
    media: {
        width: "100%",
        objectFit: "cover",
    },
};