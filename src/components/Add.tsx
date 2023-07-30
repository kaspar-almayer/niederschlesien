import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { supabase } from "../supabaseClient";
import { GraveyardType} from "../types.ts";
import {typedErrorLog} from '../helpers.ts'

async function uploadCloudinaryImage(selectedFile: File | null) {

  if (!selectedFile) {
    return { imgData: null, error: null }
  }

    const formData = new FormData();
    
    formData.append("file", selectedFile);
    formData.append("upload_preset", "nimlzmm1");
    
    try {
  const response = await fetch('https://api.cloudinary.com/v1_1/dqbunghp7/upload', {
    method: 'POST',
    body: formData
  });

  const imgData = await response.json();
  return { imgData, error: null }

} catch (error) {
  console.error(error);
  return { imgData: null, error }
}
  

}


function Add() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [deathDate, setDeathDate] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [selectedGraveyard, setSelectedGraveyard] = useState("");
  const [graveyards, setGraveyards] = useState<GraveyardType[] | null>(null);
  
  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data, error, status } = await supabase
          .from("graveyards")
          .select("*");
        if (error && status !== 406) {
          throw error;
        }
        if (data) {
          //console.log(data);
          setGraveyards(data);
        }
      } catch (error) {
        typedErrorLog(error);
      }
    };

    getProfile();
  }, []);

  function submit() {
    const addGrave = async () => {

      try {
        const { imgData, error } = await uploadCloudinaryImage(selectedFile)

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
                img: `v${imgData.version}/${imgData.public_id}`,
                graveyard: selectedGraveyard,
              },
            ]);

            if (error) {
              console.log("error", error);
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

  function chandleFileInput(event: React.ChangeEvent<HTMLInputElement>) {
    //console.log(e.target.files[0]);
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  } 
  const onGraveyardSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGraveyard(event.target.value);
    console.log(event.target.value)
  };

  return (
    <div>
      <Link to={'/'}>powrót</Link>
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
      <div>
        <label>cmentarz:</label>
        <select
          name="lang"
          id="lang"
          onChange={onGraveyardSelect}
        //value={i18n.language}
        >
          {graveyards?.map(graveyard => <option value={graveyard.id}>{graveyard.name}</option>)}
        </select>
      </div>
      <button onClick={submit}>dodaj</button>
    </div>
  );
}

export default Add;
