import { useState } from "react";
import { useTranslation } from "react-i18next";

import { supabase } from "../supabaseClient";

import Header from "./Header.tsx";
import Grave from "./Grave";

import { GraveType } from "../types.ts";
import { PostgrestError } from "@supabase/supabase-js";

function Search() {
  const { t } = useTranslation();
  const [surname, setSurname] = useState("");
  const [graves, setGraves] = useState<GraveType[] | null>(null);
  const [message, setMessage] = useState("");

  async function search() {
    try {
      const { data, error} = await supabase
        .from("gravesss")
        .select()
        .textSearch("surname", `${surname}`);

      if (error) {
        throw error;
      }
      if (data.length > 0) {
        setGraves(data);
        setMessage("");
      } else {
        setMessage(t("search.errorMessage") ?? '');
        setGraves(null);
      }
    } catch (error) {
      const postgrestError = error as PostgrestError;
      console.log("postgrestError", postgrestError);
      setMessage(`Error: ${postgrestError.code}`);
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
