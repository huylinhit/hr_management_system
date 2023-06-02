import {
  Button,
  Container,
  Grid,
  List,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

function LeavetimeList() {
  return (
    <>
      <Container>
        <Container>
          <Grid container sx={{ mr: "0px", display: "flex" }}>
            <Grid item xs={4}>
              <Button>Tạo đơn nghỉ phép</Button>
            </Grid>

            <Grid item xs={4}>
              <Button variant="contained" sx={{ width: '100px' }}>Tìm kiếm</Button>
            </Grid>
            <Grid item xs={2}>
              <Button>Loại</Button>
            </Grid>
            <Grid item xs={2}>
              <Button>Phòng ban</Button>
            </Grid>
          </Grid>

        </Container>

        <Container component={Paper} sx={{ mt: "24px" }}>
          <Typography variant="h5">Minh Hoang nghi 6 ngay do benh</Typography>
          <Grid container>
            <Grid item xs={7}>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <Typography>Loại nghỉ phép</Typography>
                </Grid>
                <Grid item xs={10}>
                  <Typography>Bệnh</Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <Typography>Từ</Typography>
                </Grid>
                <Grid item xs={10}>
                  <Typography>1/6/2023 đến 12/6/2023</Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <Typography>Thời gian</Typography>
                </Grid>
                <Grid item xs={10}>
                  <Typography>6 ngày</Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <Typography>Mô tả</Typography>
                </Grid>
                <Grid item xs={10}>
                  <Typography>Bệnh</Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={5}>
              <List sx={{ display: "flex" }}>
                <ListItem>
                  <Button variant="contained">Chấp Nhận</Button>
                </ListItem>
                <ListItem>
                  <Button
                    variant="outlined"
                    sx={{ color: "red", borderColor: "red" }}
                  >
                    Từ chối
                  </Button>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Container>
      </Container>
    </>
  );
}

export default LeavetimeList;
