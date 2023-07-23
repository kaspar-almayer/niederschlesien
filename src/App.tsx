import { useState, useEffect } from "react";

import "./styles.scss";

import { supabase } from "./supabaseClient";
import Grave from "./components/Grave";
import Header from "./components/Header.tsx";
import Hero from "./components/Hero.tsx";

function App() {
  const [graves, setGraves] = useState(null);
  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data, error, status } = await supabase.from("graves").select('*, people (*)');
        if (error && status !== 406) {
          throw error;
        }
        if (data) {
          //console.log(data);
          setGraves(data);
        }
      } catch (error) {
        alert(error.message);
      }
    };

    getProfile();
  }, []);
  return (
    <div className="container">
      <Header />
      <Hero />
      <div className="graves-list">
        {graves?.map((grave, index) => (
          <Grave key={index} grave={grave} />
        ))}
      </div>
    </div>
  );
}

export default App;
