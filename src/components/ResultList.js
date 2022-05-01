import React from 'react'

function ResultList(props) {
    return (
        <ul style={{listStyleType:'none'}} data-testid="resultList">
            {props.results.map((result, index) => <li key={index}>{result}</li>)}
        </ul>
    )
}

export default ResultList