import { useState, useEffect } from 'react';
import './App.css';
import LineChart from './components/LineChart.jsx';
import { calculoAños } from './controllers/calculodeProduccion.js';

const SimuladorDrummond = () => {
  const [showForm, setShowForm] = useState(false);
  const [años, setAños] = useState(0);
  const [valorAzufre, setValorAzufre] = useState(0);
  const [valorCoque, setValorCoque] = useState(0);
  const [valorAlquitran, setValorAlquitran] = useState(0);
  const [valorCarbon, setValorCarbon] = useState(0);
  const [numHornos, setNumHornos] = useState(0);
  const [inflacion, setInflacion] = useState(0);
  const [resultados, setResultados] = useState([]);

  const handleStart = () => {
    setShowForm(true);
  };

  useEffect(() => {
    if (resultados.length > 0) {
      console.log('Resultados actualizados:', resultados);
    }
  }, [resultados]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setResultados([]); // Limpiar los resultados antes de la nueva simulación

    // Convertir los valores a números
    const valoresDeMercado = {
      coque: parseFloat(valorCoque),
      azufre: parseFloat(valorAzufre),
      alquitran: parseFloat(valorAlquitran),
    };

    const nuevosResultados = calculoAños(
      parseInt(años),
      valoresDeMercado,
      parseFloat(inflacion),
      parseInt(numHornos),
      parseFloat(valorCarbon)
    );

    setResultados(nuevosResultados);
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
            <input
              type="number"
              id="input1"
              className="form-input"
              value={años}
              onChange={(e) => setAños(e.target.value)}
              min={1}
              max={10}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="input2">Precio del coque por kg:</label>
            <input
              type="number"
              id="input2"
              className="form-input"
              value={valorCoque}
              onChange={(e) => setValorCoque(e.target.value)}
              min={1}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="input3">Precio del azufre por kg:</label>
            <input
              type="number"
              id="input3"
              className="form-input"
              value={valorAzufre}
              onChange={(e) => setValorAzufre(e.target.value)}
              min={1}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="input4">Precio del alquitrán por kg:</label>
            <input
              type="number"
              id="input4"
              className="form-input"
              value={valorAlquitran}
              onChange={(e) => setValorAlquitran(e.target.value)}
              min={1}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="input7">Precio del Carbón por kg:</label>
            <input
              type="number"
              id="input7"
              className="form-input"
              value={valorCarbon}
              onChange={(e) => setValorCarbon(e.target.value)}
              min={1}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="input5">Sistema de Producción:</label>
            <input
              type="number"
              id="input5"
              className="form-input"
              value={numHornos}
              onChange={(e) => setNumHornos(e.target.value)}
              min={1}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="input6">Inflación (%):</label>
            <input
              type="number"
              id="input6"
              className="form-input"
              value={inflacion}
              onChange={(e) => setInflacion(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-enviar">
            Generar resultados
          </button>
        </form>
      )}
      <div className='grafica'>
        {/* Gráfico */}
        {resultados.length > 0 && <LineChart resultados={resultados} />}
      </div>
    </div>
  );
};

export default SimuladorDrummond;
