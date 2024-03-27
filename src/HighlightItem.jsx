function HighlightItem({ weatherType, data }) {
  return (
    <div className="card highlight-item">
      <h4>{weatherType}</h4>

      <div className="highlight-item-text">
        <span>{data}</span>
        <span>
          {weatherType === "Wind Speed"
            ? "mph"
            : weatherType === "Humidity"
            ? "%"
            : "mi"}
        </span>
      </div>
    </div>
  );
}

export default HighlightItem;
