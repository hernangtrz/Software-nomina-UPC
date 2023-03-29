//GLOBALES
let arrayProfesoresCatedraticos = [];
let arrayProfesoresOcasionales = [];
const arrayInfCatedratico = [];
const arrayInfOcasional = [];
const arrayInfResultado = [];
let smmlv = 1160000;
const salud = 0.04;
const pension = 0.04;
let grupoSemillero;
let posgrado;
let descuentos;
let prima;
let cesantias;
let otros;
let tipoProfesor = document.getElementById("tipo");
let contenidoCatedratico = document.querySelector(".catedratico");
let contenidoOcasional = document.querySelector(".ocasional");
let contenidoBonificacion = document.querySelector(".divBonificaciones");
let contenidoDescuentos = document.querySelector(".divDescuentos");
let contenidoPrestaciones = document.querySelector(".divPrestaciones");
let selectGrupoSemillero = document.getElementById("grupo-semillero");
let selectPosgrado = document.getElementById("posgrado");
let categoria = document.getElementById("categoria");
let inputHorasTrabajadas = document.getElementById("horas");
let inputValorHora = document.getElementById("valor_hora");
let inputDescuentos = document.getElementById("descuentos");
let inputCesantias = document.getElementById("cesantias");
let inputPrima = document.getElementById("prima");
let inputOtros = document.getElementById("otros");
let btnAgregarProfesor = document.getElementById("agregarProfesor");
let btnCalcularNomina = document.getElementById("calcularNomina");
let resultado = document.getElementById("resultado");
let profesoresAgregados = document.getElementById("profesoresAgregados");
let labelHorasTrabajadas = document.getElementById("labelHorasTrabajadas");
let labelValorHora = document.getElementById("labelValorHora");
let labelCategoria = document.getElementById("labelCategoria");
let reiniciarPrograma = document.getElementById("reiniciarPrograma");
let llennarCampos = document.querySelector(".llennarCampos");
let horasTrabajadas;
let valorHoraTrabajada;
let totalNominaCatedraticos = 0;
let totalNominaOcasionales = 0;
let sumaSalarioOcasionales;
let sumaSalarioCatedraticos;
let salarioTotalOcasionales;
let sumaDescuentoOcasionales;
let sumaDescuentoCatedraticos;

class profesorCatedratico {
  constructor(
    horasTrabajadas,
    valorHoraTrabajada,
    grupoSemillero,
    posgrado,
    descuentos,
    prima,
    cesantias,
    otros
  ) {
    (this.horasTrabajadas = horasTrabajadas),
      (this.valorHoraTrabajada = valorHoraTrabajada),
      (this.grupoSemillero = grupoSemillero),
      (this.posgrado = posgrado),
      (this.descuentos = descuentos),
      (this.prima = prima),
      (this.cesantias = cesantias),
      (this.otros = otros);
  }
}

class profesorOcasional {
  constructor(
    categoria,
    grupoSemillero,
    posgrado,
    descuentos,
    prima,
    cesantias,
    otros
  ) {
    (this.categoria = categoria),
      (this.grupoSemillero = grupoSemillero),
      (this.posgrado = posgrado),
      (this.descuentos = descuentos),
      (this.prima = prima),
      (this.cesantias = cesantias),
      (this.otros = otros);
  }
}

function calcularSalarioOcasionales() {
  let salarioOcasionales = 0;
  sumaSalarioOcasionales = 0;
  sumaDescuentoOcasionales = 0;
  arrayProfesoresOcasionales.forEach((element) => {
    switch (element.categoria) {
      case "auxiliar-tc":
        salarioOcasionales = 2.645 * smmlv;
        break;
      case "auxiliar-mt":
        salarioOcasionales = 1.509 * smmlv;
        break;
      case "asistente-tc":
        salarioOcasionales = 3.125 * smmlv;
        break;
      case "asistente-mt":
        salarioOcasionales = 1.749 * smmlv;
        break;
      case "asociado-tc":
        salarioOcasionales = 3.606 * smmlv;
        break;
      case "asociado-mt":
        salarioOcasionales = 1.99 * smmlv;
        break;
      case "titular-tc":
        salarioOcasionales = 3.918 * smmlv;
        break;
      case "titular-mt":
        salarioOcasionales = 2.146 * smmlv;
        break;
    }
    sumaSalarioOcasionales +=
      salarioOcasionales +
      salarioOcasionales * salud +
      salarioOcasionales * pension +
      calcularBonPostgrado(element.posgrado, salarioOcasionales) +
      calcularGrupoSemillero(element.grupoSemillero, salarioOcasionales) +
      element.otros;

    sumaDescuentoOcasionales += element.descuentos;
  });

  return sumaSalarioOcasionales;
}

