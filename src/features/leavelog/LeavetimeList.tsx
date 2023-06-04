import {
  Autocomplete,
  Button,
  Container,
  Grid,
  List,
  ListItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
];

function LeavetimeList() {
  return (
    <>
      <Container>
        <Container sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid item xs={4}>
            <Button>Tạo đơn nghỉ phép</Button>
          </Grid>

          <Grid item xs={4}>
            <Button variant="contained" sx={{ width: 200 }}>
              Tìm kiếm
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={top100Films}
              sx={{ width: 200 }}
              renderInput={(params) => <TextField {...params} label="Loại" />}
            />
          </Grid>
          <Grid item xs={2}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={top100Films}
              sx={{ width: 200 }}
              renderInput={(params) => <TextField {...params} label="Phòng" />}
            />
          </Grid>
        </Container>

        <Container component={Paper} sx={{ mt: "24px" }}>
          <Typography variant="h5">Minh Hoang nghi 6 ngay do benh</Typography>
          <Grid container>
            <Grid item xs={7}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography>Loại nghỉ phép</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>Bệnh</Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography>Từ</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>1/6/2023 đến 12/6/2023</Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography>Thời gian</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>6 ngày</Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography>Mô tả</Typography>
                </Grid>
                <Grid item xs={8}>
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
