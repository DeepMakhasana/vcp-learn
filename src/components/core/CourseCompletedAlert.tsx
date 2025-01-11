import { PartyPopper } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Dispatch, SetStateAction } from "react";

const CourseCompletedAlert = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-[425px]">
        <div className="w-full flex justify-center">
          <PartyPopper className="w-20 h-20" />
        </div>
        <DialogHeader>
          <DialogTitle className="py-4 text-center">Congratulations 🎊</DialogTitle>
          <DialogDescription className="text-center">
            Certificate request sended successfully, certificate sended on your whatsApp and email in 5 to 6 working
            hours.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CourseCompletedAlert;
