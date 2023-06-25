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
  Radio,
} from "@mui/material";

import React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// import { makeStyles } from '@material-ui/core/styles';
// const useStyles = makeStyles({
//   myStepLabel: {
//     color: "red",
//     fontSize: 16,
//     // add more style rules as needed
//   },
// });

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
  const [selectedValue, setSelectedValue] = React.useState("male");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <>
      <Typography variant="h4" sx={{ mb: "10px", fontWeight: "bold" }}>
        Thêm nhân viên mới
      </Typography>
      <Container component={Paper}>
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
                <Typography sx={{ mt: 2, mb: 1, fontSize: "20px" }}>
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
                          <Typography sx={{ fontSize: "18px" }}>
                            Username
                          </Typography>
                          <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{
                              height: "56px",
                              width: "90%",
                              border: " 2px solid rgba(226, 225, 229, 1)",
                              borderRadius: "5px",
                              fontSize:"17px"
                            }}
                          />

                          <Typography sx={{ fontSize: "18px" }}>
                            Email
                          </Typography>
                          <input
                            type="text"
                            placeholder="Nhập email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                              height: "56px",
                              width: "90%",
                              border: " 2px solid rgba(226, 225, 229, 1)",
                              borderRadius: "5px",
                              fontSize:"17px"
                            }}
                          />

                          <Typography sx={{ fontSize: "18px" }}>
                            Mật khẩu
                          </Typography>
                          <input
                            type="text"
                            placeholder="Nhập mật khẩu"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                              height: "56px",
                              width: "90%",
                              border: " 2px solid rgba(226, 225, 229, 1)",
                              borderRadius: "5px",
                              fontSize:"17px"
                            }}
                          />

                          <Typography sx={{ fontSize: "18px" }}>
                            Xác nhận mật khẩu
                          </Typography>
                          <div>
                            <input
                              type="text"
                              placeholder="Nhập lại mật khẩu"
                              value={passwordagain}
                              onChange={(e) => setAgian(e.target.value)}
                              style={{
                                height: "56px",
                                width: "90%",
                                border: " 2px solid rgba(226, 225, 229, 1)",
                                borderRadius: "5px",
                                fontSize:"17px"
                              }}
                            />
                          </div>

                          <Typography sx={{ fontSize: "18px" }}>
                            Vai trò
                          </Typography>
                          <input
                            type="text"
                            placeholder="Nhập vai trò"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            style={{
                              height: "56px",
                              width: "90%",
                              border: " 2px solid rgba(226, 225, 229, 1)",
                              borderRadius: "5px",
                              fontSize:"17px"
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
                            <Typography sx={{ fontSize: "18px" }}>
                              Họ
                            </Typography>
                            <input
                              type="text"
                              placeholder="Enter your phone number"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              style={{
                                height: "56px",
                                width: "80%",
                                border: " 2px solid rgba(226, 225, 229, 1)",
                                borderRadius: "5px",
                                fontSize:"17px"
                              }}
                            />
                            <Typography sx={{ fontSize: "18px" }}>
                              Giới tính
                            </Typography>
                            {/* <input
                              type="text"
                              placeholder="Enter your phone number"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              style={{
                                height: "56px",
                                width: "80%",
                                border: " 2px solid rgba(226, 225, 229, 1)",
                                borderRadius: "5px",
                              }}
                            /> */}
                            <Box sx={{ display: "flex", gap: 2 }}>
                             
                              <Radio
                                checked={selectedValue === "male"}
                                onChange={handleChange}
                                value="male"
                                name="gender"
                                sx={{ color: "black" }}
                                inputProps={{"aria-label": "Nam"  }}
                              />
                               <Typography sx={{mt:"10px"}}> Nam</Typography>
                              
                              
                              <Radio
                                checked={selectedValue === "women"}
                                onChange={handleChange}
                                value="women"
                                name="gender"
                                inputProps={{"aria-label": "Nu" }}
                              />
                              <Typography sx={{mt:"10px"}}>Nữ</Typography>
                            </Box>
                            <Typography sx={{ fontSize: "18px" }}>
                              SĐT
                            </Typography>
                            <input
                              type="text"
                              placeholder="Enter your phone number"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              style={{
                                height: "56px",
                                width: "80%",
                                border: " 2px solid rgba(226, 225, 229, 1)",
                                borderRadius: "5px",
                                fontSize:"17px"
                              }}
                            />
                          </div>

                          <div>
                            <Typography sx={{ fontSize: "18px" }}>
                              Tên
                            </Typography>
                            <input
                              type="text"
                              placeholder="Enter your phone number"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              style={{
                                height: "56px",
                                width: "80%",
                                border: " 2px solid rgba(226, 225, 229, 1)",
                                borderRadius: "5px",
                                fontSize:"17px"
                              }}
                            />

                            <Typography sx={{ fontSize: "18px" }}>
                              Quốc tịch
                            </Typography>
                            <input
                              type="text"
                              placeholder="Enter your phone number"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              style={{
                                height: "56px",
                                width: "80%",
                                border: " 2px solid rgba(226, 225, 229, 1)",
                                borderRadius: "5px",
                                fontSize:"17px"
                              }}
                            />

                            <Typography sx={{ fontSize: "18px" }}>
                              Ngày sinh
                            </Typography>

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DemoContainer components={["DatePicker"]}>
                                <DatePicker
                                  sx={{ width: "80%" }}
                                  label="MM/DD/YYYY"
                                />
                              </DemoContainer>
                            </LocalizationProvider>
                          </div>
                        </div>
                        <Typography sx={{ fontSize: "18px" }}>
                          Địa chỉ
                        </Typography>
                        <input
                          type="text"
                          placeholder="Enter your phone number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          style={{
                            height: "56px",
                            width: "90%",
                            border: " 2px solid rgba(226, 225, 229, 1)",
                            borderRadius: "5px",
                            fontSize:"17px"
                          }}
                        />
                        <Typography sx={{ fontSize: "18px" }}>
                          CMND|CCCD
                        </Typography>
                        <input
                          type="text"
                          placeholder="Enter your phone number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          style={{
                            height: "56px",
                            width: "40%",
                            border: " 2px solid rgba(226, 225, 229, 1)",
                            borderRadius: "5px",
                            fontSize:"17px"
                          }}
                        />
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                          }}
                        >
                          <div>
                            <Typography sx={{ fontSize: "18px" }}>
                              Phòng ban
                            </Typography>
                            <input
                              type="text"
                              placeholder="Enter your phone number"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              style={{
                                height: "56px",
                                width: "80%",
                                border: " 2px solid rgba(226, 225, 229, 1)",
                                borderRadius: "5px",
                                fontSize:"17px"
                              }}
                            />
                            <Typography sx={{ fontSize: "18px" }}>
                              Chức vụ
                            </Typography>
                            <input
                              type="text"
                              placeholder="Enter your phone number"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              style={{
                                height: "56px",
                                width: "80%",
                                border: " 2px solid rgba(226, 225, 229, 1)",
                                borderRadius: "5px",
                                fontSize:"17px"
                              }}
                            />
                          </div>
                          <div>
                            <Typography sx={{ fontSize: "18px" }}>
                              Tên ngân hàng
                            </Typography>
                            <input
                              type="text"
                              placeholder="Enter your phone number"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              style={{
                                height: "56px",
                                width: "80%",
                                border: " 2px solid rgba(226, 225, 229, 1)",
                                borderRadius: "5px",
                                fontSize:"17px"
                              }}
                            />
                            <Typography sx={{ fontSize: "18px" }}>
                              {" "}
                              Số tài khoản ngân hàng
                            </Typography>
                            <input
                              type="text"
                              placeholder="Enter your phone number"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              style={{
                                height: "56px",
                                width: "80%",
                                border: " 2px solid rgba(226, 225, 229, 1)",
                                borderRadius: "5px",
                                fontSize:"17px"
                              }}
                            />
                          </div>
                        </div>
                        <Typography sx={{ fontSize: "18px" }}>
                          Ngân hàng
                        </Typography>
                        <input
                          type="text"
                          placeholder="Enter your phone number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          style={{
                            height: "56px",
                            width: "90%",
                            border: " 2px solid rgba(226, 225, 229, 1)",
                            borderRadius: "5px",
                            fontSize:"17px"
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
                        }}
                      >
                        <div>
                          <Typography sx={{ fontSize: "18px" }}>
                            Loại hợp đồng
                          </Typography>
                          <select
                            style={{
                              height: "56px",
                              width: "80%",
                              border: "2px solid rgba(226, 225, 229, 1)",
                              borderRadius: "8px",
                              fontSize: "17px",
                              color: "#000",
                            }}
                          >
                            <option value=""></option>
                            <option value=""></option>
                            <option value=""></option>
                            <option value=""></option>
                          </select>
                          <Typography sx={{ fontSize: "18px" }}>
                            Ngày bắt đầu hợp đồng
                          </Typography>
                          <input
                            type="text"
                            placeholder="Enter your phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            style={{
                              height: "56px",
                              width: "80%",
                              border: " 2px solid rgba(226, 225, 229, 1)",
                              borderRadius: "5px",
                              fontSize:"17px"
                            }}
                          />

                          <Typography sx={{ fontSize: "18px" }}>
                            Lương căn bản
                          </Typography>
                          <input
                            type="text"
                            placeholder="Enter your phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            style={{
                              height: "56px",
                              width: "80%",
                              border: " 2px solid rgba(226, 225, 229, 1)",
                              borderRadius: "5px",
                              fontSize:"17px"
                            }}
                          />

                          <Typography sx={{ fontSize: "18px" }}>
                            Số ngày làm hàng tháng
                          </Typography>
                          <input
                            type="text"
                            placeholder="Enter your phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            style={{
                              height: "56px",
                              width: "80%",
                              border: " 2px solid rgba(226, 225, 229, 1)",
                              borderRadius: "5px",
                              fontSize:"17px"
                            }}
                          />

                          <Typography sx={{ fontSize: "18px" }}>
                            Phụ cấp
                          </Typography>
                          <select
                            style={{
                              height: "56px",
                              width: "80%",
                              border: "2px solid rgba(226, 225, 229, 1)",
                              borderRadius: "8px",
                              fontSize: "17px",
                              color: "#000",
                            }}
                          >
                            <option value="">Chọn loại phụ cấp</option>
                            <option value=""></option>
                            <option value=""></option>
                            <option value=""></option>
                          </select>
                          <div>
                            <Button
                              sx={{
                                width: "60px",
                                height: "60px",
                                borderRadius: "60%",
                                backgroundColor: "#007FFF",
                                color: " white",
                                fontSize: "17px",
                                border: "none",
                                outline: "none",
                                cursor: "pointer",
                                my: "15px",
                              }}
                            >
                              +
                            </Button>
                          </div>
                        </div>
                        <div>
                          <Typography sx={{ fontSize: "18px" }}>
                            Loại lương
                          </Typography>
                          <input
                            type="text"
                            placeholder="Enter your phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            style={{
                              height: "56px",
                              width: "80%",
                              border: " 2px solid rgba(226, 225, 229, 1)",
                              borderRadius: "5px",
                              fontSize:"17px"
                            }}
                          />

                          <Typography sx={{ fontSize: "18px" }}>
                            Ngày kết thúc hợp đồng
                          </Typography>
                          <input
                            type="text"
                            placeholder="Enter your phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            style={{
                              height: "56px",
                              width: "80%",
                              border: " 2px solid rgba(226, 225, 229, 1)",
                              borderRadius: "5px",
                              fontSize:"17px"
                            }}
                          />

                          <Typography sx={{ fontSize: "18px" }}>
                            Lương tính thuế
                          </Typography>
                          <input
                            type="text"
                            placeholder="Enter your phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            style={{
                              height: "56px",
                              width: "80%",
                              border: " 2px solid rgba(226, 225, 229, 1)",
                              borderRadius: "5px",
                              fontSize:"17px"
                            }}
                          />

                          <Typography sx={{ fontSize: "18px" }}>
                            Ngày trả lương hàng tháng
                          </Typography>
                          <input
                            type="text"
                            placeholder="Enter your phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            style={{
                              height: "56px",
                              width: "80%",
                              border: " 2px solid rgba(226, 225, 229, 1)",
                              borderRadius: "5px",
                              fontSize:"17px"
                            }}
                          />
                        </div>
                      </div>
                      <Typography sx={{ fontSize: "18px" }}>Ghi chú</Typography>
                      <input
                        type="text"
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        style={{
                          height: "56px",
                          width: "90%",
                          border: " 2px solid rgba(226, 225, 229, 1)",
                          borderRadius: "5px",
                          fontSize:"17px"
                        }}
                      />

                      <Button
                        variant="contained"
                        sx={{ fontSize: "18px, ", mt: "20px" }}
                      >
                        Nhập file
                      </Button>
                    </Container>
                  </Container>
                )}

                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1, fontSize: "20px" }}
                  >
                    Quay về
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />

                  <Button sx={{ fontSize: "20px" }} onClick={handleNext}>
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
