import { GetVideoByIdHooks } from "./hooks/hooks";

function  VideoContent() {
  const { response } = GetVideoByIdHooks();

  console.log(response);
  if (!response) {
    return <p>Data not available or loading...</p>;
  }

  return (
    <>
     <div className="col-span-2">
        <div className="box-border h-auto w-auto p-4 border border-black">
          <h1 className='text-center text-2xl mb-2 font-bold'>{response.title}</h1>
          <p className="text-gray-500 dark:text-gray-400">
            {response.video}
          </p>
        </div>
      </div>
    </>
  );
}

export default VideoContent;
