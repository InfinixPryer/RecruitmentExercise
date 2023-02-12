import React, { Component, useState, useEffect } from 'react';

const TerritoryComponent = ({ territory }) => {
    const [show, setShow] = useState(false);
    if (show) {
        return (
            <li key={territory.id}>
                <span className="caret" onClick={() => setShow(!show)}>{territory.name}</span>
                <ul className="nested">
                    {territory.children.map((child) => {
                        return <TerritoryComponent key={child.id} territory={child} />;
                    })}
                </ul>
            </li>
        );
    } else {
        return (
            <li key={territory.id}>
                <span className="caret" onClick={() => setShow(!show)}>{territory.name}</span>
            </li>
        );
    }
}

export default TerritoryComponent;