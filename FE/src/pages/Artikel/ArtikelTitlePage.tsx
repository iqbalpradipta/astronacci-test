import { Outlet } from "react-router-dom";
import ArtikelTitle from "../../components/Artikel/ArtikelTitle";

function ArtikelTitlePage() {
  return (
    <>
      <div className="grid grid-cols-3">
        <div className="box-border h-auto w-auto p-4 border border-black">
          <ArtikelTitle />
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default ArtikelTitlePage;
