import React, { useState } from 'react'
import './App.css'

const SimuladorDrummond = () => {
  const [showForm, setShowForm] = useState(false);
  const [años, setAños] = useState('');
  const [valorAzufre, setValorAzufre] = useState('');
  const [valorCoque, setValorCoque] = useState('');
  const [valorAlquitran, setValorAlquitran] = useState('');
  const [numHornos, setNumHornos] = useState('');
  const [inflacion, setInflacion] = useState('');

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
          <button type="submit" className="btn-enviar">
            Generar resultados
          </button>
        </form>
      )}
    </div>
  );
};

export default SimuladorDrummond