function calcularSalarioCatedraticos() {
  let salarioCatedratico;
  sumaSalarioCatedraticos = 0;
  sumaDescuentoCatedraticos = 0;
  arrayProfesoresCatedraticos.forEach((element) => {
    salarioCatedratico = element.horasTrabajadas * element.valorHoraTrabajada;
    sumaSalarioCatedraticos +=
      salarioCatedratico +
      salarioCatedratico * salud +
      salarioCatedratico * pension +
      calcularBonPostgrado(element.posgrado, salarioCatedratico) +
      calcularGrupoSemillero(element.grupoSemillero, salarioCatedratico) +
      element.otros;

    sumaDescuentoCatedraticos += element.descuentos;
  });

  return sumaSalarioCatedraticos;
}

function calcularBonPostgrado(posgrado, salario) {
  switch (posgrado) {
    case "no-tiene":
      return 0;
      break;
    case "especializacion":
      return salario * 0.1;
      break;
    case "maestria":
      return salario * 0.45;
      break;
    case "doctorado":
      return salario * 0.9;
      break;
    case "postgrado":
      return salario * 0;
      break;
  }
}

function calcularPrestaciones(p, c) {
  return p + c;
}

function calcularGrupoSemillero(grupoSemillero, salario) {
  switch (grupoSemillero) {
    case "no-tiene":
      return 0;
      break;
    case "A1":
      return salario * 0.56;
      break;
    case "A":
      return salario * 0.47;
      break;
    case "B":
      return salario * 0.42;
      break;
    case "C":
      return salario * 0.38;
      break;
    case "reconocido-por-colciencias":
      return salario * 0.33;
      break;
    case "semillero":
      return salario * 0.19;
      break;
  }
}

function calcularDescuentoTotal(sumOcasionales, sumCatedraticos) {
  let descuentoTotal = sumOcasionales + sumCatedraticos;

  return descuentoTotal;
}

