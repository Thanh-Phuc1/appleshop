import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Typography, Container } from "@mui/material";

function NotFoundPage() {
  return (
    <Container sx={{ display: "flex", height: "100%", alignItems: "center" }}>
      <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
        <Typography variant="h4" paragraph>
          Không Tìm Thấy Trang
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: "1rem" }}>
          Xin lỗi bạn vì sự bất tiện này !!!
        </Typography>
        <Button to="/" variant="contained" component={RouterLink}>
          Trang Chủ
        </Button>
      </Box>
    </Container>
  );
}
export default NotFoundPage;
