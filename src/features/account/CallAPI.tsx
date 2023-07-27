import { Button } from "@mui/material";
import agent from "../../app/api/agent";
import { toast } from "react-toastify";

export default function CallAPI() {
  const handlecreateLeaveDayDetail = () => {
    agent.LeaveDayDetail.create(3).then(() => {
      toast.success("CREATED");
    });
  };
  return <Button onClick={handlecreateLeaveDayDetail}>Tạo leave day detail</Button>;
}
