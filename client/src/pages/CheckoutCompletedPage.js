import React from "react";
import "../theme/MainFooter.css";
import { Link as RouterLink } from "react-router-dom";
import { Button, Typography, Container } from "@mui/material";

function CheckoutCompletedPage() {
  return (
    <Container>
      <Typography sx={{ mt: 10, fontSize: { xs: "1rem", md: "1.5rem" } }}>
        Cám ơn bạn đã đặt hàng chúng tôi sẽ phản hồi sớm nhất có thể cho bạn.
      </Typography>
      <div className="contactInfo container">
        <div className="row">
          <div className="col-12 col-md-4 contact-Box">
            <div className="box-info">
              <div className="info-image">
                <i className="fas fa-phone-alt"></i>
              </div>
              <h5>Số Điện Thoại Liên Lạc</h5>
              <p>099 000 123</p>
            </div>
          </div>
          <div className="col-12 col-md-4 contact-Box">
            <div className="box-info">
              <div className="info-image">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <h5>Địa Chỉ</h5>
              <p>111 Hồ Chí Minh</p>
            </div>
          </div>
          <div className="col-12 col-md-4 contact-Box">
            <div className="box-info">
              <div className="info-image">
                <i className="fas fa-fax"></i>
              </div>
              <h5>Fax</h5>
              <p>0736 230 063</p>
            </div>
          </div>
        </div>
      </div>
      <Button to="/" variant="contained" component={RouterLink}>
        Go to Home
      </Button>
    </Container>
  );
}

export default CheckoutCompletedPage;
