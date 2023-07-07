import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { useRef } from "react";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import DetailAva from "../detail_employee/component/DetailAva";

const headerStyle = {
  fontWeight: "bold",
};
const styles = {
  marginBottom: "15px",
};

function EditCandidate({ handleClose, handleOpen, handleChange }: any) {
  return (
    <>
      <Container>
        <Typography variant="h4" sx={headerStyle} style={styles}>
          Chỉnh sửa thông tin nhân viên
        </Typography>
        <Container
          component={Paper}
          maxWidth={false}
          sx={{ padding: "12px", borderRadius: "40px" }}
        >
          <Grid container sx={{ display: "flex" }}>
            <Grid item xs={1}>
              {/* <DetailAva /> */}
            </Grid>
            <Grid item xs={2} sx={{ mt: "30px", ml: "30px" }}>
              <div>
                <input
                  type="text"
                  placeholder=" Nguyễn Minh"
                  style={{
                    height: "36px",
                    width: "100%",
                    border: " 2px solid rgba(226, 225, 229, 1)",
                    borderRadius: "8px",
                    fontSize: "17px",
                  }}
                />
              </div>
              <div>
                <select
                  style={{
                    height: "36px",
                    width: "100%",
                    border: " 2px solid rgba(226, 225, 229, 1)",
                    borderRadius: "8px",
                    fontSize: "17px",
                    marginBottom: "12px",
                  }}
                >
                  <option value="">Chờ duyệt</option>
                  <option value="Đạt">Đạt</option>
                  <option value="Không đạt">Không đạt</option>
                </select>
              </div>
            </Grid>
            <Grid item xs={2} sx={{ mt: "30px", ml: "30px" }}>
              <div>
                <input
                  type="text"
                  placeholder="Hoàng"
                  style={{
                    height: "36px",
                    width: "100%",
                    border: " 2px solid rgba(226, 225, 229, 1)",
                    borderRadius: "8px",
                    fontSize: "17px",
                  }}
                />
              </div>
            </Grid>
          </Grid>

          <Box
            sx={{ border: "0.5px solid rgba(0, 0, 0, 0.5) ", my: "20px" }}
          ></Box>
          <Container>
            <Grid container sx={{ display: "flex-", ml: "60px" }}>
              <Grid item xs={5}>
                <Typography
                  sx={{
                    fontSize: "26px",
                    fontWeight: "bold",
                    color: "#246DD6",
                    my: "20px",
                  }}
                >
                  Thông tin
                </Typography>
                <Container>
                  <Grid container sx={{ display: "flex" }}>
                    <Grid item xs={5}>
                      <Typography
                        sx={{
                          fontSize: "20px",
                          mb: "20px",
                          fontWeight: "bold",
                        }}
                      >
                        Giới tính:
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "20px",
                          mb: "20px",
                          fontWeight: "bold",
                        }}
                      >
                        Ngày sinh:
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "20px",
                          mb: "20px",
                          fontWeight: "bold",
                        }}
                      >
                        Phòng ban:
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "20px",
                          mb: "20px",
                          fontWeight: "bold",
                        }}
                      >
                        Số điện thoại:
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "20px",
                          mb: "20px",
                          fontWeight: "bold",
                        }}
                      >
                        Mail:
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "20px",
                          mb: "20px",
                          fontWeight: "bold",
                        }}
                      >
                        Địa chỉ:
                      </Typography>
                      <Grid item xs={4}></Grid>
                      <Typography
                        sx={{
                          fontSize: "23px",
                          fontWeight: "bold",
                          color: "#246DD6",
                          my: "20px",
                        }}
                      >
                        Vị trí ứng tuyển
                      </Typography>
                      <Container>
                        <Typography
                          sx={{
                            fontSize: "20px",
                            mb: "20px",
                            fontWeight: "bold",
                          }}
                        >
                          Vị trí:
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "20px",
                            mb: "20px",
                            fontWeight: "bold",
                          }}
                        >
                          Lương mong muốn:
                        </Typography>
                      </Container>
                    </Grid>
                    <Grid item xs={7}>
                      <div style={{ marginBottom: "14px" }}>
                        <select
                          style={{
                            height: "36px",
                            width: "70%",
                            border: "2px solid rgba(226, 225, 229, 1)",
                            borderRadius: "8px",
                            fontSize: "17px",
                            color: "#000",
                          }}
                        >
                          <option value="">Chọn giới tính</option>
                          <option value="Nam">Nam</option>
                          <option value="Nữ">Nữ</option>
                          <option value="Khác">Khác</option>
                        </select>
                      </div>

                      <div style={{ marginBottom: "14px" }}>
                        <input
                          type="text"
                          placeholder="2000/12/20"
                          style={{
                            height: "36px",
                            width: "70%",
                            border: " 2px solid rgba(226, 225, 229, 1)",
                            borderRadius: "8px",
                            fontSize: "17px",
                            color: "#000",
                          }}
                        />
                      </div>
                      <div style={{ marginBottom: "14px" }}>
                        <select
                          style={{
                            height: "36px",
                            width: "70%",
                            border: "2px solid rgba(226, 225, 229, 1)",
                            borderRadius: "8px",
                            fontSize: "17px",
                            color: "#000",
                          }}
                        >
                          <option value="">Chọn phòng</option>
                          <option value="Nam">1</option>
                          <option value="Nữ">2</option>
                          <option value="Khác">3</option>
                        </select>
                      </div>
                      <div style={{ marginBottom: "14px" }}>
                        <input
                          type="text"
                          placeholder="0964071639"
                          style={{
                            height: "36px",
                            width: "70%",
                            border: " 2px solid rgba(226, 225, 229, 1)",
                            borderRadius: "8px",
                            fontSize: "17px",
                            color: "#000",
                          }}
                        />
                      </div>
                      <div style={{ marginBottom: "14px" }}>
                        <input
                          type="text"
                          placeholder="hoangvm@gmail.com "
                          style={{
                            height: "36px",
                            width: "70%",
                            border: " 2px solid rgba(226, 225, 229, 1)",
                            borderRadius: "8px",
                            fontSize: "17px",
                            color: "#000",
                          }}
                        />
                      </div>
                      <div style={{ marginBottom: "14px" }}>
                        <input
                          type="text"
                          placeholder="abcd ko bít"
                          style={{
                            height: "36px",
                            width: "70%",
                            border: " 2px solid rgba(226, 225, 229, 1)",
                            borderRadius: "8px",
                            fontSize: "17px",
                            color: "#000",
                          }}
                        />
                      </div>
                      <div
                        style={{ marginBottom: "14px", height: "70px" }}
                      ></div>
                      <div style={{ marginBottom: "14px" }}>
                        <input
                          type="text"
                          placeholder="Marketing"
                          style={{
                            height: "36px",
                            width: "70%",
                            border: " 2px solid rgba(226, 225, 229, 1)",
                            borderRadius: "8px",
                            fontSize: "17px",
                            color: "#000",
                          }}
                        />
                      </div>
                      <div style={{ marginBottom: "14px" }}>
                        <input
                          type="text"
                          placeholder="20.000.000"
                          style={{
                            height: "36px",
                            width: "70%",
                            border: " 2px solid rgba(226, 225, 229, 1)",
                            borderRadius: "8px",
                            fontSize: "17px",
                            color: "#000",
                          }}
                        />
                      </div>
                    </Grid>
                  </Grid>
                </Container>
              </Grid>

              <Box
                sx={{ border: "0.5px solid rgba(0, 0, 0, 0.5) ", my: "20px" }}
              ></Box>

              <Grid item xs={6} sx={{ ml: "85px" }}>
                <Grid container>
                  <Grid item xs={4}>
                    <Typography
                      sx={{
                        fontSize: "26px",
                        fontWeight: "bold",
                        color: "#246DD6",
                        my: "20px",
                      }}
                    >
                      Kỹ năng
                    </Typography>
                    <Container>
                      <Typography
                        sx={{
                          fontSize: "20px",
                          mb: "20px",
                          fontWeight: "bold",
                        }}
                      >
                        .NET:
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "20px",
                          mb: "20px",
                          fontWeight: "bold",
                        }}
                      >
                        Ngoại ngữ:
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "20px",
                          mb: "20px",
                          fontWeight: "bold",
                        }}
                      >
                        Ngoại ngữ:
                      </Typography>
                      <Button>
                        <AddCircleIcon style={{ fontSize: "50px" }} />
                      </Button>
                      <Grid style={{ marginBottom: "14px", height: "60px" }}>
                        <Button onClick={handleOpen} variant="outlined">
                          Xem CV
                        </Button>
                      </Grid>
                    </Container>
                  </Grid>

                  <Grid item xs={8}>
                    <div style={{ marginBottom: "14px", height: "60px" }}></div>
                    <div style={{ marginBottom: "14px" }}>
                      <input
                        type="text"
                        placeholder="6 tháng"
                        style={{
                          height: "36px",
                          width: "40%",
                          border: " 2px solid rgba(226, 225, 229, 1)",
                          borderRadius: "8px",
                          fontSize: "17px",
                          color: "#000",
                        }}
                      />
                    </div>
                    <div style={{ marginBottom: "14px" }}>
                      <input
                        type="text"
                        placeholder="Tiếng Nhật"
                        style={{
                          height: "36px",
                          width: "40%",
                          border: " 2px solid rgba(226, 225, 229, 1)",
                          borderRadius: "8px",
                          fontSize: "17px",
                          color: "#000",
                        }}
                      />
                    </div>
                    <div style={{ marginBottom: "14px" }}>
                      <input
                        type="text"
                        placeholder="Tiếng Nhật"
                        style={{
                          height: "36px",
                          width: "40%",
                          border: " 2px solid rgba(226, 225, 229, 1)",
                          borderRadius: "8px",
                          fontSize: "17px",
                          color: "#000",
                        }}
                      />
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
          <Grid container>
            <Grid item xs={10}></Grid>
            <Grid item xs={2}>
              <Container sx={{ display: "flex", justifyContent: "right" }}>
                <Button
                  onClick={handleClose}
                  variant="contained"
                  sx={{ borderRadius: "40px" }}
                >
                  Lưu
                </Button>
              </Container>
            </Grid>
          </Grid>
        </Container>
      </Container>
    </>
  );
}

export default EditCandidate;
