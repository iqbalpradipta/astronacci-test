import { Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import GetAllArtikelHooks from "./hooks/hooks";
import { IArtikelResponse, ITitleArtikel } from "./types/titleTypes";

function ArtikelTitle() {
  const { response } = GetAllArtikelHooks();
  const navigate = useNavigate();
  
  if (!response || !Array.isArray(response.data)) {
    return <p>Data not available or loading...</p>;
  }

  return (
    <>
      {response.data.map((artikel: ITitleArtikel, index: number) => (
        
        <Card
          onClick={() => navigate(`/artikel/${artikel.id}`)}
          className="max-w-sm border border-black mb-4 p-4"
          key={index}
        >
          <h5 className="text-1xl font-bold">{index + 1}</h5>
          <div className="grid grid-rows gap-4">
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {artikel.title}
            </p>
          </div>
        </Card>
      ))}
    </>
  );
}

export default ArtikelTitle;