function agregarProfesores(event) {
  profesoresAgregados.innerHTML = `
    <h2>Profesores agregados</h2> 
    <div class = "contenedorProf">
    <div class="infoProfesoresOcasionales">
    <h3>Profesores ocasionales</h3>
    </div>
    <div class="infoProfesoresCatedraticos">
    <h3>Profesores catedraticos</h3>
    </div>
    </div>`;
  let infoProfesoresOcasionales = document.querySelector(
    ".infoProfesoresOcasionales"
  );
  let infoProfesoresCatedraticos = document.querySelector(
    ".infoProfesoresCatedraticos"
  );
  horasTrabajadas = parseInt(inputHorasTrabajadas.value);
  valorHoraTrabajada = parseInt(inputValorHora.value);
  grupoSemillero = selectGrupoSemillero.value;
  posgrado = selectPosgrado.value;
  descuentos = parseInt(inputDescuentos.value);
  prima = parseInt(inputPrima.value);
  cesantias = parseInt(inputCesantias.value);
  otros = parseInt(inputOtros.value);
  event.preventDefault();
  if (tipoProfesor.value === "catedratico") {
    if (inputHorasTrabajadas.value == "" || inputValorHora.value == "") {
      llennarCampos.innerHTML =
        "<p class='p_llenarDatos'>Digita todos los valores</p>";
    } else {
      llennarCampos.innerHTML = "";
      arrayProfesoresCatedraticos.push(
        new profesorCatedratico(
          horasTrabajadas,
          valorHoraTrabajada,
          grupoSemillero,
          posgrado,
          descuentos,
          prima,
          cesantias,
          otros
        )
      );

      console.log(arrayProfesoresCatedraticos);
      inputHorasTrabajadas.value = "";
      inputValorHora.value = "";
      inputDescuentos.value = 0;
      inputPrima.value = 0;
      inputCesantias.value = 0;
      inputOtros.value = 0;
      let infCatedratico = `${labelHorasTrabajadas.textContent} ${horasTrabajadas} | ${labelValorHora.textContent} ${valorHoraTrabajada}$`;
      arrayInfCatedratico.push(infCatedratico);
    }
  } else if (tipoProfesor.value === "ocasional") {
    inputDescuentos.value = 0;
    inputPrima.value = 0;
    inputCesantias.value = 0;
    inputOtros.value = 0;
    arrayProfesoresOcasionales.push(
      new profesorOcasional(
        categoria.value,
        grupoSemillero,
        posgrado,
        descuentos,
        prima,
        cesantias,
        otros
      )
    );
    console.log(arrayProfesoresOcasionales);
    let infOcasional = `${labelCategoria.textContent} ${
      categoria.options[categoria.selectedIndex].textContent
    }`;
    arrayInfOcasional.push(infOcasional);
  }

  arrayInfCatedratico.forEach((element) => {
    let p = document.createElement("p");
    p.textContent = element;
    infoProfesoresCatedraticos.appendChild(p);
  });

  arrayInfOcasional.forEach((element) => {
    let p = document.createElement("p");
    p.textContent = element;
    infoProfesoresOcasionales.appendChild(p);
  });
}

btnAgregarProfesor.addEventListener("click", agregarProfesores);

function mostrarContenido() {
  // Ocultar todos los contenidos
  contenidoCatedratico.style.display = "none";
  contenidoOcasional.style.display = "none";
  contenidoBonificacion.style.display = "none";
  contenidoDescuentos.style.display = "none";
  contenidoPrestaciones.style.display = "none";
  // Mostrar el contenido correspondiente
  if (tipoProfesor.value === "catedratico") {
    contenidoCatedratico.style.display = "block";
    contenidoBonificacion.style.display = "block";
    contenidoDescuentos.style.display = "block";
    contenidoPrestaciones.style.display = "block";
  } else if (tipoProfesor.value === "ocasional") {
    contenidoOcasional.style.display = "block";
    contenidoBonificacion.style.display = "block";
    contenidoDescuentos.style.display = "block";
    contenidoPrestaciones.style.display = "block";
  }
}

btnCalcularNomina.addEventListener("click", calcularNomina);

function calcularNomina(event) {
  let nominaTotal =
    calcularSalarioCatedraticos() +
    calcularSalarioOcasionales() -
    calcularDescuentoTotal(sumaDescuentoOcasionales, sumaDescuentoCatedraticos);
  event.preventDefault();
  arrayInfResultado.push(
    `Salario total de los profesores catedraticos: ${calcularSalarioCatedraticos()}$`,
    `Salario total de los profesores ocasionales: ${calcularSalarioOcasionales()}$`,
    `Descuentos: ${calcularDescuentoTotal(
      sumaDescuentoOcasionales,
      sumaDescuentoCatedraticos
    )}$`,
    `La nomina total de la UPC es de: ${nominaTotal.toFixed(2)}$`
  );

  arrayInfResultado.forEach((element) => {
    let p = document.createElement("p");
    p.textContent = element;
    resultado.appendChild(p);
  });
  console.log(
    calcularDescuentoTotal(sumaDescuentoOcasionales, sumaDescuentoCatedraticos)
  );
  console.log(sumaDescuentoOcasionales);
  console.log(sumaDescuentoCatedraticos);
}

reiniciarPrograma.addEventListener("click", function () {
  window.location.reload();
});

tipoProfesor.addEventListener("change", mostrarContenido);

// Mostrar el contenido inicial
mostrarContenido();
