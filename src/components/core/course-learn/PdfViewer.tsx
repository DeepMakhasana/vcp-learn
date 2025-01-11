import { ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader } from "../../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

const PdfViewer = ({ trigger, title, url }: { trigger: ReactNode; title: string; url: string }) => {
  return (
    <Dialog>
      {trigger}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <iframe src={url} width="100%" height="500px" style={{ border: "none" }}></iframe>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PdfViewer;
