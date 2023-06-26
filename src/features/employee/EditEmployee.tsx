import { Box, Grid, Typography, Container, Paper, Button } from "@mui/material";
import DetailAva from "./component/DetailAva";

function EditEmployee() {
  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        Chỉnh sửa thông tin nhân viên
      </Typography>

      <Container component={Paper} sx={{ mt: "20px" }}>
        <Grid container sx={{ display: "flex" }}>
          <Grid item xs={1}>
            <DetailAva />
          </Grid>
          <Grid item xs={2} sx={{ mt: "30px", ml: "30px" }}>
            <div>
              <input
                type="text"
                placeholder="Nguyễn Minh"
                style={{
                  height: "36px",
                  width: "100%",
                  border: " 2px solid rgba(226, 225, 229, 1)",
                  borderRadius: "8px",fontSize:"17px",
                  marginBottom: "12px",
                }}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder=" 1000000001"
                style={{
                  height: "36px",
                  width: "100%",
                  border: " 2px solid rgba(226, 225, 229, 1)",
                  borderRadius: "8px",fontSize:"17px"
                }}
              />
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
                  borderRadius: "8px",fontSize:"17px"
                }}
              />
            </div>
          </Grid>
        </Grid>

        <Box
          sx={{ border: "0.5px solid rgba(0, 0, 0, 0.5) ", my: "20px" }}
        ></Box>

        <Container>
          <Grid container sx={{ display: "flex", ml:"20px" }}>
            
            <Grid item xs={5} >
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
                      sx={{ fontSize: "20px", mb: "20px", fontWeight: "bold" }}
                    >
                      Giới tính:
                    </Typography>
                    <Typography
                      sx={{ fontSize: "20px", mb: "20px", fontWeight: "bold" }}
                    >
                      Ngày sinh:
                    </Typography>
                    <Typography
                      sx={{ fontSize: "20px", mb: "20px", fontWeight: "bold" }}
                    >
                      Phòng ban:
                    </Typography>
                    <Typography
                      sx={{ fontSize: "20px", mb: "20px", fontWeight: "bold" }}
                    >
                      Ngày vào làm:
                    </Typography>
                    <Typography
                      sx={{ fontSize: "20px", mb: "20px", fontWeight: "bold" }}
                    >
                      Quốc tịch:
                    </Typography>
                    <Typography
                      sx={{ fontSize: "20px", mb: "20px", fontWeight: "bold" }}
                    >
                      CMND|CCCD:
                    </Typography>
                    <Typography
                      sx={{ fontSize: "20px", mb: "20px", fontWeight: "bold" }}
                    >
                      Số năm làm việc:
                    </Typography>
                    <Typography
                      sx={{ fontSize: "20px", mb: "20px", fontWeight: "bold" }}
                    >
                      Tk ngân hàng:
                    </Typography>
                    <Typography
                      sx={{ fontSize: "20px", mb: "20px", fontWeight: "bold" }}
                    >
                      Tên ngân hàng:
                    </Typography>
                    <Typography
                      sx={{ fontSize: "20px", mb: "20px", fontWeight: "bold" }}
                    >
                      Ngân hàng:
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <div style={{ marginBottom: "14px" }}>
                      <input
                        type="text"
                        placeholder=" Nữ"
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
                      <input
                        type="text"
                        placeholder=" Marketing "
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
                        placeholder="2020/11/12"
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
                        placeholder=" Việt Nam "
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
                        placeholder="093829112888"
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
                        placeholder="3 năm"
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
                        placeholder="Việt Nam"
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
                        placeholder="Việt Nam"
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
          

            <Box sx={{ border: "0.5px solid rgba(0, 0, 0, 0.5) ", my: "20px" }}></Box>
            
            <Grid item xs={6} sx={{ml:"85px"}}>
              <Typography
                sx={{
                  fontSize: "26px",
                  fontWeight: "bold",
                  color: "#246DD6",
                  my: "20px",
                }}
              >
                Liên lạc
              </Typography>
              <Grid container>
                <Grid item xs={4}>
                  <Container>
                    <Typography
                      sx={{ fontSize: "20px", mb: "20px", fontWeight: "bold" }}
                    >
                      Số điện thoại:
                    </Typography>
                    <Typography
                      sx={{ fontSize: "20px", mb: "20px", fontWeight: "bold" }}
                    >
                      Mail:
                    </Typography>
                    <Typography
                      sx={{ fontSize: "20px", mb: "20px", fontWeight: "bold" }}
                    >
                      Địa chỉ:
                    </Typography>
                  </Container>
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
                      sx={{ fontSize: "20px", mb: "20px", fontWeight: "bold" }}
                    >
                      .NET:
                    </Typography>
                    <Typography
                      sx={{ fontSize: "20px", mb: "20px", fontWeight: "bold" }}
                    >
                      Ngoại ngữ:
                    </Typography>
                    <Typography
                      sx={{ fontSize: "20px", mb: "20px", fontWeight: "bold" }}
                    >
                      Ngoại ngữ:
                    </Typography>
                  </Container>
                </Grid>
                <Grid item xs={8}>
                  <div style={{ marginBottom: "14px" }}>
                    <input
                      type="text"
                      placeholder="0987654321"
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
                      placeholder="nbvcf@gmai.com"
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
                      placeholder="abcde không biết"
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
                  <div style={{ marginBottom: "14px", height: "50px" }}></div>
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
                      placeholder="Bằng IELTS 6.5 "
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
                      placeholder="Bằng IELTS 6.5"
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
            <Button
              variant="contained"
              sx={{ my: "20px", fontSize: "22px", background: "#007FFF" }}
            >
              Lưu
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default EditEmployee;
