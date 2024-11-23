const calcularNivelRiesgo = (valor, impacto) => {
  const riesgo =
    valor *
    (impacto.alcance + impacto.tiempo + impacto.costo + impacto.calidad);

  let nivelRiesgo = "Muy Bajo";

  if (riesgo > 80) nivelRiesgo = "Muy Alto";
  else if (riesgo >= 51) nivelRiesgo = "Alto";
  else if (riesgo >= 31) nivelRiesgo = "Medio";
  else if (riesgo >= 11) nivelRiesgo = "Bajo";

  return { riesgo, nivelRiesgo };
};

// Función para calcular el promedio de calidad
const calcularPromedioCalidad = (respuestas) => {
  if (respuestas.length === 0) return 0;
  const total = respuestas.reduce((sum, r) => sum + r.valor, 0);
  return (total / respuestas.length).toFixed(2);
};

module.exports = { calcularNivelRiesgo, calcularPromedioCalidad };
