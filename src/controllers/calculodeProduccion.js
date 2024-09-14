const rendimientoBase = 0.8;
const fcTemperatura = 0.9;
const fcTiempo = 0.996;
const eficiencia = 0.95;
const carbonoCargado = 18250; // Toneladas de carbono por horno

const produccionHornoAnual = (numHornos) => {
    let rendimientoFinal = rendimientoBase * fcTemperatura * fcTiempo * eficiencia;
    let coqueTon = carbonoCargado * rendimientoFinal * numHornos; // Producción total por el número de hornos
    let coque = coqueTon * 1000; // Convertir a kg
    let azufre = coqueTon * 50;
    let alquitran = coqueTon * 100;

    return {
        coque: coque,
        alquitran: alquitran,
        azufre: azufre
    };
};

const ingresos = (valoresDeMercado, produccionFinal) => {
    let ingresoCoque = produccionFinal.coque * valoresDeMercado.coque;
    let ingresoAzufre = produccionFinal.azufre * valoresDeMercado.azufre;
    let ingresoAlquitran = produccionFinal.alquitran * valoresDeMercado.alquitran;
    let ingresosTotales = ingresoCoque + ingresoAzufre + ingresoAlquitran;

    return {
        ingresoCoque: ingresoCoque,
        ingresoAlquitran: ingresoAlquitran,
        ingresoAzufre: ingresoAzufre,
        total: ingresosTotales
    };
};

const costos = (numHornos, inflacion, año, numAños, valorCarbon) => {
    const inversionInicial = 200000000 * numHornos;
    // Dividir la inversión inicial por el número de años
    const costoInversionAnual = inversionInicial / numAños;
    // Calcular costos operacionales ajustados por inflación
    const costosOperacionAnual = ((inversionInicial * 0.18 * Math.pow(1 + inflacion, año - 1)) * 12) * numHornos;
    //
    const costoMateriaPrima = (valorCarbon * Math.pow(1 + inflacion, año - 1)) * 18250 * numHornos; // Multiplicado por el número de hornos
    // El costo total es la suma de la inversión anual y los costos operacionales
    return costoInversionAnual + costosOperacionAnual + costoMateriaPrima;
};

export const calculoAños = (numAños, valoresDeMercado, inflacion, numHornos, valorCarbon) => {
    const resultados = [];
    // Valores iniciales
    let precios = { ...valoresDeMercado };
    // Calcular la producción anual considerando el número de hornos
    const produccion = produccionHornoAnual(numHornos);

    for (let año = 1; año <= numAños; año++) {

        // Calcular los ingresos
        const ingresosAnuales = ingresos(precios, produccion);
        const ingresosTotales = ingresosAnuales.total;

        // Calcular los costos
        const costoTotal = costos(numHornos, inflacion, año, numAños, valorCarbon);

        // Calcular las ganancias
        const ganancias = ingresosTotales - costoTotal;

        // Almacenar los resultados
        resultados.push({
            año,
            ingresos: ingresosTotales,
            costos: costoTotal,
            ganancias,
            coqueProducido: produccion.coque,
            azufreProducido: produccion.azufre,
            alquitránProducido: produccion.alquitran
        });

        // Ajustar precios para el próximo año
        precios.coque *= (1 + inflacion);
        precios.azufre *= (1 + inflacion);
        precios.alquitran *= (1 + inflacion);
    }

    return resultados;
};


