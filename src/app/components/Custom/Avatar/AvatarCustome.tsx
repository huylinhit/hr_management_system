import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../../../../firebase";
import { Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
interface Props {
  id: number;
  name: string;
  dependency: any;
}
export default function AvatarCustome({ id, name, dependency }: Props) {
  const [avatarUrl, setAvatarUrl] = useState("");
  const storageRef = ref(storage, `staffsAvatar/${id}`);
  useEffect(() => {
    getDownloadURL(storageRef)
      .then((url) => {
        setAvatarUrl(url);
      })
      .catch((error) => {});
  }, [dependency]);

  return (
    <Avatar
      // variant="rounded"
      sx={{
        width: 32,
        height: 32,
        marginRight: 2,
        fontSize: "14px",
        bgcolor: deepPurple[500],
      }}
      src={avatarUrl}
      alt=""
    >
      {name ? name.charAt(0) : ""}
    </Avatar>
  );
}
