import React, { Component, useState, useEffect } from 'react';
import TerritoryListComponent from '../components/TerritoryListComponent';
import { useLocation, Routes, Route, Navigate } from 'react-router-dom';

const Home = () => {
    const url = process.env.REACT_APP_TERRITORY_LIST;
    const [territories, setTerritories] = useState([]);
    const [loading, setLoading] = useState(true);
    let isLoggedIn = false;
    let arrangedTerritories = [];

    const location = useLocation();
    console.log(location.state);
    if (location != null) {
        isLoggedIn = location.state;
    }

    useEffect(() => {
        if (loading && isLoggedIn) {
            (async () => {
                const res = await fetch(url, { headers: { 'Content-Type': 'application/json' } });
                const result = await res.json();
                arrangedTerritories = ArrangeTerritories(result.data);
                setTerritories(arrangedTerritories);
                setLoading(false);
            })();
        }
    }, [territories])

    if (!isLoggedIn) {
        return (
            <Routes>
                <Route path="*" element={<Navigate to="/account/login" />} />
            </Routes>
        )
    } else {
        return (
            <TerritoryListComponent territories={territories} />
        )
    }
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