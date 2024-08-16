import { Outlet } from "react-router-dom";
import VideoTitle from "../../components/Videos/VideoTitle";

function VideoTitlePage() {
  return (
    <>
      <div className="grid grid-cols-3">
        <div className="box-border h-auto w-auto p-4 border border-black">
          <VideoTitle />
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default VideoTitlePage;
