import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useRef } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { deepPurple } from "@mui/material/colors";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { NavLink, useParams } from "react-router-dom";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
const fontStyle = "Mulish";
const headerStyle = {
  fontWeight: "bold",
};
const styles = {
  marginBottom: "15px",
};
const navStyle = {
  fontSize: 25,
  fontWeight: 800,
  fontFamily: fontStyle,
  textTransform: "none",
  color: "#333333",
  borderRadius: "10px",
  padding: "0px 10px 0px 10px",
  "&:hover": {
    backgroundColor: "#F8F8F8", // Set the hover background color
  },
};

export default function EditCandidate({ handleClose, handleOpen, handleChange }: any) {
  const { id } = useParams<{ id: string }>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Xử lý file ở đây
      console.log("File selected:", file);
    }
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <Box sx={{ paddingLeft: "10%", mt: "5%", paddingRight: "10%" }}>
        <Grid container spacing={0} alignContent="center">
          <Grid item>
            <Button
              variant="text"
              sx={navStyle}
              disableElevation={true}
              component={NavLink}
              to={`/otheruserstickets`}
              key={"/otheruserstickets"}
            >
              Danh sách đơn khác
            </Button>
          </Grid>

          <Grid item>
            <ArrowRightIcon sx={{ mt: 0.6, padding: 0 }} fontSize="large" />
          </Grid>

          <Grid item>
            <Button variant="text" sx={navStyle} disableElevation={true}>
              Phản hồi đơn
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Container sx={{ padding: "2%", width: "60%", borderRadius: "8px" }}>
        <Grid container spacing={2}>
          <Grid item xs={2} sx={{ mr: "30px" }}>
            <Avatar sx={{ bgcolor: deepPurple[500], width: 150, height: 150 }}>A</Avatar>
          </Grid>
          <Grid item xs={9}>
            <TextField
              InputProps={{
                disableUnderline: true,
                style: { fontSize: "40px", fontWeight: "700", fontFamily: fontStyle },
              }}
              defaultValue={"Võ Minh Hoàng"}
              variant="standard"
              sx={{ marginRight: "10px", alignSelf: "flex-end" }}
            />
          </Grid>
          <Grid item xs={9}>
            <FormControl sx={{ m: 0, minWidth: 200 }}>
              <InputLabel>Chờ duyệt</InputLabel>
              <Select label="Chờ duyệt" onChange={handleChange}>
                <MenuItem value={10}>Đạt</MenuItem>
                <MenuItem value={20}>Không đạt</MenuItem>
                <MenuItem value={30}>Chờ duyệt</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2, borderTopWidth: "1px", borderTopColor: "black" }} />

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} columns={16}>
            <Grid item xs={8}>
              <Typography variant="h5" sx={{ fontWeight: "bold", color: "#0066cc" }} style={styles}>
                Thông tin
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h5" sx={{ fontWeight: "bold", color: "#0066cc" }} style={styles}>
                Kỹ năng
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} columns={16}>
            <Grid item xs={8}>
              <Grid container spacing={2} columns={8}>
                <Grid item xs={4}>
                  <Typography sx={headerStyle}>Ngày sinh</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ width: "200px" }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker label="DD/MM/YY" />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={8}>
              <Grid container spacing={2} columns={8}>
                <Grid item xs={4}>
                  <Typography sx={headerStyle}>Ngoại ngữ</Typography>
                </Grid>
                <Grid item xs={4} sx={{ py: "10px" }}>
                  <TextField id="outlined-basic" label="Nhập" variant="outlined" />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} columns={16}>
            <Grid item xs={8}>
              <Grid container spacing={2} columns={8}>
                <Grid item xs={4}>
                  <Typography sx={headerStyle}> Giới tính</Typography>
                </Grid>
                <Grid item xs={4}>
                  <FormControl sx={{ m: 0, minWidth: 200 }}>
                    <InputLabel id="demo-select-small-label">Chọn</InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      label="Chọn"
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>Nam</MenuItem>
                      <MenuItem value={20}>Nữ</MenuItem>
                      <MenuItem value={30}>Khác</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={8}>
              <Grid container spacing={2} columns={8}>
                <Grid item xs={4}>
                  <Typography sx={headerStyle}>.NET</Typography>
                </Grid>
                <Grid item xs={4} sx={{ py: "12px" }}>
                  <TextField id="outlined-basic" label="Nhập" variant="outlined" />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} columns={16}>
            <Grid item xs={8}>
              <Grid container spacing={2} columns={8}>
                <Grid item xs={4}>
                  <Typography sx={headerStyle}>Ngày sinh</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ width: "200px" }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker label="DD/MM/YY" />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={8}>
              <Grid container spacing={2} columns={8}>
                <Grid item xs={4}>
                  <Typography sx={headerStyle}>Ngoại ngữ</Typography>
                </Grid>
                <Grid item xs={4} sx={{ py: "10px" }}>
                  <TextField id="outlined-basic" label="Nhập" variant="outlined" />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} columns={16}>
            <Grid item xs={8}>
              <Grid container spacing={2} columns={8}>
                <Grid item xs={4}>
                  <Typography sx={headerStyle}>Phòng ban</Typography>
                </Grid>
                <Grid item xs={4}>
                  <FormControl sx={{ m: 0, minWidth: 200, py: "10px" }}>
                    <InputLabel id="demo-select-small-label">Chọn</InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      label="Chọn"
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>Phát triển sản phẩm</MenuItem>
                      <MenuItem value={20}>APP</MenuItem>
                      <MenuItem value={30}>Phát triển dự án</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={8}>
              <Grid container spacing={2} columns={8}>
                <Grid item xs={4}>
                  <Typography sx={headerStyle}>Ngoại ngữ</Typography>
                </Grid>
                <Grid item xs={4}>
                  <TextField id="outlined-basic" label="Nhập" variant="outlined" />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} columns={16}>
            <Grid item xs={8}>
              <Grid container spacing={2} columns={8}>
                <Grid item xs={4}>
                  <Typography sx={headerStyle}>Số điện thoại</Typography>
                </Grid>
                <Grid item xs={4} sx={{ py: "10px" }}>
                  <TextField id="outlined-basic" label="Nhập" variant="outlined" />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={8}>
              <Grid container spacing={2} columns={8}>
                <Grid item xs={4}>
                  <Button>
                    <AddCircleIcon />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} columns={16}>
            <Grid item xs={8}>
              <Grid container spacing={2} columns={8}>
                <Grid item xs={4}>
                  <Typography sx={headerStyle}>Email</Typography>
                </Grid>
                <Grid item xs={4} sx={{ py: "10px" }}>
                  <TextField id="outlined-basic" label="Nhập" variant="outlined" />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={8}>
              <Grid container spacing={2} columns={8}>
                <Grid item xs={4}>
                  <Button onClick={handleOpen} variant="outlined">
                    Xem CV
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} columns={16}>
            <Grid item xs={8}>
              <Grid container spacing={2} columns={8}>
                <Grid item xs={4}>
                  <Typography sx={headerStyle}>Địa chỉ</Typography>
                </Grid>
                <Grid item xs={4} sx={{ py: "10px" }}>
                  <TextField id="outlined-basic" label="Nhập" variant="outlined" />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={8}></Grid>
          </Grid>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} columns={16}>
            <Grid item xs={8}>
              <Typography variant="h5" sx={{ fontWeight: "bold", color: "#0066cc" }} style={styles}>
                Vị trí ứng tuyển
              </Typography>
            </Grid>
            <Grid item xs={8}></Grid>
          </Grid>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} columns={16}>
            <Grid item xs={8}>
              <Grid container spacing={2} columns={8}>
                <Grid item xs={4}>
                  <Typography sx={headerStyle}>Vị trí</Typography>
                </Grid>
                <Grid item xs={4} sx={{ py: "10px" }}>
                  <TextField id="outlined-basic" label="Nhập" variant="outlined" />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={8}></Grid>
          </Grid>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} columns={16}>
            <Grid item xs={8}>
              <Grid container spacing={2} columns={8}>
                <Grid item xs={4}>
                  <Typography sx={headerStyle}>Lương mong muốn</Typography>
                </Grid>
                <Grid item xs={4} sx={{ py: "10px" }}>
                  <TextField id="outlined-basic" label="Nhập" variant="outlined" />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={8}></Grid>
          </Grid>
        </Box>
        <Container sx={{ display: "flex", justifyContent: "right" }}>
          <Button onClick={handleClose} variant="contained" sx={{ borderRadius: "40px" }}>
            Lưu
          </Button>
        </Container>
      </Container>
    </>
  );
}
