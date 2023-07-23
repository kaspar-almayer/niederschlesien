import { useState } from "react";
import { useTranslation } from "react-i18next";

import { supabase } from "../supabaseClient";

import Header from "./Header.tsx";
import Grave from "./Grave";

function Search() {
  const { t } = useTranslation();
  const [surname, setSurname] = useState("");
  const [graves, setGraves] = useState(null);
  const [message, setMessage] = useState("");

  async function search() {
    try {
      const { data, error } = await supabase
        .from("graves")
        .select()
        .textSearch("surname", `${surname}`);

      if (error) {
        throw error;
      }
      if (data.length > 0) {
        setGraves(data);
        setMessage("");
      } else {
        setMessage(t("search.errorMessage"));
        setGraves(null);
      }
    } catch (error) {
      console.log(error);
      setMessage(`Error: ${error.code}`);
      setGraves(null);
    }
  }

  return (
    <div className="container">
      <Header />
      <h1>{t("search.title")}</h1>
      <div>
        <label htmlFor="surname">{t("search.label")}: </label>
        <input
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <button onClick={search}>{t("search.submitButton")}</button>
      </div>
      <h3>{t("search.searchResultsHeading")}:</h3>
      <div className="graves-list">
        {message ?? <p>{message}</p>}
        {graves?.map((grave, index) => (
          <Grave key={index} grave={grave} />
        ))}
      </div>
    </div>
  );
}

export default Search;
