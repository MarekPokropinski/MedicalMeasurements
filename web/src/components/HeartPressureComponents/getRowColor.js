export default function getRowColor(category) {
  if (category === "Normal") {
    return "rgba(0,255,0,0.3)";
  } else if (category === "Prehypertension") {
    return "rgba(240,180,29,0.3)";
  } else if (category === "Stage 1 hypertension") {
    return "rgba(250,87,0,0.3)";
  } else if (category === "Stage 2 hypertension") {
    return "rgba(255,0,0,0.3)";
  } else {
    return "rgba(0,0,0,0)";
  }
}
