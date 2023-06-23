import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";

function ContractDetail() {
  return (
    <>
      <Typography variant="h4">Thông tin hợp đồng</Typography>
      <Container component={Paper}>
        <Container>
          <Box>
            <Container
              sx={{
                marginLeft: "30px",
                border: "solid 2px rgba(226, 225, 229, 1)",
                borderRadius: "10px",
              }}
            >
              <Typography variant="h5">Thông tin người lao động</Typography>
              <Container>
                <Grid sx={{ display: "flex" }}>
                  <Grid item xs={3}>
                    <Typography>Họ và tên: </Typography>
                    <Typography>Sinh ngày: </Typography>
                    <Typography>CMND: </Typography>
                    <Typography>Địa chỉ: </Typography>
                    <Typography>Số điện thoại: </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>Võ Minh Hoàng</Typography>
                    <Typography>2003/07/23</Typography>
                    <Typography>1000000001</Typography>
                    <Typography>abcd không biết</Typography>
                    <Typography>0123456789</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>Giới tính: </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>Nữ</Typography>
                  </Grid>
                </Grid>
              </Container>
              <Typography variant="h5">Hợp đồng lao động</Typography>
              <Container>
                <Typography>
                  1. Công việc, phòng ban và thời hạn hợp đồng
                </Typography>
                <Container>
                  <Grid sx={{ display: "flex" }}>
                    <Grid item xs={3}>
                      <Typography>Phòng ban công tác: </Typography>
                      <Typography>Loại hợp đồng: </Typography>
                      <Typography>Từ ngày: </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography>Marketing </Typography>
                      <Typography>Không giới hạn</Typography>
                      <Typography>2023/07/23 </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography></Typography>
                      <Typography></Typography>
                      <Typography> -Đến ngày: </Typography>
                    </Grid>
                  </Grid>
                </Container>
                <Typography>
                  2. Lương, phụ cấp và các khoản bổ sung khác
                </Typography>
                <Container>
                  <Grid sx={{ display: "flex" }}>
                    <Grid item xs={3}>
                      <Typography>Lương căn bản: </Typography>
                      <Typography>Các phụ cấp mỗi tháng: </Typography>
                      <Typography>Phụ cấp gửi xe và ăn trưa: </Typography>
                      <Typography>Phụ cấp chức vụ:</Typography>
                      <Typography>Hình thức trả lương: </Typography>
                      <Typography>Số tài khoản ngân hàng: </Typography>
                      <Typography>Chủ tài khoản ngân hàng: </Typography>
                      <Typography>Ngân hàng: </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography>20.000.000 VND</Typography>
                      <Typography></Typography>
                      <Typography>3.000.000 VND</Typography>
                      <Typography>3.000.000 VND</Typography>
                      <Typography>Chuyển khoản</Typography>
                      <Typography>09876541332</Typography>
                      <Typography>Võ Minh Hoàng</Typography>
                      <Typography>VMH Bank</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography>Lương tính thuế: </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography>20.000.000 VND</Typography>
                    </Grid>
                  </Grid>
                </Container>
                <Typography>3. Thời gian làm việc và ghi chú</Typography>
                <Container>
                  <Grid sx={{ display: "flex" }}>
                    <Grid item xs={3}>
                      <Typography>Số ngày làm việc một tuần: </Typography>
                      <Typography>Ghi chú: </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography>5</Typography>
                    </Grid>
                  </Grid>
                </Container>
                <Button variant="outlined">Xem file</Button>
              </Container>
            </Container>
          </Box>
        </Container>
      </Container>
    </>
  );
}

export default ContractDetail;
