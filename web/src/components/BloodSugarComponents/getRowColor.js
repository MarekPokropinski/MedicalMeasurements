export default function getRowColor(category) {
  if (category === "Dangerously low") {
    return "rgba(0,0,255,0.5)";
  } else if (category === "Low") {
    return "rgba(0,0,255,0.3)";
  } else if (category === "Normal") {
    return "rgba(0,255,0,0.3)";
  } else if (category === "Borderline") {
    return "rgba(255,0,0,0.1)";
  } else if (category === "High") {
    return "rgba(255,0,0,0.3)";
  } else if (category === "Dangerous high") {
    return "rgba(255,0,0,0.6)";
  } else {
    return "rgba(0,0,0,0)";
  }
}
