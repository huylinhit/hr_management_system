import {
  Box,
  Stepper,
  Typography,
  Step,
  StepLabel,
  Button,
  Container,
  Paper,
  Grid,
} from "@mui/material";
import React from "react";

function FirstStep() {
  const steps = ["Tạo acount", "Thông tin cá nhân", "Lưu hợp đồng"];

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordagain, setAgian] = React.useState("");
  const [role, setRole] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    let isInfoValid = false;
    switch (activeStep) {
      case 0:
        if (name.trim() !== "") {
          isInfoValid = true;
        }
        break;
      case 1:
        if (phone.trim() !== "") {
          isInfoValid = true;
        }
        break;
      default:
        isInfoValid = true;
        break;
    }

    if (isInfoValid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    } else {
      alert("Bạn chưa hoàn thành bước 1");
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
    setName("");
    setPhone("");
  };

  return (
    <>
      <Typography variant="h4" sx={{ mb: "10px" }}>
        Thêm nhân viên mới
      </Typography>
      <Container component={Paper} sx={{ mt: "30px" }}>
        <Container>
          <Box sx={{ width: "100%" }}>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps: { completed?: boolean } = {};
                const labelProps: {
                  optional?: React.ReactNode;
                } = {};
                if (isStepOptional(index)) {
                  labelProps.optional = (
                    <Typography variant="caption"></Typography>
                  );
                }
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  Bạn đã hoàn thành các bước
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {activeStep === 0 && (
                  <Container>
                    {/* Bước 1 */}
                    <Container
                      sx={{
                        mt: "30px",
                        border: "solid 2px rgba(226, 225, 229, 1)",
                        borderRadius: "10px",
                      }}
                    >
                      {/* NHẬP USERNAME */}
                      <div>
                        <Container
                          sx={{
                            mt: "30px",
                            mb: "30px",
                            mr: "50px",
                            ml: "50px",
                          }}
                        >
                          <Typography>Username</Typography>
                          <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{
                              height: "40px",
                              width: "90%",
                              border: " 2px solid rgba(226, 225, 229, 1)",
                              borderRadius: "5px",
                            }}
                          />

                          <Typography>Email</Typography>
                          <input
                            type="text"
                            placeholder="Nhập email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                              height: "40px",
                              width: "90%",
                              border: " 2px solid rgba(226, 225, 229, 1)",
                              borderRadius: "5px",
                            }}
                          />

                          <Typography>Mật khẩu</Typography>
                          <input
                            type="text"
                            placeholder="Nhập mật khẩu"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                              height: "40px",
                              width: "90%",
                              border: " 2px solid rgba(226, 225, 229, 1)",
                              borderRadius: "5px",
                            }}
                          />

                          <Typography>Xác nhận mật khẩu</Typography>
                          <input
                            type="text"
                            placeholder="Nhập lại mật khẩu"
                            value={passwordagain}
                            onChange={(e) => setAgian(e.target.value)}
                            style={{
                              height: "40px",
                              width: "90%",
                              border: " 2px solid rgba(226, 225, 229, 1)",
                              borderRadius: "5px",
                            }}
                          />

                          <Typography>Vai trò</Typography>
                          <input
                            type="text"
                            placeholder="Nhập vai trò"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            style={{
                              height: "40px",
                              width: "90%",
                              border: " 2px solid rgba(226, 225, 229, 1)",
                              borderRadius: "5px",
                            }}
                          />
                        </Container>
                      </div>
                    </Container>
                  </Container>
                )}
                {activeStep === 1 && (
                  // Bước 2
                  <Container
                    sx={{
                      mt: "30px",
                      border: "solid 2px rgba(226, 225, 229, 1)",
                      borderRadius: "10px",
                    }}
                  >
                    <div>
                      <Container
                        sx={{
                          mt: "30px",
                          mb: "30px",
                          mr: "50px",
                          ml: "50px",
                        }}
                      >
                        {/* <Grid sx={{ display: "flex", width: "100%" }}>
                          <Grid xs={6}> */}

                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            // gridGap: "10px",
                          }}
                        >
                          <div>
                            <Typography>Họ</Typography>
                            <input
                              type="text"
                              placeholder="Enter your phone number"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              style={{
                                height: "40px",
                                width: "80%",
                                border: " 2px solid rgba(226, 225, 229, 1)",
                                borderRadius: "5px",
                              }}
                            />
                            <Typography>Giới tính</Typography>
                            <input
                              type="text"
                              placeholder="Enter your phone number"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              style={{
                                height: "40px",
                                width: "80%",
                                border: " 2px solid rgba(226, 225, 229, 1)",
                                borderRadius: "5px",
                              }}
                            />
                            <Typography>SĐT</Typography>
                            <input
                              type="text"
                              placeholder="Enter your phone number"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              style={{
                                height: "40px",
                                width: "80%",
                                border: " 2px solid rgba(226, 225, 229, 1)",
                                borderRadius: "5px",
                              }}
                            />
                          </div>
                          {/* </Grid> */}
                          {/* <Grid xs={6}> */}
                          <div>
                            <Typography>Tên</Typography>
                            <input
                              type="text"
                              placeholder="Enter your phone number"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              style={{
                                height: "40px",
                                width: "80%",
                                border: " 2px solid rgba(226, 225, 229, 1)",
                                borderRadius: "5px",
                              }}
                            />

                            <Typography>Quốc tịch</Typography>
                            <input
                              type="text"
                              placeholder="Enter your phone number"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              style={{
                                height: "40px",
                                width: "80%",
                                border: " 2px solid rgba(226, 225, 229, 1)",
                                borderRadius: "5px",
                              }}
                            />

                            <Typography>Ngày sinh</Typography>
                            <input
                              type="text"
                              placeholder="Enter your phone number"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              style={{
                                height: "40px",
                                width: "80%",
                                border: " 2px solid rgba(226, 225, 229, 1)",
                                borderRadius: "5px",
                              }}
                            />
                          </div>
                          {/* </Grid>
                        </Grid> */}
                        </div>
                        <Typography>Địa chỉ</Typography>
                        <input
                          type="text"
                          placeholder="Enter your phone number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          style={{
                            height: "40px",
                            width: "90%",
                            border: " 2px solid rgba(226, 225, 229, 1)",
                            borderRadius: "5px",
                          }}
                        />
                        <Typography>CMND|CCCD</Typography>
                        <input
                          type="text"
                          placeholder="Enter your phone number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          style={{
                            height: "40px",
                            width: "40%",
                            border: " 2px solid rgba(226, 225, 229, 1)",
                            borderRadius: "5px",
                          }}
                        />
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            // gridGap: "10px",
                          }}
                        >
                          <div>
                            <Typography>Phòng ban</Typography>
                            <input
                              type="text"
                              placeholder="Enter your phone number"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              style={{
                                height: "40px",
                                width: "80%",
                                border: " 2px solid rgba(226, 225, 229, 1)",
                                borderRadius: "5px",
                              }}
                            />
                            <Typography>Chức vụ</Typography>
                            <input
                              type="text"
                              placeholder="Enter your phone number"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              style={{
                                height: "40px",
                                width: "80%",
                                border: " 2px solid rgba(226, 225, 229, 1)",
                                borderRadius: "5px",
                              }}
                            />
                          </div>
                          <div>
                            <Typography>Tên ngân hàng</Typography>
                            <input
                              type="text"
                              placeholder="Enter your phone number"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              style={{
                                height: "40px",
                                width: "80%",
                                border: " 2px solid rgba(226, 225, 229, 1)",
                                borderRadius: "5px",
                              }}
                            />
                            <Typography>Số tài khoản ngân hàng</Typography>
                            <input
                              type="text"
                              placeholder="Enter your phone number"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              style={{
                                height: "40px",
                                width: "80%",
                                border: " 2px solid rgba(226, 225, 229, 1)",
                                borderRadius: "5px",
                              }}
                            />
                          </div>
                        </div>
                        <Typography>Ngân hàng</Typography>
                        <input
                          type="text"
                          placeholder="Enter your phone number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          style={{
                            height: "40px",
                            width: "90%",
                            border: " 2px solid rgba(226, 225, 229, 1)",
                            borderRadius: "5px",
                          }}
                        />
                      </Container>
                    </div>
                  </Container>
                )}
                {activeStep === 2 && (
                  // Bước 3
                  <Container
                    sx={{
                      mt: "30px",
                      border: "solid 2px rgba(226, 225, 229, 1)",
                      borderRadius: "10px",
                    }}
                  >
                    <Container
                      sx={{
                        mt: "30px",
                        mb: "30px",
                        mr: "50px",
                        ml: "50px",
                      }}
                    >
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          // gridGap: "10px",
                        }}
                      >
                        <div>
                          <Typography>Loại hợp đồng</Typography>
                          <input
                            type="text"
                            placeholder="Enter your phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            style={{
                              height: "40px",
                              width: "80%",
                              border: " 2px solid rgba(226, 225, 229, 1)",
                              borderRadius: "5px",
                            }}
                          />
                          <Typography>Ngày bắt đầu hợp đồng</Typography>
                          <input
                            type="text"
                            placeholder="Enter your phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            style={{
                              height: "40px",
                              width: "80%",
                              border: " 2px solid rgba(226, 225, 229, 1)",
                              borderRadius: "5px",
                            }}
                          />

                          <Typography>Lương căn bản</Typography>
                          <input
                            type="text"
                            placeholder="Enter your phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            style={{
                              height: "40px",
                              width: "80%",
                              border: " 2px solid rgba(226, 225, 229, 1)",
                              borderRadius: "5px",
                            }}
                          />

                          <Typography>Số ngày làm hàng tháng</Typography>
                          <input
                            type="text"
                            placeholder="Enter your phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            style={{
                              height: "40px",
                              width: "80%",
                              border: " 2px solid rgba(226, 225, 229, 1)",
                              borderRadius: "5px",
                            }}
                          />

                          <Typography>Phụ cấp</Typography>
                          <input
                            type="text"
                            placeholder="Enter your phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            style={{
                              height: "40px",
                              width: "80%",
                              border: " 2px solid rgba(226, 225, 229, 1)",
                              borderRadius: "5px",
                            }}
                          />
                        </div>
                        <div>
                          <Typography>Loại lương</Typography>
                          <input
                            type="text"
                            placeholder="Enter your phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            style={{
                              height: "40px",
                              width: "80%",
                              border: " 2px solid rgba(226, 225, 229, 1)",
                              borderRadius: "5px",
                            }}
                          />

                          <Typography>Ngày kết thúc hợp đồng</Typography>
                          <input
                            type="text"
                            placeholder="Enter your phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            style={{
                              height: "40px",
                              width: "80%",
                              border: " 2px solid rgba(226, 225, 229, 1)",
                              borderRadius: "5px",
                            }}
                          />

                          <Typography>Lương tính thuế</Typography>
                          <input
                            type="text"
                            placeholder="Enter your phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            style={{
                              height: "40px",
                              width: "80%",
                              border: " 2px solid rgba(226, 225, 229, 1)",
                              borderRadius: "5px",
                            }}
                          />

                          <Typography>Ngày trả lương hàng tháng</Typography>
                          <input
                            type="text"
                            placeholder="Enter your phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            style={{
                              height: "40px",
                              width: "80%",
                              border: " 2px solid rgba(226, 225, 229, 1)",
                              borderRadius: "5px",
                            }}
                          />
                        </div>
                      </div>
                      <Typography>Ghi chú</Typography>
                      <input
                        type="text"
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        style={{
                          height: "40px",
                          width: "90%",
                          border: " 2px solid rgba(226, 225, 229, 1)",
                          borderRadius: "5px",
                        }}
                      />

                      <Typography>Nhập file</Typography>
                    </Container>
                  </Container>
                )}

                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Quay về
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />

                  <Button onClick={handleNext}>
                    {activeStep === steps.length - 1 ? "Hoàn thành" : "Tiếp"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Box>
        </Container>
      </Container>
    </>
  );
}

export default FirstStep;
