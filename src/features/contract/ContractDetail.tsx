import { Margin } from "@mui/icons-material";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";

function ContractDetail() {
  return (
    <>
      <div style={{ paddingTop: "25px", marginLeft: "35px" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Thông tin hợp đồng
        </Typography>
      </div>
      <Container component={Paper}>
        <Container sx={{ py: "40px" }}>
          <Container
            sx={{
              border: "solid 2px rgba(226, 225, 229, 1)",
              borderRadius: "8px",
            }}
          >
            <Container sx={{ ml: "20px" }}>
              <Typography variant="h5" sx={{ fontWeight: "bold", mt: "25px" }}>
                Thông tin người lao động
              </Typography>
              <Container>
                <Grid sx={{ display: "flex" }}>
                  <Grid item xs={3}>
                    <Container>
                      <Typography
                        sx={{ fontSize: "18px", fontWeight: "500", mb: "8px" }}
                      >
                        Họ và tên:{" "}
                      </Typography>
                      <Typography
                        sx={{ fontSize: "18px", fontWeight: "500", mb: "8px" }}
                      >
                        Sinh ngày:{" "}
                      </Typography>
                      <Typography
                        sx={{ fontSize: "18px", fontWeight: "500", mb: "8px" }}
                      >
                        CMND:{" "}
                      </Typography>
                      <Typography
                        sx={{ fontSize: "18px", fontWeight: "500", mb: "8px" }}
                      >
                        Địa chỉ:{" "}
                      </Typography>
                      <Typography
                        sx={{ fontSize: "18px", fontWeight: "500", mb: "8px" }}
                      >
                        Số điện thoại:{" "}
                      </Typography>
                    </Container>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography sx={{ fontSize: "18px", mb: "8px" }}>
                      Võ Minh Hoàng
                    </Typography>
                    <Typography sx={{ fontSize: "18px", mb: "8px" }}>
                      2003/07/23
                    </Typography>
                    <Typography sx={{ fontSize: "18px", mb: "8px" }}>
                      1000000001
                    </Typography>
                    <Typography sx={{ fontSize: "18px", mb: "8px" }}>
                      abcd không biết
                    </Typography>
                    <Typography sx={{ fontSize: "18px", mb: "8px" }}>
                      0123456789
                    </Typography>
                  </Grid>
                  <Grid item xs={3} sx={{ ml: "175px" }}>
                    <Typography sx={{ fontSize: "18px", mb: "8px" }}>
                      Giới tính:{" "}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography sx={{ fontSize: "18px", mb: "8px" }}>
                      Nữ
                    </Typography>
                  </Grid>
                </Grid>
              </Container>
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: "8px" }}>
                Hợp đồng lao động
              </Typography>
              <Container>
                <Typography
                  sx={{ fontWeight: "bold", fontSize: "20px", mb: "8px" }}
                >
                  1. Công việc, phòng ban và thời hạn hợp đồng
                </Typography>
                <Container>
                  <Grid sx={{ display: "flex" }}>
                    <Grid item xs={3}>
                      <Typography sx={{ fontSize: "18px", mb: "8px" }}>
                        Phòng ban công tác:{" "}
                      </Typography>
                      <Typography sx={{ fontSize: "18px", mb: "8px" }}>
                        Loại hợp đồng:{" "}
                      </Typography>
                      <Typography sx={{ fontSize: "18px", mb: "8px" }}>
                        Từ ngày:{" "}
                      </Typography>
                    </Grid>
                    <Grid item xs={3} sx={{ ml: "5px" }}>
                      <Typography sx={{ fontSize: "18px", mb: "8px" }}>
                        Marketing{" "}
                      </Typography>
                      <Typography sx={{ fontSize: "18px", mb: "8px" }}>
                        Không giới hạn
                      </Typography>
                      <Typography sx={{ fontSize: "18px", mb: "8px" }}>
                        2023/07/23{" "}
                      </Typography>
                    </Grid>
                    <Grid item xs={3} sx={{ ml: "50px" }}>
                      <div style={{ height: "70px" }}></div>
                      <Typography sx={{ fontSize: "18px" }}>-</Typography>
                    </Grid>
                    <Grid item xs={3} sx={{ ml: "100px" }}>
                      <div style={{ height: "70px" }}></div>
                      <Typography sx={{ fontSize: "18px", mb: "8px" }}>
                        Đến ngày:{" "}
                      </Typography>
                    </Grid>
                  </Grid>
                </Container>
                <Typography
                  sx={{ fontWeight: "bold", fontSize: "20px", mb: "8px" }}
                >
                  2. Lương, phụ cấp và các khoản bổ sung khác
                </Typography>
                <Container>
                  <Grid sx={{ display: "flex" }}>
                    <Grid item xs={3}>
                      <Typography
                        sx={{ fontSize: "18px", fontWeight: "500", mb: "8px" }}
                      >
                        Lương căn bản:{" "}
                      </Typography>
                      <Typography
                        sx={{ fontSize: "18px", fontWeight: "500", mb: "8px" }}
                      >
                        Các phụ cấp mỗi tháng:{" "}
                      </Typography>
                      <Container>
                        <Typography
                          sx={{
                            fontSize: "18px",
                            fontWeight: "500",
                            mb: "8px",
                          }}
                        >
                          Phụ cấp gửi xe và ăn trưa:{" "}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "18px",
                            fontWeight: "500",
                            mb: "8px",
                          }}
                        >
                          Phụ cấp chức vụ:
                        </Typography>
                      </Container>
                      <Typography
                        sx={{ fontSize: "18px", fontWeight: "500", mb: "8px" }}
                      >
                        Hình thức trả lương:{" "}
                      </Typography>
                      <Container>
                        <Typography
                          sx={{
                            fontSize: "18px",
                            fontWeight: "500",
                            mb: "8px",
                          }}
                        >
                          Số tài khoản ngân hàng:{" "}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "18px",
                            fontWeight: "500",
                            mb: "8px",
                          }}
                        >
                          Chủ tài khoản ngân hàng:{" "}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "18px",
                            fontWeight: "500",
                            mb: "8px",
                          }}
                        >
                          Ngân hàng:{" "}
                        </Typography>
                      </Container>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography sx={{ fontSize: "18px", mb: "8px" }}>
                        20.000.000 VND
                      </Typography>
                      <div
                        style={{
                          height: "38px",
                        }}
                      ></div>

                      <Typography sx={{ fontSize: "18px", mb: "8px" }}>
                        3.000.000 VND
                      </Typography>
                      <Typography sx={{ fontSize: "18px", mb: "8px" }}>
                        3.000.000 VND
                      </Typography>
                      <Typography sx={{ fontSize: "18px", mb: "8px" }}>
                        Chuyển khoản
                      </Typography>
                      <Typography sx={{ fontSize: "18px", mb: "8px" }}>
                        09876541332
                      </Typography>
                      <Typography sx={{ fontSize: "18px", mb: "8px" }}>
                        Võ Minh Hoàng
                      </Typography>
                      <Typography sx={{ fontSize: "18px", mb: "8px" }}>
                        VMH Bank
                      </Typography>
                    </Grid>

                    <Grid item xs={3} sx={{ ml: "70px" }}>
                      <Typography
                        sx={{ fontSize: "18px", fontWeight: "500", mb: "8px" }}
                      >
                        Lương tính thuế:{" "}
                      </Typography>
                    </Grid>
                    <Grid item xs={3} sx={{ ml: "15px" }}>
                      <Typography sx={{ fontSize: "18px", mb: "8px" }}>
                        20.000.000 VND
                      </Typography>
                    </Grid>
                  </Grid>
                </Container>
                <Typography
                  sx={{ fontWeight: "bold", fontSize: "20px", mb: "8px" }}
                >
                  3. Thời gian làm việc và ghi chú
                </Typography>
                <Container>
                  <Grid sx={{ display: "flex" }}>
                    <Grid item xs={3}>
                      <Typography
                        sx={{ fontSize: "18px", fontWeight: "500", mb: "8px" }}
                      >
                        Số ngày làm việc một tuần:{" "}
                      </Typography>
                      <Typography
                        sx={{ fontSize: "18px", fontWeight: "500", mb: "8px" }}
                      >
                        Ghi chú:{" "}
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography
                        sx={{ fontSize: "18px", ml: "5px", mb: "8px" }}
                      >
                        5
                      </Typography>
                    </Grid>
                  </Grid>
                </Container>
                <Button variant="contained" sx={{ m: "20px" }}>
                  Xem file
                </Button>
              </Container>
            </Container>
          </Container>
        </Container>
      </Container>
    </>
  );
}

export default ContractDetail;
