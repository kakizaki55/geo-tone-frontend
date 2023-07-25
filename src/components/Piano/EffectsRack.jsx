const EffectsRack = (props) => {
  const {
    volume,
    setVolume,
    fx,
    pianoEffectTypes,
    handleEffectsRackChange
  } = props

  return (
    <>
    this is the effects rack
    <label>
        volume
          <input
          id={`piano-$-volume `}
          name={`piano-volume `}
          type="range"
          min="-40"
          max="0"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          />
      </label>
      {pianoEffectTypes.map((type) => {
        return (
          <div
            key={`piano-${type}`}>
            <label>
              {type}
                <input
                id={`piano-${type}`}
                name={`${type}`}
                type="range"
                min="0"
                max="100"
                value={fx[type]}
                onChange={(e) => handleEffectsRackChange(e)}
                />
            </label>
          </div>)
      })}
    </>
  )
}

export default EffectsRack