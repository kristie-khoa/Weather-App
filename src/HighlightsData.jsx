import HighlightItem from "./HighlightItem";

function HighlightsData({ windSpeed, windDegree, humidity, visibility }) {
  return (
    <>
      <h3>Today's Highlights</h3>
      <div className="card-container highlights-cards-container">
        <HighlightItem
          weatherType="Wind Speed"
          data={windSpeed}
          windDegree={windDegree}
        />
        <HighlightItem weatherType="Humidity" data={humidity} />
        <HighlightItem weatherType="Visibility" data={visibility} />
      </div>
    </>
  );
}

export default HighlightsData;
