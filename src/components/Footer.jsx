import { Box, Typography, useTheme } from "@mui/material";

export function Footer() {
  const theme = useTheme();
  theme.palette.primary.main;
  return (
    <Box
      sx={{ p: 2, backgroundColor: theme.palette.primary.main }}
      display="flex"
      justifyContent="center"
      width={"100%"}
    >
      <Typography sx={{ fontFamily: "Times New Roman", fontWeight: 300, color: "#JJJ", fontSize: 10, marginTop: "auto" }}>
        @2023 Created by Iacob Denis, all rights reserved. 
      </Typography>
    </Box>
  );
}
