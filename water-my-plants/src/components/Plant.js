import React from 'react';

const Plant = () => {
	return (
		<div className="plant">
			<img src={plant.image} alt={plant.nickname} />
			<h1 className="nickname">{plant.nickname}</h1>
			<p className="species">{plant.species}</p>
            <p>{plant.h2oFrequency}</p>
		</div>
	)
}
export default Plant;