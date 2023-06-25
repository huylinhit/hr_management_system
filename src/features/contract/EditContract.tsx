import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";

function EditContract() {
  return (
    <>
      <div style={{ paddingTop: "25px", marginLeft: "35px" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Chỉnh sửa hợp đồng
        </Typography>
      </div>
      <Container component={Paper}>
        <Container sx={{ py: "40px" }}>
          <Container
            sx={{
              marginLeft: "30px",
              border: "solid 2px rgba(226, 225, 229, 1)",
              borderRadius: "10px",
            }}
          >
            <Container sx={{ ml: "20px" }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", mt: "25px", mb: "8px" }}
              >
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
                      <div>
                        <select
                          style={{
                            height: "36px",
                            width: "90%",
                            border: "2px solid rgba(226, 225, 229, 1)",
                            borderRadius: "8px",
                            fontSize: "17px",
                            color: "  rgba(185, 185, 185)",
                            marginBottom: "8px",
                          }}
                        >
                          <option value="">Không giới hạn</option>
                          <option value=""></option>
                          <option value=""></option>
                          <option value=""></option>
                        </select>
                      </div>
                      <div></div>
                      <input
                        type="text"
                        placeholder="2023/07/23"
                        style={{
                          height: "36px",
                          width: "90%",
                          border: " 2px solid rgba(226, 225, 229, 1)",
                          borderRadius: "5px",
                          fontSize: "15px",
                          marginBottom: "8px",
                        }}
                      />
                    </Grid>
                    <Grid item xs={3} sx={{ ml: "50px" }}>
                      <div style={{ height: "55px" }}></div>
                      <Typography sx={{ fontSize: "18px", mb: "8px" }}>
                        -
                      </Typography>
                    </Grid>
                    <Grid item xs={3} sx={{ ml: "100px" }}>
                      <div style={{ height: "55px" }}></div>
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
                    <Grid
                      item
                      xs={3}
                      sx={{ fontSize: "18px", fontWeight: "500" }}
                    >
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
                        <div>
                          <input
                            type="text"
                            placeholder="Phụ cấp gửi xe và ăn trưa:"
                            style={{
                              height: "36px",
                              width: "90%",
                              border: " 2px solid rgba(226, 225, 229, 1)",
                              borderRadius: "5px",
                              fontSize: "15px",
                              marginBottom: "8px",
                              color: "#B9B9B9",
                            }}
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            placeholder="Phụ cấp chức vụ:"
                            style={{
                              height: "36px",
                              width: "90%",
                              border: " 2px solid rgba(226, 225, 229, 1)",
                              borderRadius: "5px",
                              fontSize: "15px",
                              marginBottom: "8px",
                              color: "#B9B9B9",
                            }}
                          />
                        </div>
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
                      <div>
                        <input
                          type="text"
                          placeholder="20.000.000 VND"
                          style={{
                            height: "36px",
                            width: "90%",
                            border: " 2px solid rgba(226, 225, 229, 1)",
                            borderRadius: "5px",
                            fontSize: "15px",
                            marginBottom: "8px",
                            color: "#B9B9B9",
                          }}
                        />
                      </div>
                      <div
                        style={{
                          height: "26px",
                        }}
                      ></div>

                      <div>
                        <input
                          type="text"
                          placeholder="3.000.000 VND"
                          style={{
                            height: "36px",
                            width: "90%",
                            border: " 2px solid rgba(226, 225, 229, 1)",
                            borderRadius: "5px",
                            fontSize: "15px",
                            marginBottom: "8px",
                            color: "#B9B9B9",
                          }}
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="3.000.000 VND"
                          style={{
                            height: "36px",
                            width: "90%",
                            border: " 2px solid rgba(226, 225, 229, 1)",
                            borderRadius: "5px",
                            fontSize: "15px",
                            marginBottom: "8px",
                            color: "#B9B9B9",
                          }}
                        />
                      </div>

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
                    <Grid item xs={3}>
                      <Typography
                        sx={{ fontSize: "18px", fontWeight: "500", mb: "8px" }}
                      >
                        Lương tính thuế:{" "}
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <div>
                        <input
                          type="text"
                          placeholder="20.000.000 VND"
                          style={{
                            height: "36px",
                            width: "90%",
                            border: " 2px solid rgba(226, 225, 229, 1)",
                            borderRadius: "5px",
                            fontSize: "15px",
                            marginBottom: "8px",
                            color: "#B9B9B9",
                          }}
                        />
                      </div>
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
                      <div>
                        <input
                          type="text"
                          placeholder="5"
                          style={{
                            height: "36px",
                            width: "90%",
                            border: " 2px solid rgba(226, 225, 229, 1)",
                            borderRadius: "5px",
                            fontSize: "15px",
                            marginBottom: "8px",
                            color: "#B9B9B9",
                          }}
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder=""
                          style={{
                            height: "36px",
                            width: "90%",
                            border: " 2px solid rgba(226, 225, 229, 1)",
                            borderRadius: "5px",
                            fontSize: "15px",
                            marginBottom: "8px",
                            color: "#B9B9B9",
                          }}
                        />
                      </div>
                    </Grid>
                  </Grid>
                </Container>
                <Button variant="outlined" sx={{ m: "20px" }}>
                  Chỉnh sử file
                </Button>
              </Container>
              <Grid container>
                <Grid item xs={10} >

                 <Button variant="outlined" sx={{mb:"20px",borderRadius:"20px"}}> Quay về</Button>
                </Grid>
                <Grid item xs={2} > 
                <Button variant="contained" sx={{mb:"20px",borderRadius:"20px"}}>Cập nhật
                  </Button>
                  </Grid>
              </Grid>
            </Container>
          </Container>
        </Container>
      </Container>
    </>
  );
}

export default EditContract;
