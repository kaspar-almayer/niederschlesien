import React, { useState } from "react";

import { supabase } from "../supabaseClient";

function Add() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [deathDate, setDeathDate] = useState("");
  const [selectedFile, setSelectedFile] = useState("");

  function submit() {
    console.log(name);
    console.log(selectedFile);
    const addGrave = async () => {
      const fileFullName = selectedFile.name;
      const fileName = fileFullName.split(".")[0];
      const fileExt = fileFullName.split(".")[1];
      try {
        const { data: imgData, error } = await supabase.storage
          .from("graves")
          .upload(`${fileName}_${Date.now()}.${fileExt}`, selectedFile, {
            cacheControl: "3600",
            upsert: false,
          });

        if (error) {
          throw error;
        }

        if (imgData) {
          console.log({ imgData });
          try {
            const { data, error } = await supabase.from("graves").insert([
              {
                name,
                surname,
                birth_date: birthDate,
                death_date: deathDate,
                img: imgData.path,
              },
            ]);

            if (error) {
              throw error;
            }
            if (data) {
              console.log("wycieczka dodana");
            }
          } catch (error) {
            console.log("error", error);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    addGrave();
  }

  function chandleFileInput(e) {
    console.log(e.target.files[0]);
    setSelectedFile(e.target.files[0]);
  }

  return (
    <div>
      <h1>dodaj grób</h1>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          value={deathDate}
          onChange={(e) => setDeathDate(e.target.value)}
        />
      </div>
      <div>
        <input type="file" accept="image/*" onChange={chandleFileInput} />
      </div>
      <button onClick={submit}>dodaj</button>
    </div>
  );
}

export default Add;
