import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [options, setOptions] = useState([]);
  const [to, setTo] = useState('es'); // Set default 'to' language
  const [from, setFrom] = useState('en'); // Set default 'from' language
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const translate = () => {
    setLoading(true);

    const params = new URLSearchParams();
    params.append('q', input);
    params.append('source', from);
    params.append('target', to);
    params.append('api_key', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');

    axios.post('https://libretranslate.de/translate', params, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then((res) => {
      setOutput(res.data.translatedText);
    })
    .catch((error) => {
      console.error('Translation error:', error);
      // Handle error, display a message to the user, etc.
    })
    .finally(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    axios.get('https://libretranslate.de/languages', {
      headers: { accept: 'application/json' },
    })
    .then((res) => {
      setOptions(res.data);
    })
    .catch((error) => {
      console.error('Language options error:', error);
      // Handle error, display a message to the user, etc.
    });
  }, []);

  return (
    <div className="App">
      <div>
        <span className='text'>From ({from}) :</span>
        <select className='select' onChange={(e) => setFrom(e.target.value)}>
          {options.map((opt) => (
            <option key={opt.code} value={opt.code}>
              {opt.name}
            </option>
          ))}
        </select>
        <span className='text'>To ({to}) :</span>
        <select className='select' onChange={(e) => setTo(e.target.value)}>
          {options.map((opt) => (
            <option  key={opt.code} value={opt.code}>
              {opt.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <textarea
          cols="50"
          rows="8"
          onInput={(e) => setInput(e.target.value)}
        ></textarea>
      </div>
      <div>
        <textarea cols="50" rows="8" value={output}></textarea>
      </div>
      <div>
        <button onClick={translate} disabled={loading}>
          {loading ? 'Translating...' : 'Translate'}
        </button>
      </div>
    </div>
  );
}

export default App;
