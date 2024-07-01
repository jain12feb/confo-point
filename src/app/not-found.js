import Alert from "@/components/Alert/Alert";
import { TbError404 } from "react-icons/tb";

const NotFound = () => {
  return (
    <Alert
      icon={<TbError404 className="w-16 h-16" />}
      title="The page you are trying to reach not found"
    />
  );
};

export default NotFound;
