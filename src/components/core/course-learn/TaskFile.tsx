import { Button } from "@/components/ui/button";
import { File } from "lucide-react";
import { Link } from "react-router-dom";

type fileType = {
  fileName: string;
  url: string;
};

const TaskFile = ({ task }: { task: fileType }) => {
  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-center border p-4">
        <div className="flex gap-2 items-center">
          <File className="w-5 h-5" />
          <span>{task.fileName}</span>
        </div>
        <Link to={task.url}>
          <Button variant={"outline"}>File</Button>
        </Link>
      </div>
    </div>
  );
};

export default TaskFile;
