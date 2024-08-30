import { useContext } from "react";
import { SearchContext } from "../provider/SearchContext";
import Pagination from "./Pagination";

const Table = () => {
  const { places, loading, query, page, limit } = useContext(SearchContext)!;

  //loading
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  //initial and no data state
  if (places.length === 0) {
    return (
      <div className="table-wrapper">
        <div> {query ? "No result found" : "Start searching..."}</div>
      </div>
    );
  }
  const offset = (page - 1) * limit;
  return (
    <>
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th className="header">#</th>
              <th className="header">Place Name</th>
              <th className="header">Country</th>
            </tr>
          </thead>
          <tbody>
            {places.map((place, index) => (
              <tr key={place.id}>
                <td className="cell">
                  <b>{offset + index + 1}</b>
                </td>
                <td className="cell">{place.name}</td>
                <td className="cell">
                  <img
                    src={`https://flagsapi.com/${place.countryCode}/flat/16.png`}
                    alt={`${place.country} flag`}
                    className="flag"
                  />
                  {place.country}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination />
      </div>
    </>
  );
};

export default Table;
