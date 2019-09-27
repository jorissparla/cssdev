import React from 'react';
import ReactDOM from 'react-dom';

function convert(css) {
  console.log('in cobnvert');
  const total = {};
  const rows = css.split(';');
  console.log(rows);
  const newrows = rows
    .map(item => item.trim())
    .map(selector => {
      console.log(selector);
      const [key, value] = selector.split(':').map(item => item.trim());
      const sel = camel(key);
      if (sel) {
        total[sel] = value;
      }
    }, {})
    .join(',\n');
  console.log(total);
  let resultstring = '';
  Object.keys(total).forEach(element => {
    resultstring += element;
    resultstring += `:'${total[element]}',\n`;
  });
  return [resultstring, total];
}

const camel = str => str.replace(/(-[a-z])/g, x => x.toUpperCase()).replace(/-/g, '');

function App() {
  const [css, setCss] = React.useState('background-color: #fff');
  const [style, setStyle] = React.useState({});
  const [objectRep, setObject] = React.useState("{ name: 'Joris'}");
  const handleKeyPress = () => {
    console.log('converting');
    const [result, styleResult] = convert(css);
    setObject(result);
    setStyle(styleResult);
  };
  return (
    <div className="App">
      <button onClick={handleKeyPress}>Convert</button>
      <div className="wrapper">
        <textarea rows="12" columns="120" value={css} onChange={e => setCss(e.target.value)} />
        <textarea rows="20" columns="120" value={objectRep} onChange={e => e} />
      </div>
      <div className="default" style={style}>
        preview here
      </div>
    </div>
  );
}

export default App;
