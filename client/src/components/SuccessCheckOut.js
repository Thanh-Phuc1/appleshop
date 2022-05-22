import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { checkout } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

function SuccessCheckOut({ cartProducts, delivery, totalPrice, user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCheckout = () => {
    handleClose();
    const order = { cartProducts, delivery, totalPrice, user };
    dispatch(checkout({ ...order }));
    navigate("/checkout/completed");
  };

  return (
    <div>
      <Typography onClick={handleClickOpen}>
        <Button variant="outlined">Thanh Toán</Button>
      </Typography>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description" autoFocus>
            Xác nhận thanh toán!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCheckout} autoFocus>
            Xác nhận
          </Button>
          <Button onClick={handleClose}>Hủy</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SuccessCheckOut;
