import React, { Component, useState, useEffect } from 'react';
import TerritoryListComponent from '../components/TerritoryListComponent';

const Home = () => {
    const url = process.env.REACT_APP_TERRITORY_LIST;
    const [territories, setTerritories] = useState([]);
    const [loading, setLoading] = useState(true);
    let isLoggedIn = false;
    let arrangedTerritories = [];

    useEffect(() => {
        if (loading && !isLoggedIn) {
            (async () => {
                const res = await fetch(url, { headers: { 'Content-Type': 'application/json' } });
                const result = await res.json();
                arrangedTerritories = ArrangeTerritories(result.data);
                setTerritories(arrangedTerritories);
                setLoading(false);
            })();
        }
    }, [territories])

    return (
        <TerritoryListComponent territories={territories} />
    )
}

const ArrangeTerritories = (territories) => {
    const territoryArranger = {};
    const arrangedTerritories = [];

    territories.map((territory) => {
        return (territoryArranger[territory.id] = { ...territory, children: [] });
    })

    territories.map(territory => {
        return ((territory.parent) ? territoryArranger[territory.parent].children.push(territoryArranger[territory.id])
            : arrangedTerritories.push(territoryArranger[territory.id]));
    });

    return arrangedTerritories;
}

export default Home;