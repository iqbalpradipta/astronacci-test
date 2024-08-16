import { Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { ITitleVideo } from "./types/titleTypes";
import GetAllVideoHooks from "./hooks/hooks";

function VideoTitle() {
  const { response } = GetAllVideoHooks();
  const navigate = useNavigate();
  
  if (!response || !Array.isArray(response.data)) {
    return <p>Data not available or loading...</p>;
  }
  return (
    <>
    {response.data.map((data: ITitleVideo, index: number) => (
      <Card key={index} onClick={() => navigate(`/video/${data.id}`)} className="max-w-sm border border-black mb-4 p-4">
        <h5 className="text-1xl font-bold">{index + 1}</h5>
        <div className="grid grid-rows gap-4">
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {data.title}
          </p>
        </div>
      </Card>
    ) )}
    </>
  );
}

export default VideoTitle;
