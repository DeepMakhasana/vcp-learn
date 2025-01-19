import { getPrivateVideoUrl } from "@/api/course";
import useLessonNavigationContext from "@/context/lessonNavigation/useLessonNavigationContext";
import { IPrivateVideoResponse } from "@/types/course";
import { useQuery } from "@tanstack/react-query";
import VideoPlayer from "./VideoPlayer";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

const LearnVideo = () => {
  const { slug, purchaseId } = useParams();
  const { currentLesson } = useLessonNavigationContext();

  const lessonId = Number(currentLesson?.id);
  const { data: videoData, isLoading: videoLoading } = useQuery<IPrivateVideoResponse, Error>({
    queryKey: ["video", { lessonId }],
    queryFn: () => getPrivateVideoUrl({ purchaseId: String(purchaseId), lessonId }),
    enabled: !!slug && !!purchaseId && !!lessonId,
  });

  if (videoLoading) {
    return (
      <div className="flex justify-center my-4">
        <Loader2 className="animate-spin w-6 h-6" />
      </div>
    );
  }

  return (
    <div className="bg-slate-400">
      <VideoPlayer source={videoData?.url} />
    </div>
  );
};

export default LearnVideo;
