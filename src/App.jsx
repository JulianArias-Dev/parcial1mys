import React, { useState } from 'react'
import './App.css'
import LineChart from './components/LineChart.jsx';
import {calculoAños} from './controllers/calculodeProduccion.js';

const SimuladorDrummond = () => {
  const [showForm, setShowForm] = useState(false);
  const [años, setAños] = useState(0);
  const [valorAzufre, setValorAzufre] = useState(0);
  const [valorCoque, setValorCoque] = useState(0);
  const [valorAlquitran, setValorAlquitran] = useState(0);
  const [numHornos, setNumHornos] = useState(0);
  const [inflacion, setInflacion] = useState(0);
  const [resultados, setResultados] = useState(0);

  const handleStart = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if(años <= 0 || valorAlquitran <= 0 || valorAzufre <= 0 || valorCoque <= 0 || numHornos <= 0 || inflacion <= 0){
      alert('Por favor, ingrese valores válidos para todos los campos (Mayores que 0).');
      return;
    }

    if(años > 10) {
      alert("Los años no puede ser mayor a 10");
      return;
    }

    console.log('Formulario enviado:');
    console.log('Años a simular: ', años);
    console.log('Precio del azufre: ', valorAzufre);
    console.log('Precio del coque: ', valorCoque);
    console.log('Precio del alquitrán: ', valorAlquitran);
    console.log('Número de hornos: ', numHornos);
    console.log('Inflación: ', inflacion);
  };

  const handleSubmit = () => {
    const valoresDeMercado = {
      coque: valorCoque,
      azufre: valorAzufre,
      alquitran: valorAlquitran,
    };

    const nuevosResultados = calculoAños(años, valoresDeMercado, inflacion, numHornos);
    setResultados(nuevosResultados);
    console.log(nuevosResultados);
  }

  return (
    <div className="simulador-container">
      {/* Navbar */}
      <nav className="navbar">
        <h1>Simulador Drummond: Proceso de Producción de Coque</h1>
        {!showForm && (
          <button onClick={handleStart} className="btn-iniciar">
            Iniciar
          </button>
        )}
      </nav>

      {/* Formulario */}
      {showForm && (
        <form className="form" onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="input1">Años a simular:</label>
            <input type="number" id="input1" className="form-input" value={años} onChange={(e) => setAños(e.target.value)}required/>
          </div>
          <div className="form-group">
            <label htmlFor="input2">Precio del coque por kg:</label>
            <input type="number" id="input2" className="form-input" value={valorCoque} onChange={(e) => setValorCoque(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="input3">Precio del azufre por kg:</label>
            <input type="number" id="input3" className="form-input" value={valorAzufre} onChange={(e) => setValorAzufre(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="input4">Precio del alquitrán por kg:</label>
            <input type="number" id="input4" className="form-input" value={valorAlquitran} onChange={(e) => setValorAlquitran(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="input5">Número de hornos:</label>
            <input type="number" id="input5" className="form-input" value={numHornos} onChange={(e) => setNumHornos(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="input6">Inflación:</label>
            <input type="number" id="input6" className="form-input" value={inflacion} onChange={(e) => setInflacion(e.target.value)} required />
          </div>
          <button type="submit" className="btn-enviar" onClick={handleSubmit}>
            Generar resultados
          </button>
        </form>
      )}
      {resultados.length > 0 && <LineChart resultados={resultados} />}
    </div>
  );
};

export default SimuladorDrummond
