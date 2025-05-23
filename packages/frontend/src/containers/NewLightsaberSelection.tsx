import React, { useRef, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import { useNavigate } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./NewLightsaberSelection.css";
import { API } from "aws-amplify";
import { onError } from "../lib/errorLib";
import { s3Upload } from "../lib/awsLib";
import { LightsaberOption } from "../types/lightsaber";

export default function NewLightsaberSelection() {
  const file = useRef<null | File>(null);
  const nav = useNavigate();
  const [selectedLightsaber, setSelectedLightsaber] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [lightsaberOptions, setLightsaberOptions] = useState<LightsaberOption[]>([]);
  const [isLoadingOptions, setIsLoadingOptions] = useState(true);

  useEffect(() => {
    loadLightsaberOptions();
  }, []);

  async function loadLightsaberOptions() {
    try {
      const options = await API.get("api", "/lightsaberOptions", {});
      setLightsaberOptions(options);
      setIsLoadingOptions(false);
    } catch (e) {
      onError(e);
      setIsLoadingOptions(false);
    }
  }

  function validateForm() {
    return selectedLightsaber.length > 0;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      // Find the selected lightsaber option to get its color
      const selectedOption = lightsaberOptions.find(
        option => option.LightsaberOptionId === selectedLightsaber
      );

      if (!selectedOption) {
        throw new Error("No lightsaber selected");
      }

      await API.post("api", "/lightsaberSelections", {
        body: { 
          color: selectedOption.color
        }
      });
      
      // Show success message and reset selection
      alert(`${selectedOption.color} is a great choice! Feel free to choose another one!`);
      setSelectedLightsaber("");
      setIsLoading(false);
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  return (
    <div className="NewLightsaberSelection">
      <div className="star-wars-intro star-wars-body">
        <p className="intro-text">A long time ago, in a galaxy far,<br></br> far away....</p>
        <div className="test">
          <h1 className="main-logo">
            <img src="https://logos-download.com/wp-content/uploads/2016/09/Star_Wars_logo-1.png" alt="Star Wars Logo"></img>
          </h1>
        </div>
        <div className="returning-logo">
          <img 
            src="https://logos-download.com/wp-content/uploads/2016/09/Star_Wars_logo-1.png"
            alt="Star Wars Logo" 
            className="pulsing-logo"
          />
        </div>
        <div className="scroll-container">
          <div className="holo-screen">
            <div className="scrolling-text">
              <h2 className="content-header">Lightsaber Selection</h2>
              <p className="content-body">
                Choose your path wisely, young Padawan.
                <br></br>
                Select a lightsaber crystal that resonates with your spirit.
              </p>
              {isLoadingOptions ? (
                <div className="loading-text">Loading lightsaber options...</div>
              ) : (
                <div className="lightsaber-options">
                  {lightsaberOptions.map((option) => (
                    <div 
                      key={option.LightsaberOptionId}
                      className={`lightsaber-option ${selectedLightsaber === option.LightsaberOptionId ? 'selected' : ''}`}
                      onClick={() => setSelectedLightsaber(option.LightsaberOptionId)}
                    >
                      <div className="lightsaber-color" style={{ backgroundColor: option.color }}></div>
                      <h3>{option.color.toUpperCase()} CRYSTAL</h3>
                      <h4>{option.meaning}</h4>
                      <p>{option.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <Form onSubmit={handleSubmit}>
          <Stack>
            <LoaderButton
              size="lg"
              type="submit"
              variant="primary"
              isLoading={isLoading}
              disabled={!validateForm()}
            >
              Choose Your Path
            </LoaderButton>
          </Stack>
        </Form>
      </div>
      <audio loop>
        <source src="https://soundfxcenter.com/movies/star-wars/8d82b5_Star_Wars_Main_Theme_Song.mp3" type="audio/mpeg"></source>
      </audio>
    </div>
  );
}
