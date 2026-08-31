import { Box, Typography, Stack, Chip } from "@mui/material";

const AdminDashboard = () => {
  return (
    <Box sx={{ p: { xs: 3, md: 5 }, maxWidth: 900, mx: "auto" }}>
      <Stack spacing={1.5}>
        <Chip
          label="Overview"
          size="small"
          color="primary"
          variant="outlined"
          sx={{ width: "fit-content" }}
        />
        <Typography variant="h4" fontWeight={800}>
          Welcome to Nimbus Admin
        </Typography>
        <Typography variant="body1" color="text.secondary">
          A back-office console for managing licenses, business usage and product
          updates. This landing view is intentionally lightweight — the analytics
          widgets are tracked as a next step on the roadmap (see the README).
        </Typography>
      </Stack>
    </Box>
  );
};

export default AdminDashboard;
