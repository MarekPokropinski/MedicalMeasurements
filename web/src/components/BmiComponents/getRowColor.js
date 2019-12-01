export default function getRowColor(category) {
  if (category === "Severely underweight") {
    return "rgba(0,0,255,0.5)";
  } else if (category === "Underweight") {
    return "rgba(0,0,255,0.3)";
  } else if (category === "Normal") {
    return "rgba(0,255,0,0.3)";
  } else if (category === "Overweight") {
    return "rgba(255,0,0,0.1)";
  } else if (category === "Moderately obese") {
    return "rgba(255,0,0,0.2)";
  } else if (category === "Severely obese") {
    return "rgba(255,0,0,0.3)";
  } else if (category === "Very severely obese") {
    return "rgba(255,0,0,0.4)";
  } else if (category === "Morbidly obese") {
    return "rgba(255,0,0,0.5)";
  } else if (category === "Super obese") {
    return "rgba(255,0,0,0.6)";
  } else if (category === "Hyper obese") {
    return "rgba(255,0,0,0.7)";
  } else {
    return "rgba(0,0,0,0)";
  }
}
