import React, {useEffect, useState} from 'react';

function App() {
  const [data, setData] = useState([])
  useEffect(()=>{
    queryData().then(res => setData(res.response))
  }, [])

  return <h1>{data}</h1>;
}

export default App;

export function queryData() {
  const api = '/api/data'
  const body = {};
  return fetch(api, {
    method: "post",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(result => result.json())
}
