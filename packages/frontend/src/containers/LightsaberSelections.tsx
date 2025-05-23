import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { useParams } from "react-router-dom";
import { onError } from "../lib/errorLib";
import "./NewLightsaberSelection.css"; // We'll reuse the styling
import { LightsaberSelection } from "../types/lightsaber";
import LoaderButton from "../components/LoaderButton";

export default function LightsaberSelections() {
  const { id } = useParams();
  const [selections, setSelections] = useState<LightsaberSelection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    loadSelections();
  });

  async function loadSelections() {
    try {
      const selections = await API.get("api", `/lightsaberSelections/${id}`, {});
      setSelections(selections);
      setIsLoading(false);
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function deleteLightsaber(lightsaberId: string) {
    return API.del("api", `/lightsaberSelections/${lightsaberId}`, {});
  }

  async function handleDelete(lightsaberId: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this lightsaber?"
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(prev => ({ ...prev, [lightsaberId]: true }));

    try {
      await deleteLightsaber(lightsaberId);
      // Remove the deleted lightsaber from the state
      setSelections(selections.filter(s => s.LightsaberSelectionId !== lightsaberId));
    } catch (e) {
      onError(e);
    } finally {
      setIsDeleting(prev => ({ ...prev, [lightsaberId]: false }));
    }
  }

  function formatDate(timestamp: number) {
    return new Date(timestamp).toLocaleDateString();
  }

  return (
    <div className="LightsaberSelections">
      <div className="star-wars-intro star-wars-body">
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
              <h2 className="content-header">Your Lightsaber Collection</h2>
              <p className="content-body">
                Your journey through the Force has led you to collect these crystals.
              </p>
              {isLoading ? (
                <div className="loading-text">Loading your collection...</div>
              ) : (
                <div className="lightsaber-options">
                  {selections.map((selection) => (
                    <div 
                      key={selection.LightsaberSelectionId}
                      className="lightsaber-option"
                    >
                      <div 
                        className="lightsaber-color" 
                        style={{ backgroundColor: selection.color }}
                      />
                      <h3>{selection.color.toUpperCase()} CRYSTAL</h3>
                      <h4>Selected on {formatDate(selection.createdAt)}</h4>
                      <LoaderButton
                        size="sm"
                        variant="danger"
                        onClick={() => handleDelete(selection.LightsaberSelectionId)}
                        isLoading={isDeleting[selection.LightsaberSelectionId]}
                      >
                        Delete
                      </LoaderButton>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 