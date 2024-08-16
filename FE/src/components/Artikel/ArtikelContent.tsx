import { GetArtikelByIdHooks } from "./hooks/hooks";

function ArtikelContent() {
  const { response } = GetArtikelByIdHooks();

  console.log(response);
  if (!response) {
    return <p>Data not available or loading...</p>;
  }

  return (
    <>
      <div className="col-span-2">
        <div className="box-border h-auto w-auto p-4 border border-black">
          <p className="text-gray-500 dark:text-gray-400">{response.content}</p>
        </div>
      </div>
    </>
  );
}

export default ArtikelContent;
