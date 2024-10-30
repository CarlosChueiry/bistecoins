import { useState } from 'react';
import './App.css'

function App() {
  const [inputValue, setInputValue] = useState<string>("0")
  const [currency, setCurrency] = useState<string>("brl")
  const [convertedValue, setConvertedValue] = useState<number | null>(null)
  const [conversionError, setConvertionError] = useState<boolean>(false)

  const convertCurrency = (): void => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      setConvertedValue(null);
      setConvertionError(true)
      return;
    }
    setConvertionError(false)

    if (currency === "brl") {
      const result = (value / 12000)
      setConvertedValue(result);
    } else {
      const result = (value * 12000)
      setConvertedValue(result);
    }
  }

  return (
    <div className="container">
      <h1>Conversor de bistecoins</h1>
      <div style={{ marginBottom: "8px" }}>
        <input type='number' placeholder='0,00' value={inputValue} onChange={(e) => {
          const { value } = e.target;
          setConvertedValue(null)
          setConvertionError(false)
          setInputValue(value)
        }} />
        <select onChange={(e) => {
          const { value } = e.target;
          setConvertedValue(null)
          setConvertionError(false)
          setCurrency(value)
        }}>
          <option value="brl">BRL</option>
          <option value="bistecoins">Bistecoins</option>
        </select>
      </div>
      <button onClick={convertCurrency}>Calcular</button>
      <div style={{ marginTop: "16px" }}>
        {!convertedValue && conversionError && (<span>Houve um erro em sua conversão</span>)}
        {convertedValue !== null && currency === "brl" && (<span>R$ {inputValue} equivale a {convertedValue} PCs do Ota</span>)}
        {convertedValue !== null && currency === "bistecoins" && (<span>{inputValue} bistecoins equivalem a R$ {convertedValue}</span>)}
      </div>
    </div>
  )
}

export default App
